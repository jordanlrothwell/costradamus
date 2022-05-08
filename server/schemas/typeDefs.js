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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    costs: [Cost]
    matters: [Matter]
    me: User
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

  type Matter {
    reference: String!
    quantum: Quantum
    offer: Offer
    milestones: Milestone
    matterUser: ID
  }

  type Quantum {
    claimedAmount: Float
    awardedAmount: Float
  }

  scalar Date # Custom scalar type

  type Offer {
    isPlaintiff: Boolean!
    amount: Float
    date: Date
  }

  type Milestone {
    defence: Date
    preHearing: Date
    arbitration: Date
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

  input QuantumInput {
    claimedAmount: Float
    awardedAmount: Float
  }

  input OfferInput {
    isPlaintiff: Boolean
    amount: Float
    date: String
  }

  input MilestoneInput {
    defence: Date
    preHearing: Date
    arbitration: Date
  }
  
  input MatterInput {
    reference: String
    description: String
    quantum: QuantumInput
    offer: OfferInput
    milestones: MilestoneInput
    matterUser: ID
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    createCost(input: CostInput!): Cost
    createMatter(input: MatterInput!): Matter
    updateCost(id: ID!, input: CostInput!): Cost
    updateMatter(id: ID!, input: MatterInput!): Matter
    deleteCost(id: ID!): Cost
    deleteMatter(id: ID!): Matter
  }
`;

module.exports = typeDefs;
