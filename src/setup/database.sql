CREATE DATABASE books;

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(64) NOT NULL UNIQUE,
    contact VARCHAR(15) NOT NULL UNIQUE
);
DROP TABLE IF EXISTS books CASCADE;
CREATE TABLE books(
    book_id BIGSERIAL primary key,
    book_name VARCHAR(32) not null UNIQUE,
    book_year INT NOT NULL,
    book_ganre VARCHAR(32) NOT NULL 
);
DROP TABLE IF EXISTS films CASCADE;
CREATE TABLE films( 
    film_id BIGSERIAL primary key,
    film_name VARCHAR(32) not null,
    film_year INT NOT NULL,
    film_ganre VARCHAR(32) NOT NULL 
);
INSERT INTO users(username, contact) VALUES('Shohijahon', '998991457766');
INSERT INTO users(username, contact) VALUES('Sardor', '998996000683');

INSERT INTO books (book_name, book_year, book_ganre) VALUES('Harry Potter', 2006, 'sci-fi');
INSERT INTO books (book_name, book_year, book_ganre) VALUES('O''tkan kunlar ', 9666, 'drama');
INSERT INTO books (book_name, book_year, book_ganre) VALUES('Mergan ', 1261, 'action');

INSERT INTO films (film_name, film_year, film_ganre) VALUES('Forsaj', 2015, 'action');
INSERT INTO films (film_name, film_year, film_ganre) VALUES('Hovli', 2018, 'soap-opera');
INSERT INTO films (film_name, film_year, film_ganre) VALUES('Kung-fu panda', 2010, 'cartoon');
-- unique(first_name, last_name) 2 ta column unique qilish uchun
-- CREATE UNIQUE INDEX ON users(user_name); username ni unique qilib beradi bundan ko'ra yaratilayotgan vaqtda o'sha column da unique yozib ketish to'g'ri bo'ladi
