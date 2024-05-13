import pg from "pg";
import { posgtresIntegration } from "#config";
const {Pool} = pg;

const pool = new Pool({...posgtresIntegration})

export const fetch = async (query, type, ...params) => {
    const client = await pool.connect()
    try{
        if(type){
            const {rows:[row]} = await client.query(query, params ? params: null);
            return row
        }else{
            const {rows} = await client.query(query, params ? params: null);
            return rows
        };
    }catch(error){
        console.log(error);
    }finally{
        await client.release()
    }
}
export const SEARCH_QUERY = `
    SELECT u.*, 
    'user' AS type from users u
    WHERE LOWER(u.contact) LIKE LOWER($1) OR 
    LOWER(u.username) LIKE LOWER($1);
`;
export const SEARCH_BOOKS = `
    SELECT b.*,
    'book' AS type FROM books b
    WHERE LOWER(b.book_name) LIKE LOWER($1) OR 
    CAST(b.book_year AS varchar) LIKE LOWER($1);
`
export const SEARCH_FILMS = `
    SELECT f.*,
    'film' AS type from films f
    WHERE LOWER(film_name) LIKE LOWER($1) OR
    CAST(film_year AS VARCHAR) LIKE LOWER($1);
`
export const BOOK_QUERY = `
    SELECT * FROM books WHERE book_id=$1;
`
export const FILM_QUERY = `
    SELECT * FROM films WHERE film_id=$1;
`
export const getUsers = () => fetch("SELECT * FROM users;");
export const getBooks = () => fetch("SELECT * FROM books;");
export const getFilms = () => fetch("SELECT * from films;");
export const insertUser = (username, contact) => fetch("INSERT INTO users (username, contact) VALUES ($1, $2) RETURNING * ;", true, username, contact);
export const insertBook = (book_name, book_year, book_ganre) => fetch("INSERT INTO books (book_name, book_year, book_ganre) VALUES ($1, $2, $3) RETURNING *;", true, book_name, book_year, book_ganre)
export const searchQuery = async (query, value) => {
    let result = await fetch(query, false, "%" + value + "%");
    return [...result]
};
export const inserFilm = (film_name, film_year, film_ganre) =>  fetch('INSERT INTO films (film_name, film_year, film_ganre) VALUES ($1, $2, $3) RETURNING *;', true, film_name, film_year, film_ganre)
export const globalSearch = async ({key, users, films, books}) => {
    console.log(key, users, films, books)
    let searchUsers = users == 'true' ? await fetch(SEARCH_QUERY, false, "%" + key + "%"): [];
    let searchFilms = films == 'true' ? await fetch(SEARCH_FILMS, false, "%" + key + "%"): [];
    let searchBooks = books == 'true' ? await fetch(SEARCH_BOOKS, false, "%" + key + "%"): [];
    return [...searchUsers, ...searchBooks, ...searchFilms];
};
export const searchBook = async (bookId) => {
    const book = await fetch(BOOK_QUERY, true, bookId);
    return book
}
export const searchFilm = async (filmId) => {
    const film = await fetch(FILM_QUERY, true, filmId);
    return film;
}