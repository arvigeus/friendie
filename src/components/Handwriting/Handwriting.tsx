import React, { useRef } from "react";

import { colors, fonts } from "../../style/theme";
import useScribe from "./useScribe";

import { IText } from "../Text";

interface IHandwriting extends IText {
  text: string;
  speed?: number;
  /** Will repeat the animation */
  loop?: boolean;
  /** False will draw just the outline */
  fill?: boolean;
}

const Handwriting = ({
  text,
  color = colors.black,
  fontFamily = fonts.interface,
  fontSize = "50px",
  speed = 7,
  loop = true,
  fill = true
}: IHandwriting) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { width, height } = useScribe({
    ref,
    text,
    color,
    fontFamily,
    fontSize,
    speed,
    loop,
    fill
  });

  return <canvas width={width} height={height} ref={ref} />;
};

Handwriting.defaultProps = {
  color: "#495057",
  fontFamily: "Neucha, cursive",
  fontSize: "50px",
  speed: 7,
  loop: true,
  fill: true
};

export default React.memo(Handwriting);
