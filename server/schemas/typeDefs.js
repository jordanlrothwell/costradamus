const { gql } = require("apollo-server-express");

// GraphQL schema
const typeDefs = gql`
  type Query {
    costs: [Cost]
    matters: [Matter]
  }

  type Cost {
    itemNumber: Int!
    description: String!
    scale: Scale
    category: String!
    special: Special
  }

  type Scale {
    A: Int
    B: Int
    C: Int
    D: Int
    E: Int
    F: Int
    G: Int
  }

  type Special {
    rate: Int
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
    claimedAmount: Int
    awardedAmount: Int
  }

  type Offer {
    isPlaintiff: Boolean!
    amount: Int
    date: String
  }

  type Milestone {
    defence: Int
    preHearing: Int
    arbitration: Int
  }

  input CostInput {
    itemNumber: Int
    description: String
    scale: ScaleInput
    category: String
    special: SpecialInput
  }

  input ScaleInput {
    A: Int
    B: Int
    C: Int
    D: Int
    E: Int
    F: Int
    G: Int
  }

  input SpecialInput {
    rate: Int
    amount: Int
  }

  input QuantumInput {
    claimedAmount: Int
    awardedAmount: Int
  }

  input OfferInput {
    isPlaintiff: Boolean
    amount: Int
    date: String
  }

  input MilestoneInput {
    defence: Int
    preHearing: Int
    arbitration: Int
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
