const { Blog } = require("../models/Blog");
const _ = require("lodash");
const { AuthenticationError, gql } = require("apollo-server-express");

export const typeDef = gql`
  extend type Query {
    blogs: [Blog]
  }

  extend type Mutation {
    createBlog(title: String!, body: String!, image: String): Blog

    deleteBlog(id: ID!): Blog
  }

  type Blog {
    id: ID
    title: String
    slug: String
    body: String
    image: String
  }

`;

export const resolvers = {
  Query: {
    // return list of all blogs
    async blogs(_, args, { user }) {
      // This would recieve the context and log it
      // console.log(ctxt);
      return await Blog.find();
    }
  },

  Mutation: {
    // Create a New Blog
    async createBlog(_, { title, body, image }, { user }) {
      if (!user) throw new AuthenticationError("You must be logged in");
      const blog = await new Blog({
        title,
        slug: title,
        body,
        image
      }).save();
      return blog;
    },

    // Delete a Blog
    async deleteBlog(_, { id }, { user }) {
      if (!user) throw new AuthenticationError("You must be logged in");
      const result = await Blog.deleteOne({ _id: id });
      return result;
    }
  }
};
