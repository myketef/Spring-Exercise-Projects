/** Integration tests for books route */


process.env.NODE_ENV = "test"

const request = require("supertest")


const app = require("../app")
const db = require("../db")


// isbn of sample book
let book_isbn


beforeEach(async () => {
  let result = await db.query(`
    INSERT INTO books 
            (isbn, amazon_url,author,language,pages,publisher,title,year)
    VALUES  ('123456789', 'https://amazon.com/broth', 'Chicken Broth',
        'English', 2000, 'The publishers', 'my first book', 2018)
      RETURNING isbn`
  )

  book_isbn = result.rows[0].isbn
})


describe("POST /books", function () {
  test("Creates a new book", async function () {
    const response = await request(app)
      .post(`/books`)
      .send({
        isbn: '194857867',
        amazon_url: "https://google.com",
        author: "Mike",
        language: "english",
        pages: 12000,
        publisher: "The One Publisher",
        title: "Kitchen Sink",
        year: 2020
      })
    expect(response.statusCode).toBe(201)
    expect(response.body.book).toHaveProperty("isbn")
  })

  test("Prevents creating book without required title", async function () {
    const response = await request(app)
      .post(`/books`)
      .send({ year: 2010 })
    expect(response.statusCode).toBe(400)
  })
})


describe("GET /books", function () {
  test("Gets a list of 1 book", async function () {
    const response = await request(app).get(`/books`)
    const books = response.body.books
    expect(books).toHaveLength(1)
    expect(books[0]).toHaveProperty("isbn")
    expect(books[0]).toHaveProperty("amazon_url")
  })
})


describe("GET /books/:isbn", function () {
  test("Gets a single book", async function () {
    const response = await request(app)
      .get(`/books/${book_isbn}`)
    expect(response.body.book).toHaveProperty("isbn")
    expect(response.body.book.isbn).toBe(book_isbn)
  })

  test("Responds with 404 if can't find book in question", async function () {
    const response = await request(app)
      .get(`/books/1234512345`)
    expect(response.statusCode).toBe(404)
  })
})


describe("PUT /books/:id", function () {
  test("Updates a single book", async function () {
    const response = await request(app)
      .put(`/books/${book_isbn}`)
      .send({
        amazon_url: "https://google.com",
        author: "Mike",
        language: "english",
        pages: 10000,
        publisher: "The Special Publisher",
        title: "UPDATED BOOK",
        year: 2022
      })
    expect(response.body.book).toHaveProperty("isbn")
    expect(response.body.book.title).toBe("UPDATED BOOK")
  })

  test("Prevents a bad book update", async function () {
    const response = await request(app)
      .put(`/books/${book_isbn}`)
      .send({
        isbn: "194857867",
        badField: "DO NOT ADD ME!",
        amazon_url: "https://taco.com",
        author: "mctest",
        language: "english",
        pages: 1000,
        publisher: "yeah right",
        title: "UPDATED BOOK",
        year: 2019
      })
    expect(response.statusCode).toBe(400)
  })

  test("Responds 404 if can't find book in question", async function () {
    // delete book first
    await request(app)
      .delete(`/books/${book_isbn}`)
    const response = await request(app).delete(`/books/${book_isbn}`)
    expect(response.statusCode).toBe(404)
  })
})


describe("DELETE /books/:id", function () {
  test("Deletes a single a book", async function () {
    const response = await request(app)
      .delete(`/books/${book_isbn}`)
    expect(response.body).toEqual({ message: "Book deleted" })
  })
})


afterEach(async function () {
  await db.query("DELETE FROM BOOKS")
})


afterAll(async function () {
  await db.end()
})
