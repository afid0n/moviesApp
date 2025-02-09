import { Movie, MovieManager } from "../js/class.js";
import { displayMovies } from "../js/helper.js";

const API_URL = 'https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies';
const searchInput = document.querySelector(".search-input");
const sortSelect = document.querySelector("#movies-sort");
const moviesContainer = document.querySelector('.row');

const moviesList = new MovieManager();

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then(res => res.json())
    .then((data) => {
      moviesList.setMovies(data);
      displayMovies(moviesList.movies);
    })
    .catch(error => console.error("Fetch error", error));

  moviesContainer.addEventListener("click", async (btn) => {
    if (btn.target.classList.contains("delete")) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this movie!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        const id = btn.target.getAttribute("data-id");

        let movieCard = btn.target.parentElement.parentElement.parentElement.parentElement;

        try {
          const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Failed to delete movie");
          }

          Swal.fire("Deleted!", "Your movie has been deleted.", "success");

          if (movieCard) {
            movieCard.remove();
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to delete movie.", "error");
          console.error(error);
        }
      }
    }
  });
});

searchInput.addEventListener("keyup", (e) => {
  const filteredMovies = moviesList.searchMovies(e.target.value);
  displayMovies(filteredMovies);
});

sortSelect.addEventListener('change', (y) => {
  searchInput.value = '';
  const sortedMovies = moviesList.sortMovies(y.target.value);
  displayMovies(sortedMovies);
});


moviesContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("heart-icon")) {
        const movieCard = e.target.closest(".movie-card");
        const movieId = movieCard.getAttribute("data-id");

        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.some(movie => movie.id === movieId)) {
            // Remove from favorites
            favorites = favorites.filter(movie => movie.id !== movieId);
            e.target.classList.remove("favorite"); // Remove filled heart
        } else {
            // Add to favorites
            const movieData = {
                id: movieId,
                title: movieCard.querySelector(".movie-title").textContent,
                poster: movieCard.querySelector(".movie-poster").src
            };
            favorites.push(movieData);
            e.target.classList.add("favorited"); // Show filled heart
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
});

