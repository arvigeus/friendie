import styled from "styled-components/macro";
import React from "react";
import { transparentize, darken } from "polished";

import { colors } from "../../style/theme";

interface NoteProps extends React.HTMLProps<HTMLDivElement> {
  /**
   * Paper color
   * @default #efeffe
   */
  backgroundColor?: string;
}

const StyledNote = styled.div<NoteProps>`
  position: relative;
  padding: 10px 20px;
  background: ${({ backgroundColor = colors.paper }) => {
    const lineColor = transparentize(0.96, darken(0.96, backgroundColor));
    return `
	    linear-gradient(-90deg, ${lineColor} 1px, transparent 1px),
	    linear-gradient(${lineColor} 1px, transparent 1px),
	    ${backgroundColor}
  	`;
  }};
  background-size: 4px 4px, 4px 4px;
  border-bottom-left-radius: 20px 500px;
  border-bottom-right-radius: 500px 16px;
  border-top-right-radius: 5px 100px;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
`;

// @ts-ignore
const Note = (props: NoteProps): React.ReactChild => <StyledNote {...props} />;

export default Note;
