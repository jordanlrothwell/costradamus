const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    matters: [Matter]
  }

  type Matter {
    _id: ID
    reference: String
    matterAuthor: String
    quantum: Float
    costs: [Cost]!
  }

  type Cost {
    _id: ID
    itemNumber: Float
    description: String
    scale: Scale
  }

  type Scale {
    A: Float
    B: Float
    C: Float
    D: Float
    E: Float
    F: Float
    G: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    matters(username: String): [Matter]
    matter(matterId: ID!): Matter
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMatter(reference: String!): Matter
    addCost(matterId: ID!, costNumber: Float!): Matter
    removeMatter(matterId: ID!): Matter
    removeCost(matterId: ID!, costNumber: Float!): Matter
  }
`;

module.exports = typeDefs;
