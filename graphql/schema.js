import { makeExecutableSchema } from "graphql-tools";
import { typeDef as Blog, resolvers as BlogResolvers } from "./blog.js";
import { typeDef as User, resolvers as UserResolvers } from "./user.js";
import { typeDef as Auth, resolvers as AuthResolvers } from "./auth.js";
import { merge } from "lodash";

// If you had Query fields not associated with a
// specific type you could put them here
const Query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {};

export const schema = makeExecutableSchema({
  typeDefs: [Query, Blog, User, Auth],
  resolvers: merge(resolvers, UserResolvers, BlogResolvers, AuthResolvers)
});
