$(function () {
  let baseURL = 'https://deckofcardsapi.com/api/deck'

  /**
   * Logs a single card to the console, using an async function.
   */
  async function part1() {
    let data = await $.getJSON(`${baseURL}/new/draw/`)
    let { suit, value } = data.cards[0]

    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
  }

  /**
   * Logs two cards to the console, one after the other, by
   * drawing them from the same deck.
   */
  async function part2() {
    let firstCardData = await $.getJSON(`${baseURL}/new/draw/`)
    let deckId = firstCardData.deck_id
    let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`)

    [firstCardData, secondCardData].forEach(card => {
      let { suit, value } = card.cards[0]
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    })
  }

  /**
   * Set up the deck of cards game. This function is an async function.
   * It first creates a new deck of cards, then sets up an event handler
   * on the button to draw a card from the deck every time the button
   * is clicked. The drawn card is then appended to the card-area div
   * with a random angle and position. When all the cards have been
   * drawn, the button is removed.
   */
  async function setup() {
    let $btn = $('button')
    let $cardArea = $('#card-area')

    let deckData = await $.getJSON(`${baseURL}/new/shuffle/`)
    $btn.show().on('click', async function () {
      let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`)
      let cardSrc = cardData.cards[0].image
      let angle = Math.random() * 90 - 45
      let randomX = Math.random() * 40 - 20
      let randomY = Math.random() * 40 - 20
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      )
      if (cardData.remaining === 0) $btn.remove()
    })
  }
  setup()
})
