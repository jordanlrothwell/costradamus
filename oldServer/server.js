const { ApolloServer } = "apollo-server-express";
const { typeDefs, resolvers } = "./schema";
const express = require("express");
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
};

startApolloServer();
