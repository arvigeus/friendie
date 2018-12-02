import React, { useEffect, useRef, useState } from "react";

interface IScribeOptions {
  speed: number;
  loop: boolean;
  fill: boolean;
}

interface IUseScribe extends IScribeOptions {
  ref?: any;
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
  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    const { current: parent } = ref;
    const width = parent.clientWidth * 1.2;
    const height = parent.clientHeight * 1.2;

    // remove contents and replace it with canvas
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${width}px`);
    canvas.setAttribute("height", `${height}px`);
    parent.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.font = `${fontSize} ${fontFamily}`;
      ctx.lineWidth = 1;
      ctx.lineJoin = "round"; // to avoid spikes we can join each line with a round joint
      ctx.strokeStyle = ctx.fillStyle = color;

      updateCanvas({
        text,
        ctx,
        width,
        height,
        x: width * 0.02,
        i: 0,
        dashOffset: 220,
        options
      });
    }
  });
};

interface IUpdateCanvas {
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
  text,
  ctx,
  width,
  height,
  x,
  i,
  dashOffset,
  options
}: IUpdateCanvas) => {
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
