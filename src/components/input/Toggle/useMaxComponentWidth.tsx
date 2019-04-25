import { RefObject, useLayoutEffect, useState } from "react";

const useMaxComponentWidth = (
  unchecked: RefObject<HTMLElement>,
  checked: RefObject<HTMLElement>
): number => {
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    if (unchecked && unchecked.current && checked && checked.current)
      setWidth(
        Math.max(unchecked.current.offsetWidth, checked.current.offsetWidth) + 8
      );
  }, [checked, unchecked]);
  return width;
};

export default useMaxComponentWidth;
