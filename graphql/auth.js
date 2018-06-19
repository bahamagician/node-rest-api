const { User } = require("../models/User");
const { BadUserInputError } = require("apollo-server-express");

export const typeDef = `

extend type Mutation {
  loginUser (
    username: String!,
    password: String!,
  ): TokenResponse,
}

type TokenResponse {
    success: Boolean,
    token: String,
}
`;

export const resolvers = {
  Mutation: {
    // Create a New User
    async loginUser(_, { username, password }) {
      const result = {};
      const user = await User.findOne({ username });

      if (!user) {
        result.success = false;
        return result;
      }

      const isValidPassword = await user.comparePassword(password);

      if (isValidPassword) {
        result.success = true;
        result.token = user.generateAuthToken();
      } else {
        throw new BadUserInputError("Form Arguments invalid", {
          invalidArgs: "whaps"
        });
      }

      return result;
    }
  }
};
