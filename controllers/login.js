const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const loginRouter = require("express").Router()
const User = require("../models/user")
const config = require("../utils/config")

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username }) //Busco el usuario adjunto a la solicitud
  const passwordCorrect = user === null //Verifico la password adjunta a la solicitud
    ? false
    : await bcrypt.compare(password, user.passwordHash) //Comparo si son correctas con este metodo ya que estan almacenadas como hashes en la BD

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password" //Si no se encuentra el usuario o la contraseña es incorrecta devuelvo 401 unauthorized
    })
  }

  //Si se encuentra el usuario y la contraseña es correcta creo un token, el cual se firma digitalemnte con el metodo jwt.sign
  //La firma se realiza usando la cadena de variable de entorno SECRET, esta se almacena en .env

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, config.SECRET)

  //Si la solicitud es exitosa se devuelve un status code 200 OK y se envia el token, usuario y nombre en el cuerpo de la respuesta
  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter