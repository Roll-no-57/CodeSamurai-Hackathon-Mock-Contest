# Code Samurai Mock Hackathon - Team BUET_FRIENDS

## Team Members:
1. Junayed Mohiuddin Shanto
2. Mosharaf Hossain Apurbo
3. Mohiuddin Sizan

## Project: Samurai e-Book Store

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
