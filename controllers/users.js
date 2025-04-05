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

module.exports = usersRouter