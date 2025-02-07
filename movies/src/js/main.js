import { MovieManager } from "../js/class.js";
import { displayMovies } from "../js/helper.js";
const API_URL = 'https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies'
const searchInput = document.querySelector(".search-input");

const moviesList = new MovieManager()
document.addEventListener("DOMContentLoaded", ()=> {
    const fetchResult = fetch(API_URL).then(res => res.json())
    .then((data) => {
        moviesList.setMovies(data);
         displayMovies(moviesList.movies)
    })
    .catch(error=>console.error("fetch error", error));
    console.log(fetchResult);

})

searchInput.addEventListener("keyup", (e) => {
  const filteredMovies = moviesList.searchMovies(e.target.value);
  displayMovies(filteredMovies);
});






