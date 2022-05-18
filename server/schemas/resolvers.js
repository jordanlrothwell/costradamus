const { AuthenticationError } = require("apollo-server-express");
const { User, Matter, Cost } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("matters");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("matters");
    },
    matters: async (parent, { username }) => {
      return Matter.find({ matterAuthor: username })
        .populate("costPool")
        .populate("costs");
    },
    // populate costs and costPool for a matter
    matter: async (parent, { matterId }) => {
      return Matter.findOne({ _id: matterId })
        .populate("costPool")
        .populate("costs");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("matters");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    costs: async () => {
      return Cost.find();
    },
    costByDesc: async (parent, { description }) => {
      return Cost.findOne({ description: description });
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addMatter: async (parent, { reference }, context) => {
      // get all costs from the db and add them to costPool
      const costs = await Cost.find();
      const matter = await Matter.create({
        reference,
        matterAuthor: context.user.username,
        quantum: 0,
        costPool: costs,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { matters: matter._id } }
      );

      return matter;
    },
    // remove cost from costPool and add to costs
    addCost: async (parent, { matterId, costId, index }, context) => {
      if (context.user) {
        const matter = await Matter.findById(matterId);

        matter.costPool = matter.costPool.filter(
          (c) => c.toString() !== costId
        );
        matter.costs = [...matter.costs];
        matter.costs.splice(index, 0, costId);

        await matter.save();
        return matter;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // remove cost from costs and add back to costPool
    removeCost: async (parent, { matterId, costId, index }, context) => {
      if (context.user) {
        const matter = await Matter.findById(matterId);

        matter.costs = matter.costs.filter((c) => c.toString() !== costId);
        matter.costPool = [...matter.costPool];
        matter.costPool.splice(index, 0, costId);

        await matter.save();
        return matter;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    // reorder the index of a cost within either costPool or costs
    // takes in the matterId, costId, sourceId, and index
    moveCost: async (
      parent,
      { matterId, costId, sourceId, index },
      context
    ) => {
      if (context.user) {
        const matter = await Matter.findById(matterId);

        if (sourceId === "items2") {
          // costPool
          matter.costPool = matter.costPool.filter(
            (c) => c.toString() !== costId
          );
          matter.costPool.splice(index, 0, costId);
        } else {
          // costs
          matter.costs = matter.costs.filter((c) => c.toString() !== costId);
          matter.costs.splice(index, 0, costId);
        }

        await matter.save();
        return matter;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeMatter: async (parent, { matterId }, context) => {
      if (context.user) {
        const matter = await Matter.findOneAndDelete({
          _id: matterId,
          matterAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { matters: matter._id } }
        );

        return matter;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
