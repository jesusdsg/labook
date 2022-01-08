export class Books {
    id?: string;
    title: string;
    description: string;
    isbn: string;
    cover: string;
    digital: string;
    year: string;
    borrowed: number;
    category_id: number;
    author_id: number;
    location_id: number;
    category_name: string;
    author_name: string;
    location_name: string;

    constructor(title: string, description: string, isbn: string, cover: string, digital:string, year: string, borrowed: number, category_id: number, author_id: number,location_id: number, category_name: string, author_name: string, location_name: string) {
        this.title = title;
        this.description = description;
        this.isbn = isbn;
        this.cover = cover;
        this.digital = digital;
        this.year = year;
        this.borrowed = borrowed;
        this.category_id = category_id;
        this.author_id = author_id;
        this.location_id = location_id;
        this.category_name = category_name;
        this.author_name = author_name;
        this.location_name = location_name;
    }
}