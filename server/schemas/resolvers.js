const { Matter, Cost } = require("../models");

// resolvers for the GraphQL schema
const resolvers = {
  Query: {
    costs: async () => {
      return Cost.find({});
    },
    matters: async () => {
      return Matter.find({});
    },
  },
  Cost: {
    scale: (cost) => cost.scale,
    special: (cost) => cost.special,
  },
  Matter: {
    quantum: (matter) => matter.quantum,
    offer: (matter) => matter.offer,
    milestones: (matter) => matter.milestones,
  },
};

module.exports = resolvers;
