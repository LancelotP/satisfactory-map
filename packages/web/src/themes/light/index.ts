import { colors } from "./colors";
import { createGlobalStyle } from "../styled";

export const lightTheme = {
  colors
};

export const GlobalStyle = createGlobalStyle`

html {
  line-height: 1.15; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  color: ${({ theme }) => theme.colors.grey900};
  background-color: ${({ theme }) => theme.colors.secondary500};
  touch-action: manipulation;
}

*, *:before, *:after {
  box-sizing: inherit;
  -webkit-font-smoothing: inherit;
  -moz-osx-font-smoothing: inherit;
}

body {
  min-height: 100%;
  margin: 0;
  padding: 0;

  &.no-scroll {
    overflow-y: hidden;
  }
}

[hidden] {
  display: none;
}

.leaflet-container {
  background-color: #474747;
}

/**
* Remove the gray background on active links in IE 10.
*/

a {
  background-color: transparent;
}
`;
