import { makeExecutableSchema } from "graphql-tools";
import { typeDef as Blog, resolvers as BlogResolvers } from "./blog.js";
import { merge } from "lodash";

export const schema = makeExecutableSchema({
  typeDefs: [Blog],
  resolvers: merge(BlogResolvers)
});
