import { makeExecutableSchema } from "graphql-tools";
import { typeDef as Blog, resolvers as BlogResolvers } from "./blog.js";

export const schema = makeExecutableSchema({
  typeDefs: [Blog],
  resolvers: Object.assign(BlogResolvers)
});
