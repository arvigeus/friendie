import React, { useRef } from "react";

import { colors, fonts } from "../../style/theme";
import useScribe from "./useScribe";

interface HandwritingProps {
  text: string;
  /**
   * Color of text
   * @default #495057
   */
  color?: string;
  /**
   * Font family used
   * @default "Neucha, cursive"
   */
  fontFamily?: string;
  /**
   * Size of text (in pixels)
   * @default 50
   */
  fontSize?: number;
  /**
   * Animation speed
   * @default 7
   */
  speed?: number;
  /**
   * Will repeat the animation
   * @default true
   */
  loop?: boolean;
  /** False will draw just the outline
   * @default true
   */
  fill?: boolean;
}

const Handwriting = ({
  text,
  color = colors.black,
  fontFamily = fonts.interface,
  fontSize = 50,
  speed = 7,
  loop = true,
  fill = true
}: HandwritingProps): React.ReactChild => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [width, height] = useScribe(ref, {
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

// export default React.memo(Handwriting);
export default Handwriting;
