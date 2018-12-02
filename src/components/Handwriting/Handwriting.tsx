import React, { useEffect, useRef, useState } from "react";

import { colors, fonts } from "../../style/theme";
import Cursive from "./Cursive";
import useScribe from "./useScribe";

interface IHandwriting {
  text: string;
  color?: string;
  fontFamily?: string;
  fontSize?: string;
  speed?: number;
  loop?: boolean;
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
  const ref = useRef(null);
  useScribe({ ref, text, color, fontFamily, fontSize, speed, loop, fill });

  return (
    <Cursive
      color={color}
      fontFamily={fontFamily}
      fontSize={fontSize}
      ref={ref}
    >
      {text}
    </Cursive>
  );
};

export default Handwriting;
