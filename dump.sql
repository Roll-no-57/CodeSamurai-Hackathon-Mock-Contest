DROP TABLE IF EXISTS BOOKS;

CREATE TABLE BOOKS (
    ID SERIAL PRIMARY KEY,
    TITLE VARCHAR(100),
    AUTHOR VARCHAR(100),
    GENRE VARCHAR(100),
    PRICE DECIMAL(5,2)
);
