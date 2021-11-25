export class Books {
    id?: string;
    title: string;
    isbn: string;
    cover: string;
    year: string;
    category_id: number;
    author_id: number;

    constructor(title: string, isbn: string, cover: string, year: string, category_id: number, author_id: number) {
        this.title = title;
        this.isbn = isbn;
        this.cover = cover;
        this.year = year;
        this.category_id = category_id;
        this.author_id = author_id;
    }
}