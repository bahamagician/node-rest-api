const { ApolloServer, gql } = require("apollo-server-express");
import { typeDef as Blog, resolvers as BlogResolvers } from "./blog.js";
import { typeDef as User, resolvers as UserResolvers } from "./user.js";
import { typeDef as Auth, resolvers as AuthResolvers } from "./auth.js";
import { merge } from "lodash";

// If you had Query fields not associated with a
// specific type you could put them here
const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

`;

const resolvers = {};

export const server = new ApolloServer({
  typeDefs: [Query, Blog, User, Auth],
  resolvers: merge(resolvers, UserResolvers, BlogResolvers, AuthResolvers),
  formatError: error => {
    return {
      message: error.message,
      statusCode: error.extensions.code
    };
  },
  context: ({ req }) => ({
    req
  })
});
