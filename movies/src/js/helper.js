const moviesContainer = document.querySelector('.row')
export function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const id = movie.id
    const poster = movie.poster
    const title = movie.title;
    const genre = movie.genre;
    const imdbRate = movie.imdbRate
    moviesContainer.innerHTML += `
        <div class="movie-card col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div class="card h-100" style="width: 18rem; margin-top:20px;">
            <img src="${poster}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <a href="details.html?id=${id}" class="card-title fs-4"><i class="fa-solid fa-circle-info"></i> ${title}</a>
              <p class="card-genre">${genre}</p>
              <span class="card-imdb"><i class="fa-solid fa-star"></i> IMDb ${imdbRate}/10</span>
              <div class="buttons mt-3 d-flex gap-1">
                <button class="btn btn-secondary heart "><i class="fa-solid fa-heart heart"></i></button>
                <button class="btn btn-danger delete" data-id=${id}><i class="fa-solid fa-trash delete"></i></button>
                <a href="edit.html?id=${id}" class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></a>
              </div>
            </div>
          </div>
        </div>
      `;
  });
}