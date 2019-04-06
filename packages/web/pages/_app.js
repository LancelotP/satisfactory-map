import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "../themes/styled";
import { lightTheme } from "../themes/light";
import { darkTheme } from "../themes/dark";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props;

    const theme = router.query.darkMode === "1" ? darkTheme : lightTheme;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
