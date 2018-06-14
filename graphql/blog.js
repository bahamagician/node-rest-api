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
  ): Blog
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
  },
  Mutation: {
    async createBlog(_, { title, body, image }) {
      const blog = await new Blog({
        title,
        slug: title,
        body,
        image
      }).save();
      return blog;
    }
  }
};
