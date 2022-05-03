const { gql } = require("apollo-server");

// GraphQL schema
const typeDefs = gql`
  type Query {
    costs: [Cost]
    matters: [Matter]
  }
  type Mutation {
    createCost(
      itemNumber: Int!
      description: String!
      scale: Scale
      category: String
      special: Special
    ): Cost
    createMatter(
      reference: String!
      quantum: Quantum
      offers: [Offer]
      milestones: [Milestone]
    ): Matter
  }
  type Cost {
    itemNumber: Int
    description: String
    scale: Scale
    category: String
    special: Special
  }
  type Matter {
    reference: String
    quantum: Quantum
    offers: [Offer]
    milestones: [Milestone]
  }
`;

export default typeDefs;
