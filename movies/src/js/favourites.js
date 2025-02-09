const favoritesContainer = document.querySelector("#favorites-container");

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesContainer.innerHTML = favorites.map(movie => `
        <div class="col-lg-3 movie-card" data-id="${movie.id}">
            <img class="movie-poster" src="${movie.poster}" alt="${movie.title}">
            <h5 class="movie-title">${movie.title}</h5>
            <button class="remove-fav btn btn-danger">Remove</button>
        </div>
    `).join("");
}

favoritesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-fav")) {
        const movieCard = e.target.closest(".movie-card");
        const movieId = movieCard.getAttribute("data-id");

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        favorites = favorites.filter(movie => movie.id !== movieId);
        localStorage.setItem("favorites", JSON.stringify(favorites));

        movieCard.remove();
    }
});

document.addEventListener("DOMContentLoaded", loadFavorites);
