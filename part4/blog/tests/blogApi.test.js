const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const helper = require("./testHelper");
const Blog = require("../models/blog");
require('dotenv').config();


beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });


beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  }); //added a timeout

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs have id property named id instead of _id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    expect(blog.id).toBeDefined();
    expect(blog._id).not.toBeDefined();
  });
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New Blog Title",
    author: "John Doe",
    url: "https://www.example.com",
    likes: 1,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await helper.blogsInDb();
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogs.map((blog) => blog.title);
  expect(titles).toContain("New Blog Title");
});

test("likes property defaults to 0 if missing", async () => {
  const newBlog = {
    title: "Another Blog",
    author: "Jane Smith",
    url: "https://www.example.com",
  };

  const response = await api.post("/api/blogs").send(newBlog);

  expect(response.status).toBe(201);
  expect(response.body.likes).toBe(0);

  const blogs = await helper.blogsInDb();
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
});

test("backend responds with status 400 if title and url are missing", async () => {
  const newBlog = {
    likes: 1,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogs = await helper.blogsInDb();
  expect(blogs).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
