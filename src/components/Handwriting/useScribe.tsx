import { RefObject, useEffect, useMemo } from "react";

interface IScribeOptions {
  speed: number;
  loop: boolean;
  fill: boolean;
}

interface IUseScribe extends IScribeOptions {
  ref?: RefObject<HTMLCanvasElement>;
  text: string;
  color: string;
  fontFamily: string;
  fontSize: string;
}

const useScribe = ({
  ref,
  text,
  fontSize,
  fontFamily,
  color,
  ...options
}: IUseScribe) => {
  const size = useMemo(
    () => {
      const span = document.createElement("span");
      span.style.display = "inline-block";
      span.style.position = "absolute";
      span.style.top = `${Number.MIN_SAFE_INTEGER}px`;
      span.style.left = `${Number.MIN_SAFE_INTEGER}px`;
      span.style.whiteSpace = "nowrap";
      span.style.fontSize = fontSize;
      span.style.fontFamily = fontFamily;
      span.appendChild(document.createTextNode(text));
      document.body.appendChild(span);
      const dimensions = {
        width: span.clientWidth * 1.2,
        height: span.clientHeight * 1.2
      };
      document.body.removeChild(span);

      return dimensions;
    },
    [text, fontSize, fontFamily]
  );

  useEffect(
    () => {
      if (!ref || !ref.current) {
        return;
      }
      const { current: canvas } = ref;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.lineWidth = 1;
        ctx.lineJoin = "round"; // to avoid spikes we can join each line with a round joint
        ctx.strokeStyle = ctx.fillStyle = color;

        updateCanvas({
          ref,
          text,
          ctx,
          width: size.width,
          height: size.height,
          x: size.width * 0.02,
          i: 0,
          dashOffset: 220,
          options
        });
      }
    },
    [text, color, fontSize, fontFamily]
  );

  return size;
};

interface IUpdateCanvas {
  ref: RefObject<HTMLCanvasElement>;
  text: string;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  x: number;
  i: number;
  dashOffset: number;
  options: IScribeOptions;
}

/* tslint:disable: no-parameter-reassignment */
const updateCanvas = ({
  ref,
  text,
  ctx,
  width,
  height,
  x,
  i,
  dashOffset,
  options
}: IUpdateCanvas) => {
  if (!ref || !ref.current) {
    return;
  }
  const textVertPos = height * 0.675;

  // clear canvas for each frame
  ctx.clearRect(x, 0, width - x, height);

  // calculate and set current line-dash for this char
  ctx.setLineDash([220 - dashOffset, dashOffset - options.speed]);

  // reduce length of off-dash
  dashOffset -= options.speed;

  // draw char to canvas with current dash-length
  ctx.strokeText(text[i], x, textVertPos);

  // char done? no, the loop
  if (dashOffset > 0) {
    requestAnimationFrame(
      updateCanvas.bind(null, {
        ref,
        text,
        ctx,
        width,
        height,
        x,
        i,
        dashOffset,
        options
      })
    );
  } else {
    // ok, outline done, lets fill its interior before next
    if (options.fill) {
      ctx.fillText(text[i], x, textVertPos);
    }

    // reset line-dash length
    dashOffset = 220;

    // get x position to next char by measuring what we have drawn
    x += ctx.measureText(text[i++]).width;

    // if we still have chars left, loop animation again for this char
    if (i < text.length) {
      requestAnimationFrame(
        updateCanvas.bind(null, {
          ref,
          text,
          ctx,
          width,
          height,
          x,
          i,
          dashOffset,
          options
        })
      );
    } else if (options.loop) {
      // else repeat animation if requested
      setTimeout(
        updateCanvas.bind(null, {
          ref,
          text,
          ctx,
          width,
          height,
          x: width * 0.02,
          i: 0,
          dashOffset: 220,
          options
        }),
        500
      );
    }
  }
};
/* tslint:enable: no-parameter-reassignment */

export default useScribe;
