import React from "react";
import styled from "styled-components/macro";
import { lighten, desaturate } from "polished";

import { colors, fonts } from "../../../style/theme";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  /**
   * Color of text
   * @default #333
   */
  color?: string;
  /**
   * Background of the button. If set to "transparent", border-color is set to color property
   * @default transparent
   */
  backgroundColor?: string;
  /**
   * Font family of text
   * @default "Neucha, cursive"
   */
  fontFamily?: string;
  /**
   * Size of text
   * @default 18px
   */
  fontSize?: string;
}

const colorFocus = ({
  color = colors.black,
  backgroundColor = "transparent"
}: ButtonProps): string =>
  backgroundColor === "transparent" || color === "transparent"
    ? colors.paper
    : lighten(0.05, color);

const backgroundColorFocus = ({
  color = colors.black,
  backgroundColor = "transparent"
}: ButtonProps): string =>
  lighten(0.05, backgroundColor === "transparent" ? color : backgroundColor);

const colorHover = ({
  color = colors.black,
  backgroundColor = "transparent"
}: ButtonProps): string =>
  backgroundColor === "transparent" || color === "transparent"
    ? colors.paper
    : lighten(0.1, color);

const backgroundColorHover = ({
  color = colors.black,
  backgroundColor = "transparent"
}: ButtonProps): string =>
  backgroundColor === "transparent" ? color : lighten(0.1, backgroundColor);

const colorDisabled = ({ color = colors.black }: ButtonProps): string =>
  color !== "transparent" ? desaturate(0.2, color) : colors.paper;

const StyledButton = styled.button<ButtonProps>`
  display: inline-block;
  box-sizing: border-box;
  align-self: center;
  padding: 16px;
  border: solid 2px
    ${({ color = colors.black, backgroundColor = "transparent" }) =>
      backgroundColor !== "transparent" ? backgroundColor : color};
  background: ${({ backgroundColor = "transparent" }) => backgroundColor};
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  color: ${({ color = colors.black }) =>
    color !== "transparent" ? color : colors.paper};
  font-family: ${({ fontFamily = fonts.interface }) => fontFamily};
  font-size: ${({ fontSize = "18px" }) => fontSize};
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  transition: background-color ease 0.3s, border-color ease 0.3s;

  path {
    fill: ${({ color = colors.black }) => color};
    transition: fill ease 0.3s;
  }

  &:focus {
    border-color: ${backgroundColorFocus};
    background: ${backgroundColorFocus};
    color: ${colorFocus};
    outline: none;

    path: {
      fill: ${colorFocus};
    }
  }

  &:hover {
    border-color: ${backgroundColorHover};
    background: ${backgroundColorHover};
    color: ${colorHover};

    path: {
      fill: ${colorHover};
    }
  }

  &:disabled {
    border-color: ${({
      color = colors.black,
      backgroundColor = "transparent"
    }) =>
      desaturate(
        0.2,
        backgroundColor !== "transparent" ? backgroundColor : color
      )};
    background: ${({ backgroundColor = "transparent" }) =>
      backgroundColor !== "transparent"
        ? desaturate(0.2, backgroundColor)
        : backgroundColor};
    color: ${colorDisabled};
    opacity: 0.5;

    path: {
      fill: ${colorDisabled};
    }
  }
`;

const Button = (props: ButtonProps): React.ReactChild => (
  // @ts-ignore
  <StyledButton {...props} />
);

export default Button;
