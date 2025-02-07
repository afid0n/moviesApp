const API_URL = 'https://67a46e0e31d0d3a6b78652f0.mockapi.io/api/movies'
const moviesContainer = document.querySelector('.row')
 
document.addEventListener("DOMContentLoaded", ()=> {
    const fetchResult = fetch(API_URL).then(res => res.json())
    .then((data) => {
        const moviesList = data
        console.log(moviesList);
         moviesContainer.innerHTML = ''
        moviesList.forEach(movie => {
            console.log("movie", movie);
            
            const poster = movie.poster
            const title = movie.title;
            const genre = movie.genre;
            const imdbRate = movie.imdbRate
            moviesContainer.innerHTML += `
            <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
             <div class="card h-100" style="width: 18rem; margin-top:20px;" >
      <img src="${poster}" class="card-img-top" alt="${title}">
      <div class="card-body">
        <a class="card-title  fs-4"><i class="fa-solid fa-circle-info"></i> ${title}</a>
        <p class="card-genre">${genre}</p>
        <span class="card-imdb"><i class="fa-solid fa-star"></i> IMDb ${imdbRate}/10</span>
        <div class="buttons mt-3 d-flex gap-1">
        <button class="btn btn-secondary"><i class="fa-solid fa-heart"></i></button>
        <button class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
        <button class="btn btn-warning"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
      </div>
    </div> </div> `

        });
    })
    .catch(error=>console.error("fetch error", error));

})

console.log(fetchResult);

