import { useMemo } from "react";

interface TextStyle {
  text: string;
  fontFamily: string;
  fontSize: number;
}

const useTextSize = ({ text, fontSize, fontFamily }: TextStyle): number[] =>
  useMemo(
    () => {
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return [0, 0];
      ctx.font = `${fontSize}px ${fontFamily}`;
      ctx.lineWidth = 1;
      return [
        ctx.measureText(text).width * 1.05,
        fontSize * 1.4 // This is wrong way to do it, but there is no sane other option
      ];
    },
    [text, fontSize, fontFamily]
  );

export default useTextSize;
