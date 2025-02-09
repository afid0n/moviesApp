const API_URL = 'https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies'
const id = new URLSearchParams(window.location.search).get("id");
const title = document.querySelector('#title')
const genre = document.querySelector('#genre')
const poster = document.querySelector('#poster')
const year = document.querySelector('#year')
const description = document.querySelector('#description')
const imdbRate = document.querySelector('#imdb')
const trailerURL = document.querySelector('#trailer')
const createdAt = document.querySelector('#created-at')

document.addEventListener("DOMContentLoaded",()=>{
    fetch(API_URL + `/${id}`)
    .then((res)=>res.json())
    .then((movie)=>{
        if (movie) {
            title.textContent=movie.title;
            genre.textContent=movie.genre;
            poster.innerHTML = `<img src="${movie.poster}" alt="${movie.title}" width=300></img>`
            title.textContent=movie.title;
            year.textContent=movie.year;
            description.textContent=movie.description;
            imdbRate.textContent=movie.imdbRate;
            trailerURL.innerHTML = `<iframe width="560" height="315" src="${movie.trailerURL}"  allowfullscreen></iframe>`;
           createdAt.textContent= moment(movie.createdAt).format('LL');
        }
    })
})
