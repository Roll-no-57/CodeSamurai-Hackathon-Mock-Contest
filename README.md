# Code Samurai Mock Hackathon 

### BUET_FRIENDS

🎓 **University:** Bangladesh University Of Engineering And Technology

📧 **Emails:**
- [jonayedmohiuddin@gmail.com](mailto:jonayedmohiuddin@gmail.com)
- [aoarish397@gmail.com](mailto:aoarish397@gmail.com)
- [mohiuddinsizan13@gmail.com](mailto:mohiuddinsizan13@gmail.com)

## Project: Samurai e-Book Store

### You can find problem statement here : [Problem](https://drive.google.com/file/d/1Gg-4FzDDoq9wdZlxRB4gKfHQc5w4kxfC/view)

### API Endpoints

#### Add Books
- **URL:** `/api/books`
- **Method:** POST
- **Response:** Saved book object

#### Update Books
- **URL:** `/api/books/{id}`
- **Method:** PUT
- **Response:** Updated book object

#### Fetch Book by ID
- **URL:** `/api/books/{id}`
- **Method:** GET
- **Response:** Book object

#### Fetch All Books
- **URL:** `/api/books`
- **Method:** GET
- **Response:** List of book objects (sorted by ID)

#### Search Books
- **URL:** `/api/books?{search_field}={value}&sort={sorting_field}&order={sorting_order}`
- **Method:** GET
- **Search Fields:** title, author, genre
- **Sorting Fields:** title, author, genre, price
- **Sorting Orders:** ASC (ascending), DESC (descending)
- **Response:** Searched book objects (sorted according to provided criteria)
