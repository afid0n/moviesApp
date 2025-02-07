export class Movie{
    constructor(title,genre,poster,year,description,imdbRate,trailerURL,createdAt){
        this.title=title;
        this.genre=genre;
        this.poster=poster;
        this.year=year;
        this.description=description;
        this.imdbRate=imdbRate;
        this.trailerURL=trailerURL;
        this.createdAt= Date.now()
        
    }

}