import { Movie, MovieManager } from "../js/class.js";
import { displayMovies } from "../js/helper.js";
const API_URL = 'https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies'
const searchInput = document.querySelector(".search-input");
const sortSelect = document.querySelector("#movies-sort")
const moviesContainer = document.querySelector('.row')


const moviesList = new MovieManager()
document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then(res => res.json())
    .then((data) => {
      moviesList.setMovies(data);
      displayMovies(moviesList.movies);
    })
    .catch(error => console.error("fetch error", error));

  moviesContainer.addEventListener("click",(btn) => {
    if (btn.target.classList.contains("delete")) {
      const result = Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this movie!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });


      if (result.isConfirmed) {
        const id = btn.target.getAttribute("data-id");


        let movieCard = btn.target.parentElement.parentElement.parentElement.parentElement;

        fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete movie");
            }
            return res.json();
          })
          .then(() => {
            Swal.fire("Deleted!", "Your movie has been deleted.", "success");
            if (movieCard) {
              movieCard.remove();
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to delete movie.", "error");
            console.error(err);
          });
      }
    }
  })
});

searchInput.addEventListener("keyup", (e) => {
  const filteredMovies = moviesList.searchMovies(e.target.value);
  displayMovies(filteredMovies);
});

sortSelect.addEventListener('change', (y) => {
  searchInput.value = ''
  const sortedMovies = moviesList.sortMovies(y.target.value);
  displayMovies(sortedMovies);
})







