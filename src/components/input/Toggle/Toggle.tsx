import React, { useRef } from "react";
import styled from "styled-components/macro";
import { desaturate } from "polished";

import { colors, fontSizes, fonts } from "../../../style/theme";
import useMaxComponentWidth from "./useMaxComponentWidth";

interface ToggleProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  /**
   * Color of label text and toggle
   * @default #333
   */
  color?: string;
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
  /**
   * Reverse the order of label and toggle
   * @default false
   */
  reverse?: boolean;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  color: string;
  disabledColor: string;
  disabled?: boolean;
  row: boolean;
  reverse: boolean;
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  disabledColor: string;
}

const Toggle = ({
  label,
  color = colors.black,
  disabled = false,
  uncheckedOption,
  checkedOption,
  row = false,
  reverse = false,
  ...props
}: ToggleProps): React.ReactChild => {
  const uncheckedRef = useRef(null);
  const checkedRef = useRef(null);
  const width = useMaxComponentWidth(uncheckedRef, checkedRef) || "auto";
  const disabledColor = desaturate(0.2, color);
  const input = (
    // @ts-ignore
    <Input
      disabledColor={disabledColor}
      disabled={disabled}
      {...props}
      type="checkbox"
    />
  );
  return (
    <Label
      disabledColor={disabledColor}
      color={color}
      disabled={disabled}
      row={row}
      reverse={reverse}
    >
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
  flex-wrap: wrap;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  justify-content: ${({ row }) => (row ? "space-between" : "flex-start")};
  box-sizing: border-box;
  width: ${({ row }) => (row ? "100%" : "auto")};
  color: ${({ disabled, disabledColor, color }) =>
    disabled ? disabledColor : color};
  font-family: ${fonts.interface};
  font-size: ${fontSizes.normal};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Input = styled.input<InputProps>`
  display: none;

  & + span {
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    border-bottom: 2px solid ${({ color }) => color};
    margin: 0 4px;
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

  &:disabled + span {
    border-color: ${({ disabledColor }) => disabledColor};
    opacity: 0.5;
  }

  & + span > span:first-child {
    user-select: text;
  }

  & + span > span:last-child {
    user-select: none;
  }

  &:checked + span > span {
    transform: translate(-100%);
  }

  &:checked + span > span:first-child {
    user-select: none;
  }

  &:checked + span > span:last-child {
    user-select: text;
  }
`;

export default Toggle;
