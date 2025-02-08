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
        this.originalMovies = [];
    }

    setMovies(movies) {
        this.movies = movies;
        this.originalMovies = [...movies];
    }

    searchMovies(query) {
        return this.movies.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase().trim())
        );
    }

    sortMovies(option) {
        switch (option) {
            case "new-to-old":
                return [
                    ...this.movies.sort((a, b) => {
                        return b.year - a.year
                    })
                ]
            case "old-to-new":
                return [
                    ...this.movies.sort((a, b) => {
                        return a.year - b.year
                    })
                ]
            default:
                return [...this.originalMovies];                 
        }
    }
}
