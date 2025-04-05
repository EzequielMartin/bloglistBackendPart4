const blogsRouter = require("express").Router()
const Blog = require("../models/blogs")

blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post("/", (request, response) => {
  let blog = new Blog(request.body)

  if(blog.likes === undefined){
    blog.likes = 0
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogsRouter