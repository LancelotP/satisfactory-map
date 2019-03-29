import React, { createContext, useContext, useEffect } from "react";
import { HomeRoute } from "./home/home";
import get from "lodash.get";
import { useApp, Maybe, AppViewer } from "../__generated__";
import { handleCallback, renewSession } from "../services/auth";
import useRouter from "../utils/useRouter";
import { apolloClient } from "../services/apollo";
import { Layout } from "../components/Layout/Layout";
import { Route, Switch, Redirect } from "react-router";

export const AppContext = createContext<Maybe<AppViewer>>(null);

export const useViewer = () => useContext(AppContext);

export const Router = () => {
  const { data, refetch } = useApp();
  const { history } = useRouter();

  useEffect(() => {
    if (window.location.pathname.startsWith("/callback")) {
      handleAuth();
    } else {
      handleRenew();
    }
  }, []);

  async function handleAuth() {
    const redirectTo = await handleCallback();
    await refetch();

    history.push(redirectTo || "/");
  }

  async function handleRenew() {
    await renewSession();

    if (get(data, "viewer", null)) {
      return;
    }

    await refetch();
  }

  return (
    <AppContext.Provider value={get(data, "viewer", null)}>
      <Layout>
        <Switch>
          <Route path="/" exact={true} component={HomeRoute} />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </AppContext.Provider>
  );
};
