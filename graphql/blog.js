const { Blog } = require("../models/Blog");
export const typeDef = `
type Query {
    blogs: [Blog]
  }
type Blog {
      id: ID,
      title: String,
      slug: String,
      body: String
    }
`;

export const resolvers = {
  Query: {
    blogs: async () => await Blog.find()
  }
};
