const moviesContainer = document.querySelector('.row');

function loadFavorites() {
    moviesContainer.innerHTML = "";
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        moviesContainer.innerHTML = "<h3 class='text-center'>No favorite movies yet.</h3>";
        return;
    }

    favorites.forEach(movie => {
        moviesContainer.innerHTML += `
        <div class="movie-card col-lg-3 col-md-6 col-sm-12 mb-4 d-flex justify-content-center">
          <div class="card h-100" style="width: 18rem; margin-top:20px;">
            <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
            <div class="card-body">
              <a href="details.html?id=${movie.id}" class="card-title fs-4">
                <i class="fa-solid fa-circle-info"></i> ${movie.title}
              </a>
              <div class="buttons mt-3 d-flex gap-1">
                <button class="btn btn-danger trash favorited" data-id="${movie.id}">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });
}

moviesContainer.addEventListener("click", (e) => {
    const trashButton = e.target;
    
    if (trashButton && trashButton.classList.contains("trash")) {
        const movieCard = trashButton.parentElement.parentElement.parentElement; 
        const movieId = trashButton.getAttribute("data-id");

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(movie => movie.id !== movieId);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        movieCard.remove();

        if (favorites.length === 0) {
            moviesContainer.innerHTML = "<h3 class='text-center'>No favorite movies yet.</h3>";
        }
    }
});

document.addEventListener("DOMContentLoaded", loadFavorites);
