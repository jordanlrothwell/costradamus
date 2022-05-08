const { Matter, Cost, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

// resolvers for the GraphQL schema
const resolvers = {
  Query: {
    // returns all users
    users: async () => await User.find().populate("matters"),
    // returns a user by username
    user: async (root, { username }) =>
      await User.findOne({ username }).populate("matters"),
    // returns all costs
    costs: async () => await Cost.find(),
    // returns all matters
    matters: async () => await Matter.find(),
    // returns the current user
    me: async (root, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("matters");
      }
      throw new AuthenticationError("You are not logged in");
    },
  },
  Matter: {
    // returns the quantum of a matter
    quantum: async (root) => await Quantum.findOne({ matter: root._id }),
    // returns the offer of a matter
    offer: async (root) => await Offer.findOne({ matter: root._id }),
    // returns the milestones of a matter
    milestones: async (root) => await Milestone.find({ matter: root._id }),
    // returns the user of a matter
    user: async (root) => await User.findOne({ _id: root.user }),
  },
  Cost: {
    // returns the scale of a cost
    scale: async (root) => await Scale.findOne({ cost: root._id }),
    // returns the special of a cost
    special: async (root) => await Special.findOne({ cost: root._id }),
  },
  User: {
    // returns the matters of a user
    matters: async (root) => await Matter.find({ user: root._id }),
  },

  Mutation: {
    // creates a new user
    createUser: async (root, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    // logs in a user
    login: async (root, { email, password }) => {
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
    createMatter: async (root, { reference }, context) => {
      if (context.user) {
        const matter = await Matter.create({ reference });
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
