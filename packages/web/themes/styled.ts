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

  #__next {
    height: 100vh;
  }

  @font-face {
    font-family: 'ibm_plex';
    src: url('/static/fonts/ibmplexsans-semibold-webfont.woff2') format('woff2'),
         url('/static/fonts/ibmplexsans-semibold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'ibm_plex';
    src: url('/static/fonts/ibmplexsans-regular-webfont.woff2') format('woff2'),
         url('/static/fonts/ibmplexsans-regular-webfont.woff') format('woff');
    font-weight: lighter;
    font-style: normal;
  }

  @font-face {
    font-family: 'ibm_plex';
    src: url('/static/fonts/ibmplexsans-medium-webfont.woff2') format('woff2'),
         url('/static/fonts/ibmplexsans-medium-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'noto';
    src: url('/static/fonts/notosans-bold-webfont.woff2') format('woff2'),
         url('/static/fonts/notosans-bold-webfont.woff') format('woff');
    font-weight: bold;
    font-style: normal;
  }

  @font-face {
    font-family: 'noto';
    src: url('/static/fonts/notosans-regular-webfont.woff2') format('woff2'),
         url('/static/fonts/notosans-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-family: 'noto', sans-serif;
  }

  button {
    font-family: 'ibm_plex';
    font-weight: bold;
    text-transform: uppercase;
  }
`;
