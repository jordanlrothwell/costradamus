const { Matter, Cost, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// resolvers for the GraphQL schema
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("matters");
    },
    user: async (parent, { username }) => {
      await User.findOne({ username }).populate("matters");
    },
    matters: async (parent, { username }) => {
      const params = username ? { username } : {};
      return await Matter.find(params).populate();
    },
    matter: async (parent, { matterID }) => {
      await Matter.findOne({ _id: matterID });
    },
    costs: async (parent, { matterID }) => {
      const params = matterID ? {matterID} : {}
      return await Cost.find(params).populate();
    },
    me: async (root, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("matters");
      }
      throw new AuthenticationError("You are not logged in");
    },
  },

  Mutation: {
    // creates a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // logs in a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }
      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword) {
        throw new AuthenticationError("Incorrect password");
      }
      const token = signToken(user);
      return { token, user };
    },
    // creates a new matter
    addMatter: async (parent, { reference }, context) => {
      if (context.user) {
        const matter = await Matter.create({
          reference,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { matters: matter._id } }
        );
        return matter;
      }
      throw new AuthenticationError("You are not logged in");
    },
  },
};

module.exports = resolvers;
