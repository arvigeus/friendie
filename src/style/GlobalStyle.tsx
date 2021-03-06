import { createGlobalStyle } from "styled-components/macro";

import background from "./diary.png";
import { colors, fonts } from "./theme";

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

  * {
    box-sizing: border-box;
  }

  /* Reset */
  input[type="submit"]:focus,
  input[type="button"]:focus,
  button:focus,
  a:focus {
    outline: 0;
  }

  #root {
    position: relative;
    z-index: 0;
    overflow-x: hidden;
    width: 100%;
    height: 100%;
    padding: 20px 40px;
    margin: 0;
    background-image: url(${background});
  }

  main {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-height: 300px;
    padding: 20px 40px;
  }

  main,
  main::before,
  main::after {
    border: 1px solid #bbb;
    background-color: ${colors.paper};

    /* Styles to distinguish sheets from one another */
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.25);
  }

  main::before,
  main::after {
    content: "";
    position: absolute;
    width: 99%;
    height: 95%;
    max-height: 600px;
  }

  main::before {
    z-index: -1;
    top: 0;
    right: 15px;
    transform: rotate(-1deg);
  }

  main::after {
    z-index: -2;
    top: 5px;
    right: -5px;
    transform: rotate(1deg);
  }
`;

export default GlobalStyle;
