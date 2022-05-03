const { Matter, Cost } = require("../models");

// resolvers for the GraphQL schema
const resolvers = {
  Query: {
    costs: () => Cost.find(),
    matters: () => Matter.find(),
  },
  Mutation: {
    createCost: (parent, args) => {
      const cost = new Cost(args);
      return cost.save();
    },
    createMatter: (parent, args) => {
      const matter = new Matter(args);
      return matter.save();
    },
  },
};

export default resolvers;
