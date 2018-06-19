const { User } = require("../models/User");
const { ApolloError, gql } = require("apollo-server-express");

export const typeDef = gql`
  extend type Mutation {
    loginUser(username: String!, password: String!): TokenResponse
  }

  type TokenResponse {
    success: Boolean
    token: String
  }

`;

export const resolvers = {
  Mutation: {
    // Create a New User
    async loginUser(_, { username, password }) {
      const result = {};
      const user = await User.findOne({ username });

      if (!user) {
        throw new ApolloError("Invalid Username/Password Combos", 400);
      }

      const isValidPassword = await user.comparePassword(password);

      if (isValidPassword) {
        result.success = true;
        result.token = user.generateAuthToken();
      } else {
        throw new ApolloError("Invalid Username/Password Combo", 400);
      }

      return result;
    }
  }
};
