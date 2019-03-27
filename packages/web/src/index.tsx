import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo-hooks";

import { Router } from "./routes/routes";
import { apolloClient } from "./services/apollo";
import { lightTheme } from "./themes/light";
import { ThemeProvider, GlobalStyle } from "./themes/styled";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";

Modal.setAppElement("#root");

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <React.Fragment>
          <GlobalStyle />
          <Suspense fallback={<div>Loading...</div>}>
            <Router />
          </Suspense>
        </React.Fragment>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
