const bcrypt = require("bcrypt")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10 //cant de hashes por segundo que se hacen para hacer mas segura la clave, 10 es un valor que se usa por ser bastante optimo.
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User ({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)

})

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({}).populate("blogs", { title: 1, author: 1, url: 1, likes: 1 }) //el metodo populate define que los ids que hacen referencia a objetos blog en el campo blogs del documento user seran reemplazados por los documentos blog referenciados

  response.json(users)
})

module.exports = usersRouter