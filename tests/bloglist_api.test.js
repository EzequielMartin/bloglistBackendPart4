const { test, after, beforeEach } = require("node:test")
const Blog = require("../models/blogs")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const initialBlogs = [
  {
    "title":"Probando la app",
    "author":"Eze",
    "url":"eze.com/test",
    "likes": 42
  },
  {
    "title":"Probando la primer refactorizacion",
    "author":"Eze",
    "url":"eze.com/testrefactor1",
    "likes": 42,
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

//sin async/await
// test("get returns the amount of blogs defined in initialBlogs"), () => {
//   let cant = 0
//   const blogs = api.get("/api/blogs").body
//   blogs.forEach(() => {
//     cant = cant + 1
//   })
//   assert.strictEqual(cant, initialBlogs.length)
// }


//usando async/await
test("get returns the amount of blogs defined in initialBlogs"), async () => {
  const response = await api.get("/api/blogs")

  assert.strictEqual(response.body.length, initialBlogs.length)

}

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("verify id property name", async () => {
  const response = await api.get("/api/blogs")

  response.body.forEach(blog => {
    assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, "id"), true)
  })
})

after(async () => {
  await mongoose.connection.close()
})