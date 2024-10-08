process.env.NODE_ENV = "test"
const request = require("supertest")
const app = require("../app")

let items = require("../fakeDb")
let item = { name: "brodie", price: 250 }

beforeEach(async () => {
  items.push(item)
})

afterEach(async () => {
  items = []
})

describe("GET /items", async function () {
  test("Gets a list of items", async function () {
    const response = await request(app)
      .get(`/items`)

    const { items } = response.body

    expect(response.statusCode).toBe(200)
    expect(items).toHaveLength(1)
  })
})

describe("GET /items/:name", async function () {
  test("Gets a single item", async function () {
    const response = await request(app)
      .get(`/items/${item.name}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.item).toEqual(item)
  })

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app)
      .get(`/items/0`)
    expect(response.statusCode).toBe(404)
  })
})

describe("POST /items", async function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Pizza",
        price: 0
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.item).toHaveProperty("name")
    expect(response.body.item).toHaveProperty("price")
    expect(response.body.item.name).toEqual("Pizza")
    expect(response.body.item.price).toEqual(0)
  })
})

describe("PATCH /items/:name", async function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Biscuit"
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.item).toEqual(
      {
        name: "Biscuit"
      }
    )
  })

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`)
    expect(response.statusCode).toBe(404)
  })
})

describe("DELETE /items/:name", async function () {
  test("Deletes a single a item", async function () {
    const response = await request(app)
      .delete(`/items/${item.name}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      {
        message: "Deleted"
      }
    )
  })
})