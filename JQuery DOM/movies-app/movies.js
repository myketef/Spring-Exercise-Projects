// id to keep track of which element to remove (this would be better not in global scope)
let currentId = 0;

// list of all movies in memory for sorting / repainting
let moviesList = [];

$(function () {
  // Submit form and add a new movie
  $("#new-movie-form").on("submit", function (evt) {
    evt.preventDefault();
    let title = $("#title").val().trim();
    let rating = $("#rating").val().trim();

    if (title.length < 2 || rating < 0 || rating > 10) {
      alert("Title must have at least 2 characters and rating must be between 0 and 10.");
      return;
    }

    let movieData = { title, rating, currentId };
    const HTMLtoAppend = createMovieDataHTML(movieData);

    currentId++;
    moviesList.push(movieData);

    $("#movie-table-body").append(HTMLtoAppend);
    $("#new-movie-form").trigger("reset");
  });

  // Handle delete button click
  $("tbody").on("click", ".btn.btn-danger", function (evt) {
    let deleteId = +$(evt.target).data("deleteId");

    // Find the index to remove
    let indexToRemoveAt = moviesList.findIndex(movie => movie.currentId === deleteId);

    // Remove from the array and DOM
    if (indexToRemoveAt !== -1) {
      moviesList.splice(indexToRemoveAt, 1);
      $(evt.target).closest("tr").remove();
    }
  });

  // Handle sorting by clicking the arrows
  $(".fas").on("click", function (evt) {
    let direction = $(evt.target).hasClass("fa-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    // Empty the table
    $("#movie-table-body").empty();

    // Repaint the sorted movies
    for (let movie of sortedMovies) {
      const HTMLtoAppend = createMovieDataHTML(movie);
      $("#movie-table-body").append(HTMLtoAppend);
    }

    // Toggle the arrow icon
    $(evt.target).toggleClass("fa-sort-down fa-sort-up");
  });
});

// Sort array of movie objects by key and direction
function sortBy(array, keyToSortBy, direction) {
  return array.sort(function (a, b) {
    if (keyToSortBy === "rating") {
      a[keyToSortBy] = +a[keyToSortBy];
      b[keyToSortBy] = +b[keyToSortBy];
    }
    if (a[keyToSortBy] > b[keyToSortBy]) {
      return direction === "up" ? 1 : -1;
    } else if (b[keyToSortBy] > a[keyToSortBy]) {
      return direction === "up" ? -1 : 1;
    }
    return 0;
  });
}

// Create movie row HTML
function createMovieDataHTML(data) {
  return `
    <tr>
      <td>${data.title}</td>
      <td>${data.rating}</td>
      <td>
        <button class="btn btn-danger" data-delete-id=${data.currentId}>
          Delete
        </button>
      </td>
    </tr>
  `;
}
