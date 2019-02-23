import React, { useRef } from "react";
import styled from "styled-components/macro";

import { fonts, fontSizes, colors } from "../../../style/theme";
import useMaxComponentWidth from "./useMaxComponentWidth";

interface ToggleProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  /**
   * The element that will be rendered when checkbox is unchecked
   */
  uncheckedOption: React.ReactChild | string;
  /**
   * The element that will be rendered when checkbox is checked
   */
  checkedOption: React.ReactChild | string;
  /**
   * The element will take all the vertical space and will put label and toggle at the opposite ends
   * @default false
   */
  row?: boolean;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  row?: boolean;
}

const Toggle = ({
  label,
  uncheckedOption,
  checkedOption,
  row,
  ...props
}: ToggleProps): React.ReactChild => {
  const uncheckedRef = useRef(null);
  const checkedRef = useRef(null);
  const width = useMaxComponentWidth(uncheckedRef, checkedRef) || "auto";
  // @ts-ignore
  const input = <Input type="checkbox" {...props} />;
  return (
    <Label row={row}>
      {label} {input}{" "}
      <span style={{ width }}>
        <span style={{ width }} ref={uncheckedRef}>
          {uncheckedOption}
        </span>
        <span style={{ width }} ref={checkedRef}>
          {checkedOption}
        </span>
      </span>
    </Label>
  );
};

const Label = styled.label<LabelProps>`
  display: inline-flex;
  width: ${({ row }) => (row ? "100%" : "auto")};
  box-sizing: border-box;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${({ row }) => (row ? "space-between" : "flex-start")};
  color: ${colors.black};
  font-family: ${fonts.interface};
  font-size: ${fontSizes.normal};
`;

const Input = styled.input<HTMLInputElement>`
  display: none;

  & + span {
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 2px solid ${colors.black};
    font-family: ${fonts.handwriting};
    text-align: center;
    white-space: nowrap;
  }

  & + span > span {
    display: inline-block;
    transform: none;
    transition: transform 0.2s ease;
    will-change: transform;
  }

  &:checked + span > span {
    transform: translate(-100%);
  }
`;

export default Toggle;
