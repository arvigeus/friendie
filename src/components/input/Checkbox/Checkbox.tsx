import React from "react";
import styled from "styled-components/macro";
import { desaturate } from "polished";

import { fonts, fontSizes, colors } from "../../../style/theme";

interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  color?: string;
  /**
   * The element will take all the vertical space and will put label and checkbox at the opposite ends
   * @default false
   */
  row?: boolean;
  /**
   * Reverse the order of label and checkbox
   */
  reverse?: boolean;
}

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {
  color: string;
  disabledColor: string;
  disabled: boolean;
  row?: boolean;
  reverse?: boolean;
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
  disabled,
  row,
  reverse,
  ...props
}: CheckboxProps): React.ReactChild => {
  const disabledColor = desaturate(0.2, color);
  const input = (
    // @ts-ignore
    <Input
      type="checkbox"
      color={color}
      disabledColor={disabledColor}
      disabled={disabled}
      {...props}
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
  width: ${({ row }) => (row ? "100%" : "auto")};
  box-sizing: border-box;
  flex-direction: ${({ reverse }) => (reverse ? "row-reverse" : "row")};
  flex-wrap: wrap;
  justify-content: ${({ row }) => (row ? "space-between" : "flex-start")};
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
    width: ${width}px;
    height: ${width}px;
    box-sizing: content-box;
    margin: 0 4px;
    border: 2px solid ${({ color }) => color};
  }

  &:disabled + span {
    border-color: ${({ disabledColor }) => disabledColor};
    opacity: 0.5;
  }

  & + span::before,
  & + span::after {
    position: absolute;
    top: ${padding / 2}px;
    display: inline-block;
    width: 0;
    height: 2px;
    box-sizing: border-box;
    background-color: ${({ color }) => color};
    content: "";
    transition: width 0.2s linear;
    will-change: width;
  }

  &:disabled + span::before,
  &:disabled + span::after {
    background-color: ${({ disabledColor }) => disabledColor};
    opacity: 0.5;
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
