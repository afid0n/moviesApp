const API_URL = 'https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies';

const addInputs = document.querySelectorAll(".add-input");
const title = document.querySelector('#title');
const genre = document.querySelector('#genre');
const poster = document.querySelector('#poster');
const year = document.querySelector('#year');
const description = document.querySelector('#description');
const imdbRate = document.querySelector('#imdb');
const trailerURL = document.querySelector('#trailer');
const submitBtn = document.querySelector('#submit');

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

async function fetchMovie() {
    if (!movieId) {
        Swal.fire("Error", "Movie ID not found in URL!", "error");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${movieId}`);
        if (!response.ok) throw new Error("Failed to fetch movie data");
        
        const movie = await response.json();

        title.value = movie.title;
        genre.value = movie.genre;
        poster.value = movie.poster;
        year.value = movie.year;
        description.value = movie.description;
        imdbRate.value = movie.imdbRate;
        trailerURL.value = movie.trailerURL;

    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const urlRegex = /^https:\/\/.+$/;
    const genreRegex = /^[A-Za-z\s]+$/;

    if (!title.value || !genre.value || !poster.value || !year.value || !description.value || !imdbRate.value || !trailerURL.value) {
        Swal.fire("Oops...", "All fields are required!", "error");
        return;
    }

    if (!urlRegex.test(poster.value) || !urlRegex.test(trailerURL.value)) {
        Swal.fire("Invalid URL!", "Poster & Trailer URLs must start with 'https://'", "error");
        return;
    }

    if (!genreRegex.test(genre.value)) {
        Swal.fire("Invalid Genre!", "Genre should contain only letters and spaces!", "error");
        return;
    }

    const movieYear = parseInt(year.value);
    if (isNaN(movieYear) || movieYear > currentYear) {
        Swal.fire("Invalid Year!", `Year must be a number and less than ${currentYear}!`, "error");
        return;
    }

    const movieImdb = parseFloat(imdbRate.value);
    if (isNaN(movieImdb) || movieImdb < 0 || movieImdb > 10) {
        Swal.fire("Invalid IMDb Rating!", "IMDb rating must be a number between 0 and 10!", "error");
        return;
    }

    const updatedMovie = {
        title: title.value,
        genre: genre.value,
        poster: poster.value,
        year: movieYear, 
        description: description.value,
        imdbRate: movieImdb, 
        trailerURL: trailerURL.value
    };

    try {
        const response = await fetch(`${API_URL}/${movieId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMovie)
        });

        if (!response.ok) throw new Error("Failed to update movie");

        Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Movie updated successfully!",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            window.location.href = "index.html"; 
        });

    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
});

document.addEventListener("DOMContentLoaded", fetchMovie);
