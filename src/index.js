const express = require("express");
const app = express();
const db = require("./queries");
require("dotenv").config();

const port = process.env.APP_PORT || 5000;

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});

//middleware 
app.use(express.json());



// ROUTES 
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/api/books", db.getBooks);
app.get("/api/books/:id", db.getBookById);
app.post("/api/books", db.createBook);
app.put("/api/books/:id", db.updateBook);
app.delete("/api/books/:id", db.deleteBook);

// Error-handling Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Internal Server Error');
});