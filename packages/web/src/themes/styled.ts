import * as styledComponents from "styled-components";
import { useContext } from "react";
import { lightTheme } from "./light";

type ThemeInterface = typeof lightTheme;

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
