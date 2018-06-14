const { Blog } = require("../models/Blog");
const _ = require("lodash");
export const typeDef = `
type Query {
    blogs: [Blog]
  }

type Mutation {
  createBlog (
    title: String!,
    body: String!,
    image: String
  ): Blog,

  deleteBlog (
    id: ID!
  ): Blog
}

type Blog {
      id: ID,
      title: String,
      slug: String,
      body: String,
      image: String
    }
`;

export const resolvers = {
  Query: {
    // return list of all blogs
    blogs: async () => await Blog.find()
  },

  Mutation: {
    // Create a New Blog
    async createBlog(_, { title, body, image }) {
      const blog = await new Blog({
        title,
        slug: title,
        body,
        image
      }).save();
      return blog;
    },

    // Delete a Blog
    async deleteBlog(_, { id }) {
      const result = await Blog.deleteOne({ _id: id });
      return result;
    }
  }
};
