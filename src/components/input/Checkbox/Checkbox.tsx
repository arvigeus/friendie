import React from "react";
import styled from "styled-components/macro";
import { desaturate } from "polished";

import { colors, fontSizes, fonts } from "../../../style/theme";

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  /**
   * Color of label text and checkbox
   * @default #333
   */
  color?: string;
  /**
   * The element will take all the vertical space and will put label and checkbox at the opposite ends
   * @default false
   */
  row?: boolean;
  /**
   * Reverse the order of label and checkbox
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
const padding = 2;
const lineWidth = Math.sqrt(Math.pow(width - padding * 2, 2) * 2);

const Checkbox = ({
  label,
  color = colors.black,
  disabled = false,
  row = false,
  reverse = false,
  ...props
}: CheckboxProps): React.ReactChild => {
  const disabledColor = desaturate(0.2, color);
  const input = (
    // @ts-ignore
    <Input
      color={color}
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
    box-sizing: content-box;
    width: ${width}px;
    height: ${width}px;
    border: 2px solid ${({ color }) => color};
    margin: 0 4px;
  }

  &:disabled + span {
    border-color: ${({ disabledColor }) => disabledColor};
    opacity: 0.5;
  }

  & + span::before,
  & + span::after {
    content: "";
    position: absolute;
    top: ${padding / 2}px;
    display: inline-block;
    box-sizing: border-box;
    width: 0;
    height: 2px;
    background-color: ${({ color }) => color};
    transition: width 0.2s linear;
    will-change: width;
  }

  & + span::before {
    left: ${padding}px;
    transform: rotate(45deg);
    transform-origin: left;
    transition-delay: 0.25s;
  }

  & + span::after {
    right: ${padding}px;
    transform: rotate(-45deg);
    transform-origin: right;
  }

  &:disabled + span::before,
  &:disabled + span::after {
    background-color: ${({ disabledColor }) => disabledColor};
    opacity: 0.5;
  }

  &:checked + span::before,
  &:checked + span::after {
    width: ${lineWidth}px;
  }

  &:checked + span::before {
    transition-delay: 0s;
  }

  &:checked + span::after {
    transition-delay: 0.25s;
  }
`;

export default Checkbox;
