const { User } = require("../models/User");
var jwt = require("jsonwebtoken");

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
        result.token = jwt.sign(
          {
            id: user.id,
            username: user.username
          },
          process.env.SECRET
        );
      } else {
        result.success = false;
      }

      return result;
    }
  }
};