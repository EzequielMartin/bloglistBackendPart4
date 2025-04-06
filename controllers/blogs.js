const blogsRouter = require("express").Router()
const Blog = require("../models/blogs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const config = require("../utils/config")

const getTokenFrom = request => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ","")
  }
  return null
}

blogsRouter.get("/", (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post("/", async (request, response) => {
  //let blog = new Blog(request.body)

  //en el body de la request viene el blog que envie como parametro desde add_blog:
  // {
  //   "title": "Probando eliminar blog solo con token",
  //   "author": "Eze",
  //   "url": "eze.com/eliminarcontoken",
  //   "likes": 42
  // }

  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: "Token invalid" })
  }

  const user = await User.findById(decodedToken.id)

  let blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  //Ver como implementar esto usando async/await, ya que no deberia mezclar async/await con .then()

  // if(blog.likes === undefined){
  //   blog.likes = 0
  // }
  // if(blog.title === undefined || blog.url === undefined){
  //   return response.status(400)
  // }

  // blog
  //   .save()
  //   .then(result => {
  //     response.status(201).json(result)
  //   })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (request, response) => {
  //con then()
  // Blog.
  //   findByIdAndDelete(request.params.id)
  //   .then(() => {
  //     response.status(204).end()
  //   })

  //Para obtener el :id, osea para eliminar el blog del id que quiero, tengo que tomar el id de los parametros de la request, osea request.params.id

  //Esto hace que solo se pueda borrar si le paso un token valido
  //Despues tendria que hacer que solo se pueda borrar si el token que le paso es el mismo token que el del usuario que creo el blog
  const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET)
  if(!decodedToken.id) {
    return response.status(401).json({ error: "Token invalid" })
  }

  //Con await/async
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put("/:id", (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.status(200).json(updatedBlog)
    })
})

module.exports = blogsRouter