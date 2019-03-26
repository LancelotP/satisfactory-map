import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";

import { Router } from "./routes/routes";
import { apolloClient } from "./services/apollo";
import { GlobalStyle, lightTheme } from "./themes/light";
import { ThemeProvider } from "./themes/styled";

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={lightTheme}>
      <React.Fragment>
        <GlobalStyle />
        <Router />
      </React.Fragment>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
