$(function () {

    const apiKey = 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'
    const searchForm = $('#search-form')
    const searchTermInput = $('#search-term')
    const gifsContainer = $('#gifs')
    const clearGifsButton = $('#clear-gifs')

    function searchGifs(searchTerm) {
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=1`
        axios.get(url)
            .then(response => {
                const gifData = response.data.data[0]
                const gifUrl = gifData.images.downsized_medium.url
                const gifImg = $('<img>')
                gifImg.attr('src', gifUrl)
                gifImg.addClass('col-md-4 mb-4') // Add Bootstrap classes
                gifsContainer.append(gifImg)
            })
            .catch(error => {
                console.error(error)
            })
    }

    searchForm.submit(function (event) {
        event.preventDefault()
        const searchTerm = searchTermInput.val()
        searchGifs(searchTerm)
        searchTermInput.val('')
    })

    clearGifsButton.click(function () {
        gifsContainer.empty()
    })

})