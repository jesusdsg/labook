export class Books {
    id?: string;
    title: string;
    description: string;
    isbn: string;
    cover: string;
    year: string;
    category_id: number;
    author_id: number;
    category_name: string;
    author_name: string;

    constructor(title: string, description: string, isbn: string, cover: string, year: string, category_id: number, author_id: number, category_name: string, author_name: string) {
        this.title = title;
        this.description = description;
        this.isbn = isbn;
        this.cover = cover;
        this.year = year;
        this.category_id = category_id;
        this.author_id = author_id;
        this.category_name = category_name;
        this.author_name = author_name;
    }
}