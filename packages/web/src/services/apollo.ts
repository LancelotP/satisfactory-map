import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import introspectionResult from "../introspection-result";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("accessToken");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: introspectionResult
});

export const apolloClient = new ApolloClient({
  // By default, this client will send queries to the
  //  `/graphql` endpoint on the same host
  // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
  // to a different host
  link: authLink.concat(
    new HttpLink({
      uri:
        process.env.NODE_ENV === "production"
          ? "https://api-satisfactory-map.lancelot.dev/graphql"
          : "/graphql"
    })
  ),
  cache: new InMemoryCache({
    fragmentMatcher
  })
});
