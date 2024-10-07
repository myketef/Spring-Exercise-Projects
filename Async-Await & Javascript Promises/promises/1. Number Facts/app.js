let favNumber = 5
let favNumbers = [3, 6, 9, 18]

let baseURL = "http://numbersapi.com"

// part1
$.getJSON(`${baseURL}/${favNumber}?json`).then(data => {
  console.log(data)
})

// part2
$.getJSON(`${baseURL}/${favNumbers}?json`).then(data => {
  console.log(data)
})

// part3
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favNumber}?json`)
  })
).then(facts => {
  facts.forEach(data => $("body").append(`<p>${data.text}</p>`))
})
