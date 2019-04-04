import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "../themes/styled";
import { lightTheme } from "../themes/light";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={lightTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
