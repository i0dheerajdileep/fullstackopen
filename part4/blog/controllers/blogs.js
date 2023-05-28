const blogsRouter = require("express").Router();
const Blog = require('../models/blog')

blogsRouter.get("/", async(request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs);
});

blogsRouter.post("/",async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save()
    response.status(201).json(result);
});

blogsRouter.delete("/:id",async (request,response)=>{
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id",async (request,response)=>{
  id = request.params.id
  likes = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(id,likes)
  updatedBlog
  ? response.status(200).json(updatedBlog.toJSON())
  : response.status(404).end();
})

module.exports = blogsRouter;