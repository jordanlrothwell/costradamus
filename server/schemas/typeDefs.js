const { gql } = require("apollo-server-express");

// GraphQL schema
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
    quantum: Float
    costs: [Cost]
  }

  type Cost {
    itemNumber: String!
    description: String!
    scale: Scale
    category: String!
    special: Special
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

  type Special {
    rate: Float
    amount: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    matters(username: String): [Matter]
    matter(matterID: ID!): Matter
    costs(matterID: ID!): Cost
    me: User
  }

  input CostInput {
    itemNumber: String
    description: String
    scale: ScaleInput
    category: String
    special: SpecialInput
  }

  input ScaleInput {
    A: Float
    B: Float
    C: Float
    D: Float
    E: Float
    F: Float
    G: Float
  }

  input SpecialInput {
    rate: Float
    amount: Int
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createMatter(reference: String!): Matter
    createCost(input: CostInput!): Cost
  }
`;

module.exports = typeDefs;
