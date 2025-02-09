const moviesContainer = document.querySelector('.row');

export function displayMovies(movies) {
    moviesContainer.innerHTML = '';

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    movies.forEach(movie => {
        const isFavorite = favorites.some(fav => fav.id === movie.id);

        moviesContainer.innerHTML += `
        <div class="movie-card col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div class="card h-100" style="width: 18rem; margin-top:20px;">
            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
              <a href="details.html?id=${movie.id}" class="card-title fs-4">
                <i class="fa-solid fa-circle-info"></i> ${movie.title}
              </a>
              <p class="card-genre">${movie.genre}</p>
              <span class="card-imdb"><i class="fa-solid fa-star"></i> IMDb ${movie.imdbRate}/10</span>
              <div class="buttons mt-3 d-flex gap-1">
                <button class="btn btn-secondary heart ${isFavorite ? 'favorited' : ''}" data-id="${movie.id}">
                  <i class="fa-solid fa-heart"></i>
                </button>
                <button class="btn btn-danger delete" data-id="${movie.id}">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <a href="edit.html?id=${movie.id}" class="btn btn-warning">
                  <i class="fa-solid fa-pen-to-square"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
    });
}
