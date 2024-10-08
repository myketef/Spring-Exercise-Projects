/** Tests for companies. */

const request = require("supertest")

const app = require("../app")
const { createData } = require("../_test-common")
const db = require("../db")

// before each test, clean out data
beforeEach(createData)

afterAll(async () => {
  await db.end()
})

describe("GET /", function () {

  test("It should respond with array of companies", async function () {
    const response = await request(app).get("/companies")
    expect(response.body).toEqual({
      "companies": [
        { code: "lenovo", name: "Lenovo" },
        { code: "len", name: "LEN" },
      ]
    })
  })

})


describe("GET /lenovo", function () {

  test("It return company info", async function () {
    const response = await request(app).get("/companies/lenovo")
    expect(response.body).toEqual(
      {
        "company": {
          code: "lenovo",
          name: "Lenovo",
          description: "Maker of Lenovo.",
          invoices: [1, 2],
        }
      }
    )
  })

  test("It should return 404 for no-such-company", async function () {
    const response = await request(app).get("/companies/blargh")
    expect(response.status).toEqual(404)
  })
})


describe("POST /", function () {

  test("It should add company", async function () {
    const response = await request(app)
      .post("/companies")
      .send({ name: "TacoTime", description: "Yum!" })

    expect(response.body).toEqual(
      {
        "company": {
          code: "tacotime",
          name: "TacoTime",
          description: "Yum!",
        }
      }
    )
  })

  test("It should return 500 for conflict", async function () {
    const response = await request(app)
      .post("/companies")
      .send({ name: "Lenovo", description: "Huh?" })

    expect(response.status).toEqual(500)
  })
})


describe("PUT /", function () {

  test("It should update company", async function () {
    const response = await request(app)
      .put("/companies/lenovo")
      .send({ name: "LenovoEdit", description: "NewDescrip" })

    expect(response.body).toEqual(
      {
        "company": {
          code: "lenovo",
          name: "LenovoEdit",
          description: "NewDescrip",
        }
      }
    )
  })

  test("It should return 404 for no-such-comp", async function () {
    const response = await request(app)
      .put("/companies/blargh")
      .send({ name: "Blargh" })

    expect(response.status).toEqual(404)
  })

  test("It should return 500 for missing data", async function () {
    const response = await request(app)
      .put("/companies/lenovo")
      .send({})

    expect(response.status).toEqual(500)
  })
})


describe("DELETE /", function () {

  test("It should delete company", async function () {
    const response = await request(app)
      .delete("/companies/lenovo")

    expect(response.body).toEqual({ "status": "deleted" })
  })

  test("It should return 404 for no-such-comp", async function () {
    const response = await request(app)
      .delete("/companies/blargh")

    expect(response.status).toEqual(404)
  })
})

