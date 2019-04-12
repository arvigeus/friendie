import React from "react";
import styled from "styled-components/macro";
import { desaturate } from "polished";

import { colors, fontSizes, fonts } from "../../../style/theme";

interface RadioProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  name: string;
  /**
   * Color of label text and radio
   * @default #333
   */
  color?: string;
  /**
   * The element will take all the vertical space and will put label and radio at the opposite ends
   * @default false
   */
  row?: boolean;
  /**
   * Reverse the order of label and radio
   * @default false
   */
  reverse?: boolean;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  color: string;
  disabledColor: string;
  disabled: boolean;
  row: boolean;
  reverse: boolean;
}

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  disabledColor: string;
}

const width = 25;
const contentWidth = width / 2;

const Radio = ({
  label,
  color = colors.black,
  disabled = false,
  row = false,
  reverse = false,
  ...props
}: RadioProps): React.ReactChild => {
  const disabledColor = desaturate(0.2, color);
  const input = (
    // @ts-ignore
    <Input
      color={color}
      disabledColor={disabledColor}
      disabled={disabled}
      {...props}
      type="radio"
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
      {label} {input} <span />
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
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    width: ${width}px;
    height: ${width}px;
    border: 2px solid ${({ color }) => color};
    margin: 0 4px;
    border-radius: 50%;
    transition: border-width 0.2s linear;
    will-change: border-width;
  }

  &:checked + span {
    border-width: ${contentWidth}px;
  }

  &:disabled + span {
    border-color: ${({ disabledColor }) => disabledColor};
    opacity: 0.5;
  }
`;

export default Radio;
