//Archivo que uso para retornar blogs y agregar blogs a la base de datos
//Para ejecutarlo:
//Para imprimir las personas en la consola: node mongo.js
//Para agregar una persona: node mongo.js {title} {author} {url} {likes}

require("dotenv").config()
const mongoose = require("mongoose")

if (process.argv.length<5 && process.argv.length>2) {
  console.log("Ingrese los parametros: title author url likes")
  process.exit(1)
}

const title = process.argv[2]
const author = process.argv[3]
const url = process.argv[4]
const likes = process.argv[5]

const uri = process.env.TEST_MONGODB_URI

mongoose.set("strictQuery",false)

mongoose.connect(uri)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model("Blog", blogSchema)

const blog = new Blog({
  title: `${title}`,
  author: `${author}`,
  url: `${url}`,
  likes: `${likes}`
})

if(process.argv.length === 2){
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
      console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes}`)
    })
    mongoose.connection.close()
  })
}else{
  blog.save().then(() => {
    console.log("Blog saved to DB")
    mongoose.connection.close()
  })
}