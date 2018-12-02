import { createGlobalStyle } from "styled-components";

import { colors, fonts } from "./theme";

// tslint:disable-next-line: typedef variable-name
const GlobalStyle = createGlobalStyle`
  html,
  body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    color: ${colors.black};
    font-family: ${fonts.interface};
    font-size: 28px;
  }

  /* Reset */
  input[type="submit"]:focus,
  input[type="button"]:focus,
  button:focus,
  a:focus {
    outline: 0;
  }
`;

export default GlobalStyle;
