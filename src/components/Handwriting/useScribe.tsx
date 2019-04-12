import { RefObject, useEffect } from "react";

interface ScribeOptions {
  speed: number;
  loop: boolean;
  fill: boolean;
}

interface ScribeProps extends ScribeOptions {
  text: string;
  color: string;
  fontFamily: string;
  fontSize: number;
}

interface TextDescription {
  char: string;
  x: number;
}

interface Params {
  width: number;
  height: number;
  textVertPos: number;
}

const DEFAULT_DASH_OFFSET = 220;

const updateCanvas = (
  text: TextDescription[],
  ctx: CanvasRenderingContext2D,
  params: Params,
  i: number,
  dashOffset: number,
  options: ScribeOptions,
  token: { cancel: boolean }
): void => {
  if (token.cancel) {
    return;
  }
  const { width, height, textVertPos } = params;

  // clear canvas for each frame
  ctx.clearRect(text[i].x, 0, width - text[i].x, height);

  // Redraw the last letter (some cursive fonts might be "cut" by ctx.clearRect)
  // This will not work for outline only text
  if (options.fill && i > 0) {
    const prev = text[i - 1];
    ctx.fillText(prev.char, prev.x, textVertPos);
  }

  // calculate and set current line-dash for this char
  ctx.setLineDash([
    DEFAULT_DASH_OFFSET - dashOffset,
    dashOffset - options.speed
  ]);

  // reduce length of off-dash
  dashOffset -= options.speed; // eslint-disable-line no-param-reassign

  // draw char to canvas with current dash-length
  ctx.strokeText(text[i].char, text[i].x, textVertPos);

  // char done? no, the loop
  if (dashOffset > 0) {
    requestAnimationFrame(() =>
      updateCanvas(text, ctx, params, i, dashOffset, options, token)
    );
  } else {
    // ok, outline done, lets fill its interior before next
    if (options.fill) {
      ctx.fillText(text[i].char, text[i].x, textVertPos);
    }

    // if we still have chars left, loop animation again for this char
    // eslint-disable-next-line no-param-reassign
    if (++i < text.length) {
      requestAnimationFrame(() =>
        updateCanvas(text, ctx, params, i, DEFAULT_DASH_OFFSET, options, token)
      );
    } else if (options.loop) {
      // else repeat animation if requested
      setTimeout(
        () =>
          updateCanvas(
            text,
            ctx,
            params,
            0,
            DEFAULT_DASH_OFFSET,
            options,
            token
          ),
        500
      );
    }
  }
};

const useScribe = (
  ref: RefObject<HTMLCanvasElement>,
  { text, color, fontSize, fontFamily, ...options }: ScribeProps
): void => {
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const { current: canvas } = ref;

    const token = { cancel: false };

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.lineWidth = 1;
      ctx.lineJoin = "round"; // to avoid spikes we can join each line with a round joint
      ctx.strokeStyle = ctx.fillStyle = color;

      // This bogus delay is needed to allow the canvas to update its properties before measuring text
      setTimeout(() => {
        const textProps = text
          .split("")
          .reduce((ac: TextDescription[], av: string): TextDescription[] => {
            const last = ac.length > 0 ? ac[ac.length - 1] : null;
            ac.push({
              char: av,
              x: last ? last.x + ctx.measureText(last.char).width : 0
            });
            return ac;
          }, []);

        const params = {
          width: canvas.width,
          height: canvas.height,
          textVertPos: canvas.height * 0.675
        };

        updateCanvas(
          textProps,
          ctx,
          params,
          0,
          DEFAULT_DASH_OFFSET,
          options,
          token
        );
      }, 50);
    }

    return () => {
      token.cancel = true;
    };
  }, [text, color, fontSize, fontFamily]);
};

export default useScribe;
