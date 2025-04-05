const { test, describe } = require("node:test")
const assert = require("node:assert")
const bloglistHelper = require("../utils/bloglist_helper")

describe("dummy", () => {
  test("dummy returns one", () => {
    const blogs = []

    const result = bloglistHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})
