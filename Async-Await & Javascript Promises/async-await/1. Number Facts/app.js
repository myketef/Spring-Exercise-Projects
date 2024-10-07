let favNumber = 18
const favNumbers = [3, 6, 9, 18]

let baseURL = "http://numbersapi.com"

/**
 * part1
 *
 * This function makes a GET request to the Numbers API, asking for a fact
 * about the favorite number. It logs the response data to the console.
 */
async function part1() {
  let data = await $.getJSON(
    `${baseURL}/${favNumber}?json`
  )
  console.log(data)
}
part1()


/**
 * part2
*
* This function makes a GET request to the Numbers API, asking for a fact
* about each of the favorite numbers. It logs the response data to the console.
*/
async function part2() {
  let data = await $.getJSON(
    `${baseURL}/${favNumbers}?json`
  )
  console.log(data)
}
part2()

/**
 * part3
 *
 * This function makes 4 GET requests to the Numbers API, asking for a fact
 * about the favorite number. It logs the response data to the console.
 */
async function part3() {
  let facts = await Promise.all(
    Array.from(
      { length: 4 },
      () => $.getJSON(
        `${baseURL}/${favNumber}?json`
      )
    )
  )
  facts.forEach(data => {
    $('body').append(`<p>${data.text}</p>`)
  })
}
part3()
