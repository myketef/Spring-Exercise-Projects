let favNumber = 5
let favNumbers = [3, 6, 9, 18]

let baseURL = "http://numbersapi.com"

// part1
$.getJSON(`${baseURL}/${favNumber}?json`, function (data) {
  console.log(data)
})

// part2

$.getJSON(`${baseURL}/${favNumbers}?json`, function (data) {
  console.log(data)
})

// part3
let facts = []
$.getJSON(`${baseURL}/${favNumber}?json`, function (data) {
  facts.push(data.text)

  $.getJSON(`${baseURL}/${favNumber}?json`, function (data) {
    facts.push(data.text)

    $.getJSON(`${baseURL}/${favNumber}?json`, function (data) {
      facts.push(data.text)

      $.getJSON(`${baseURL}/${favNumber}?json`, function (data) {
        facts.push(data.text)
        facts.forEach(fact => {
          $("body").append(`<p>${fact}</p>`)
        })
      })
    })
  })
})
