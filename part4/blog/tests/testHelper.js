// Import the required models
const Blog = require("../models/blog");
const User = require("../models/user");

// Define an array of initial blogs
const initialBlogs = [
  {
    title: "Introduction to JavaScript",
    author: "John Doe",
    url: "https://example.com/intro-to-javascript",
    likes: 10,
  },
  {
    title: "Mastering CSS",
    author: "Jane Smith",
    url: "https://example.com/mastering-css",
    likes: 7,
  },
  {
    title: "Python Fundamentals",
    author: "David Johnson",
    url: "https://example.com/python-fundamentals",
    likes: 5,
  },
];

// Function to get all blogs from the database
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

// Function to get all users from the database
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

// Export the initialBlogs, blogsInDb, and usersInDb variables
module.exports = { initialBlogs, blogsInDb, usersInDb };
