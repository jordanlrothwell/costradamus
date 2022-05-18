import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { setContext } from "@apollo/client/link/context";
import {createClient} from "graphql-ws"

import styled from "styled-components";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const wsLink = new GraphQLWsLink(createClient({
  url: "/subscriptions",
}))

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <PageContainer>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </PageContainer>
      </Router>
    </ApolloProvider>
  );
}

export default App;
