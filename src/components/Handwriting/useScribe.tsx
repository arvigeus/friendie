import { RefObject, useEffect, useMemo } from "react";

interface ScribeOptions {
  speed: number;
  loop: boolean;
  fill: boolean;
}

interface ScribeProps extends ScribeOptions {
  ref?: RefObject<HTMLCanvasElement>;
  text: string;
  color: string;
  fontFamily: string;
  fontSize: string;
}
const updateCanvas = (
  text: string,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  x: number,
  i: number,
  dashOffset: number,
  options: ScribeOptions,
  token: { cancel: boolean }
): void => {
  if (token.cancel) {
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
    requestAnimationFrame(() =>
      updateCanvas(text, ctx, width, height, x, i, dashOffset, options, token)
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
      requestAnimationFrame(() =>
        updateCanvas(text, ctx, width, height, x, i, dashOffset, options, token)
      );
    } else if (options.loop) {
      // else repeat animation if requested
      setTimeout(
        () =>
          updateCanvas(
            text,
            ctx,
            width,
            height,
            width * 0.02,
            0,
            220,
            options,
            token
          ),
        500
      );
    }
  }
};

const useScribe = ({
  ref,
  text,
  fontSize,
  fontFamily,
  color,
  ...options
}: ScribeProps): { width: number; height: number } => {
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

      const token = { cancel: false };

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.font = `${fontSize} ${fontFamily}`;
        ctx.lineWidth = 1;
        ctx.lineJoin = "round"; // to avoid spikes we can join each line with a round joint
        ctx.strokeStyle = ctx.fillStyle = color;

        updateCanvas(
          text,
          ctx,
          size.width,
          size.height,
          size.width * 0.02,
          0,
          220,
          options,
          token
        );
      }

      return () => {
        token.cancel = true;
      };
    },
    [text, color, fontSize, fontFamily]
  );

  return size;
};

export default useScribe;
