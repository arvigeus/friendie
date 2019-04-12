import React from "react";
import styled, { css } from "styled-components/macro";

import { colors, fontSizes, fonts } from "../style/theme";

interface TextProps {
  color?: string;
  fontFamily?: string;
  fontSize?: string;
}

interface StyledTextProps extends TextProps, React.HTMLProps<HTMLSpanElement> {}

interface StyledParagraphProps
  extends TextProps,
    React.HTMLProps<HTMLParagraphElement> {}

const style = css<TextProps>`
  color: ${({ color }) => color || colors.black};
  font-family: ${({ fontFamily }) => fontFamily || fonts.interface};
  font-size: ${({ fontSize }) => fontSize || fontSizes.normal};
`;

const Text = styled.span<StyledTextProps>`
  display: inline-block;
  ${style};
`;

export const Paragraph = styled.p<StyledParagraphProps>`
  ${style};
`;

export const HandwrittenText = styled(Text)<StyledTextProps>`
  font-family: ${fonts.handwriting};
  letter-spacing: 1px;
`;

export default Text;
