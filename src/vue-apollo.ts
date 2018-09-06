import Vue from 'vue';
import VueApollo from 'vue-apollo';
import { SIMPLE_ENDPOINT, SUBSCRIPTION_ENDPOINT } from '../graphcool'; // contains simple and subscription endpoint for graphcool server

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings';
const wsClient = new SubscriptionClient(SUBSCRIPTION_ENDPOINT, {
  reconnect: true,
  connectionParams: {
    authToken: localStorage.getItem(GC_AUTH_TOKEN)
  }
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation)
});

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: SIMPLE_ENDPOINT,
});

const httpLinkWithSubscriptions = addGraphQLSubscriptions(
    authMiddleware.concat(httpLink),
    wsClient
);

const apolloClient = new ApolloClient({
  link: httpLinkWithSubscriptions,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});


// Install the vue plugin
Vue.use(VueApollo);



