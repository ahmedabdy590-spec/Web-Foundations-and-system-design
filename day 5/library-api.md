# Library Books API Design

Base URL: `/api`

## Endpoints

- **List books**
  - Method: `GET`
  - Path: `/api/books`
  - Description: Returns a list of books.
  - Success status: `200 OK`

- **Get one book**
  - Method: `GET`
  - Path: `/api/books/{bookId}`
  - Description: Returns the book with the specified ID.
  - Success status: `200 OK`

- **Create a book**
  - Method: `POST`
  - Path: `/api/books`
  - Description: Adds a new book to the library.
  - Example request body:
    ```json
    {
      "title": "Things Fall Apart",
      "author": "Chinua Achebe",
      "publishedYear": 1958
    }
    ```
  - Success status: `201 Created`

- **Update a book**
  - Method: `PUT`
  - Path: `/api/books/{bookId}`
  - Description: Replaces the details of the specified book.
  - Example request body:
    ```json
    {
      "title": "Things Fall Apart",
      "author": "Chinua Achebe",
      "publishedYear": 1958
    }
    ```
  - Success status: `200 OK`

- **Delete a book**
  - Method: `DELETE`
  - Path: `/api/books/{bookId}`
  - Description: Deletes the specified book.
  - Success status: `204 No Content`

- **List books by author**
  - Method: `GET`
  - Path: `/api/books?author=Chinua%20Achebe`
  - Description: Returns books that match the author query parameter.
  - Success status: `200 OK`

## Error Codes

- **400 Bad Request** — The request is invalid, such as creating a book without a required `title`.
- **404 Not Found** — The requested book ID does not exist, such as `GET /api/books/9999`.
