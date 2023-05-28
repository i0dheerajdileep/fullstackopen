const Blog = require("../models/blog");

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "My First Blog Post",
    author: "John Smith",
    url: "https://myblog.com/first-post",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "JavaScript Tips and Tricks",
    author: "Jane Doe",
    url: "https://myblog.com/js-tips",
    likes: 15,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Introduction to Node.js",
    author: "John Smith",
    url: "https://myblog.com/nodejs-intro",
    likes: 8,
    __v: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
