
export class Movie {
    constructor(title, genre, poster, year, description, imdbRate, trailerURL, createdAt) {
        this.title = title;
        this.genre = genre;
        this.poster = poster;
        this.year = year;
        this.description = description;
        this.imdbRate = imdbRate;
        this.trailerURL = trailerURL;
        this.createdAt = Date.now()

    }
}
export class MovieManager {
    constructor(movies = []) {
        this.movies = movies; 
    }

    setMovies(movies) {
        this.movies = movies; 
    }

    searchMovies(query) {
        return this.movies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase().trim())
        );
    }

    sortMovies(){}
}
