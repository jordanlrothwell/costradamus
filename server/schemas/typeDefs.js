const { gql } = require("apollo-server-express");
const DateScalar = require("./custom/DateScalar");

// GraphQL schema
const typeDefs = gql`
  type Query {
    costs: [Cost]
    matters: [Matter]
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
    reference: String
    description: String
    quantum: Quantum
    offer: Offer
    milestones: Milestone
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
  }

  type Mutation {
    createCost(input: CostInput): Cost
    createMatter(input: MatterInput): Matter
  }

`;

module.exports = typeDefs;
