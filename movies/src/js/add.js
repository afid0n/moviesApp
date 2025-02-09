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

    if (!title.value || !genre.value || !poster.value || !year.value || !description.value || !imdbRate.value || !trailerURL.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "All fields are required!",
        });
        return;
    }

    const newMovie = {
        title: title.value,
        genre: genre.value,
        poster: poster.value,
        year: parseInt(year.value), 
        description: description.value,
        imdbRate: parseFloat(imdbRate.value), 
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
            addInputs.forEach(input => input.value = "");
        });

    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: error.message || "Something went wrong!",
        });
    }
});
