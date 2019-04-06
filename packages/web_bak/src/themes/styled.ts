import * as styledComponents from "styled-components";
import { useContext } from "react";
import { lightTheme } from "./light";

export type ThemeInterface = typeof lightTheme;

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
  ThemeContext
} = styledComponents as styledComponents.ThemedStyledComponentsModule<
  ThemeInterface
>;

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const themes = {
  light: lightTheme
};

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }

  #root {
    height: 100vh;
  }

  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity .242s ease;
  }

  .ReactModal__Overlay--after-open {
      opacity: 1;
  }

  .ReactModal__Overlay--before-close {
      opacity: 0;
  }
`;
