import { ApolloClient, HttpLink, split } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/",
  options: {
    reconnect: true,
    connectionParams: {},
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

export default new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
