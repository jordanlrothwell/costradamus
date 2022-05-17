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
      const params = username ? { username } : {};
      return Matter.find(params);
    },
    matter: async (parent, { matterId }) => {
      return Matter.findOne({ _id: matterId });
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
      if (context.user) {
        const matter = await Matter.create({
          reference,
          matterAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { matters: matter._id } }
        );

        return matter;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addCost: async (parent, { matterId, costNumber }, context) => {
      if (context.user) {
        return Matter.findOneAndUpdate(
          { _id: matterId },
          {
            $addToSet: {
              costs: { costNumber },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
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
    removeCost: async (parent, { matterId, costNumber }, context) => {
      if (context.user) {
        return Matter.findOneAndUpdate(
          { _id: matterId },
          {
            $pull: {
              costs: {
                _id: costNumber,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
