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

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault(); 

    const currentYear = new Date().getFullYear();
    // Must start with "https://"
    const urlRegex = /^https:\/\/.+$/;  
    // Only letters & spaces allowed
    const genreRegex = /^[A-Za-z\s]+$/; 

    if (!title.value || !genre.value || !poster.value || !year.value || !description.value || !imdbRate.value || !trailerURL.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required!",
        });
        return;
    }

    if (!urlRegex.test(poster.value) || !urlRegex.test(trailerURL.value)) {
        Swal.fire({
            icon: "error",
            title: "Invalid URL!",
            text: "Poster & Trailer URLs must start with 'https://'",
        });
        return;
    }

    if (!genreRegex.test(genre.value)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Genre!",
            text: "Genre should contain only letters and spaces!",
        });
        return;
    }

    const movieYear = parseInt(year.value);
    if (isNaN(movieYear) || movieYear > currentYear) {
        Swal.fire({
            icon: "error",
            title: "Invalid Year!",
            text: `Year must be a number and less than ${currentYear}!`,
        });
        return;
    }

    const movieImdb = parseFloat(imdbRate.value);
    if (isNaN(movieImdb) || movieImdb < 0 || movieImdb > 10) {
        Swal.fire({
            icon: "error",
            title: "Invalid IMDb Rating!",
            text: "IMDb rating must be a number between 0 and 10!",
        });
        return;
    }

    const newMovie = {
        title: title.value,
        genre: genre.value,
        poster: poster.value,
        year: movieYear, 
        description: description.value,
        imdbRate: movieImdb, 
        trailerURL: trailerURL.value,
        createdAt: Date.now()
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMovie)
        });

        if (!response.ok) {
            throw new Error("Failed to add movie");
        }

        Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Movie added successfully!",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            addInputs.forEach(input => input.value = ""); // Clears input fields
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.message || "Something went wrong!",
        });
    }
});
