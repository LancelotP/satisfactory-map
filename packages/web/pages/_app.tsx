import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "../themes/styled";
import { lightTheme } from "../themes/light";
import { darkTheme } from "../themes/dark";
// import { darkTheme } from "../themes/dark";

export const UserThemeContext = React.createContext<{
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
}>({
  setTheme: () => null,
  theme: "light"
});

class MyApp extends App<{}, { theme: "light" | "dark" }> {
  constructor(props: {}) {
    // @ts-ignore
    super(props);

    this.state = {
      theme: "light"
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    const { theme } = this.state;

    const themes = {
      light: lightTheme,
      dark: darkTheme
    };

    return (
      <Container>
        <UserThemeContext.Provider
          value={{
            setTheme: t => this.setState({ theme: t }),
            theme
          }}
        >
          <ThemeProvider theme={themes[theme]}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserThemeContext.Provider>
      </Container>
    );
  }
}

export default MyApp;
