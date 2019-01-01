import styled from "styled-components";

export interface IText {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

const Text = styled.span`
  display: inline-block;
  color: ${({ color }: IText) => color || "inherit"};
  font-family: ${({ fontFamily }: IText) => fontFamily || "inherit"};
  font-size: ${({ fontSize }: IText) => fontSize || "inherit"};
`;

export default Text;
