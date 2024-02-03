const pool = require("./pool");
// for api endpoint GET /api/books
async function getBooks(request, response) {
  console.log("Getting books...");

  try {
    console.log(request.query);

    let sql = "SELECT * FROM books WHERE true";
    const binds = [];

    if (request.query.title !== undefined && request.query.title !== "") {
      sql += " AND title = $1";
      binds.push(request.query.title);
    }

    if (request.query.author !== undefined && request.query.author !== "") {
      sql += " AND author = $1";
      binds.push(request.query.author);
    }

    if (request.query.genre !== undefined && request.query.genre !== "") {
      sql += " AND genre = $1";
      binds.push(request.query.genre);
    }

    let orderBy = "id"; // Default sorting by id
    if (request.query.sort !== undefined && request.query.sort !== "") {
      orderBy = request.query.sort;
    }

    let orderDirection = "ASC"; // Default sorting direction is ascending
    if (request.query.order !== undefined && request.query.order !== "") {
      orderDirection = request.query.order;
    }

    if (orderBy !== "id") {
      sql += ` ORDER BY ${orderBy} ${orderDirection}, id ASC`;
    } else {
      sql += ` ORDER BY ${orderBy} ${orderDirection}`;
    }

    console.log(sql);

    const books = await pool.query(sql, binds);

    response.status(200).json({ books: books.rows });
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}




// for api endpoint GET /api/books/:id
async function getBookById(request, response) {
  try {

    console.log("Getting book by id...");
    const id = parseInt(request.params.id);

    const sql = "SELECT * FROM books WHERE id = $1";

    const binds = [id];

    const existingBook = await pool.query(sql, binds);

    if (!existingBook.rows[0]) {
      return response.status(404).json({ message: `book with id: ${id} was not found` });
    }

    response.status(200).json(existingBook.rows[0]);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}

// for api endpoint POST /api/books
async function createBook(request, response) {
  try {
    const { title, author, genre, price } = request.body;

    console.log("Creating book...");
    console.log(request.body);

    const queryText = "INSERT INTO books (title, author, genre, price) VALUES ($1, $2, $3, $4) RETURNING id";

    const binds = [title, author, genre, price];

    const { rows } = await pool.query(queryText, binds);

    const newBookId = rows[0].id;
    const book = await pool.query("SELECT * FROM books WHERE id = $1", [newBookId]);

    response.status(201).json(book.rows[0]);
  } catch (error) {
    console.error("Error: ", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}




// for api endpoint PUT /api/books/:id
async function updateBook(request, response) {
  try {
    console.log("Updating book...");
    console.log(request.body);
    const id = parseInt(request.params.id);

    const { title, author, genre, price } = request.body;

    let existingBook = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
    console.log(existingBook.rows[0]);
    if (!existingBook.rows[0]) {
      return response.status(404).json({ message: `book with id: ${id} was not found` });
    }

    const binds = [title, author, genre, price, id];
    await pool.query("UPDATE books SET title = $1, author = $2, genre = $3, price = $4 WHERE id = $5", binds);

    existingBook = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    return response.status(200).json(existingBook.rows[0]);
    
  } catch (error) {
    console.error("Error:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}




// for api endpoint DELETE /api/books/:id
async function deleteBook(request, response) {
  try {
    const id = parseInt(request.params.id);

    console.log("Deleting book...");

    const existingBook = await pool.query("SELECT * FROM books WHERE id = $1", [id]);

    if(!existingBook.rows[0]){
      return response.status(404).json({ message: `book with id: ${id} was not found` });
    }

    const binds = [id];

    await pool.query("DELETE FROM books WHERE id = $1",binds);

    response.status(200).json({ message: "Book deleted successfully" });

  } catch (error) {
    console.error("Error: ", error);

    response.status(500).json({ error: "Internal Server Error" });

  }
}

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
