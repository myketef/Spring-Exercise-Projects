$(document).ready(function () {
  "use strict"

  const $showsList = $("#showsList")
  const $episodesArea = $("#episodesArea")
  const $episodesList = $("#episodesList")
  const $searchForm = $("#searchForm")

  const MISSING_IMAGE_URL = "https://tinyurl.com/tv-missing"
  const TVMAZE_API_URL = `http://api.tvmaze.com`

  /** Given a search term, search for tv shows that match that query.
   *  Returns (promise) array of show objects: {id, name, summary, image}.
   */
  async function getShowsByTerm(term) {
    const url = `${TVMAZE_API_URL}/search/shows?q=${term}`
    const response = await axios.get(url)
    const shows = response.data.map(show => ({
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image ? show.show.image.medium : MISSING_IMAGE_URL
    }))
    return shows
  }

  /** Given list of shows, create markup for each and append to DOM */
  function populateShows(shows) {
    $showsList.empty()

    for (const show of shows) {
      const $show = $(`
        <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
          <div class="media">
            <img src="${show.image}" alt="${show.name}" class="w-25 me-3">
            <div class="media-body">
              <h5 class="text-primary">${show.name}</h5>
              <div><small>${show.summary}</small></div>
              <button class="btn btn-outline-light btn-sm Show-getEpisodes">
                Episodes
              </button>
            </div>
          </div>
        </div>
      `)
      $showsList.append($show)
    }
  }

  /** Handle search form submission */
  async function searchForShowAndDisplay() {
    const term = $("#searchForm-term").val()
    const shows = await getShowsByTerm(term)
    $episodesArea.hide()
    populateShows(shows)
  }

  $searchForm.on("submit", async function (evt) {
    evt.preventDefault()
    await searchForShowAndDisplay()
  })

  /** Given a show ID, get episodes from API */
  async function getEpisodesOfShow(id) {
    const url = `${TVMAZE_API_URL}/shows/${id}/episodes`
    const response = await axios.get(url)
    const episodes = response.data.map(episode => ({
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number
    }))
    return episodes
  }

  /** Populate episodes list and show the area */
  function populateEpisodes(episodes) {
    $episodesList.empty()
    for (const episode of episodes) {
      const $episode = $(`<li>${episode.name} (Season ${episode.season}, Episode ${episode.number})</li>`)
      $episodesList.append($episode)
    }
    $episodesArea.show()
  }

  $showsList.on("click", ".Show-getEpisodes", async function (evt) {
    evt.stopPropagation()
    const showId = $(evt.target).closest(".Show").data("show-id")
    const episodes = await getEpisodesOfShow(showId)
    populateEpisodes(episodes)
  })

  // Expose functions to the global `window` object so they can be tested
  window.getShowsByTerm = getShowsByTerm
  window.getEpisodesOfShow = getEpisodesOfShow
  window.populateShows = populateShows
  window.populateEpisodes = populateEpisodes
  window.searchForShowAndDisplay = searchForShowAndDisplay

})
