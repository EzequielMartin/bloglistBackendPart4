const { test, after } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

test("get returns 2 blogs"), async () => {
  const response = await api.get("/api/notes")

  assert.strictEqual(response.body.length, 2)

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