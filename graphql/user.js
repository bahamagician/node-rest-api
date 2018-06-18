const { User } = require("../models/User");
const _ = require("lodash");

export const typeDef = `
extend type Query {
    users: [User]
  }

extend type Mutation {
  createUser (
    username: String!,
    password: String!,
  ): User,

  deleteUser (
    id: ID!
  ): User
}

type User {
      id: ID,
      username: String,
      password: String,
    }
`;

export const resolvers = {
  Query: {
    // return list of all users
    async users(_, args, ctxt) {
      // This would recieve the context and log it
      // console.log(ctxt);
      return await User.find();
    }
  },

  Mutation: {
    // Create a New User
    async createUser(_, { username, password }) {
      const user = await new User({
        username,
        password
      }).save();
      return user;
    },

    // Delete a User
    async deleteUser(_, { id }) {
      const result = await User.deleteOne({ _id: id });
      return result;
    }
  }
};
