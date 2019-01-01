import styled from "styled-components/macro";
import { lighten, desaturate } from "polished";

import { colors } from "../../../style/theme";

interface IButton {
  color: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: string;
}

const colorFocus = ({ color, backgroundColor }: IButton) =>
  backgroundColor === "transparent" || color === "transparent"
    ? colors.paper
    : lighten(0.05, color);

const backgroundColorFocus = ({ color, backgroundColor }: IButton) =>
  lighten(0.05, backgroundColor === "transparent" ? color : backgroundColor);

const colorHover = ({ color, backgroundColor }: IButton) =>
  backgroundColor === "transparent" || color === "transparent"
    ? colors.paper
    : lighten(0.1, color);

const backgroundColorHover = ({ color, backgroundColor }: IButton) =>
  backgroundColor === "transparent" ? color : lighten(0.1, backgroundColor);

const colorDisabled = ({ color }: IButton) =>
  color !== "transparent" ? desaturate(0.2, color) : colors.paper;

const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  align-self: center;
  padding: 16px;
  border: solid 2px
    ${({ color, backgroundColor }) =>
      backgroundColor !== "transparent" ? backgroundColor : color};
  background: ${({ backgroundColor }: IButton) => backgroundColor};
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  color: ${({ color }) => (color !== "transparent" ? color : colors.paper)};
  font-family: ${({ fontFamily }: IButton) => fontFamily};
  font-size: ${({ fontSize }: IButton) => fontSize};
  font-weight: 600;
  letter-spacing: 1px;
  text-align: center;
  text-decoration: none;
  transition: background-color ease 0.3s, border-color ease 0.3s;

  path {
    fill: ${({ color }) => color};
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
    border-color: ${({ color, backgroundColor }) =>
      desaturate(
        0.2,
        backgroundColor !== "transparent" ? backgroundColor : color
      )};
    background: ${({ backgroundColor }) =>
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

Button.defaultProps = {
  color: "#333", // colors.black
  backgroundColor: "transparent",
  fontFamily: "Neucha, cursive",
  fontSize: "18px"
};

export default Button;
