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

test("get returns the amount of blogs defined in initialBlogs"), async () => {
  const response = await api.get("/api/notes")

  assert.strictEqual(response.body.length, initialBlogs.length)

}

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})