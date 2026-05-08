# nhub-backend

A simple REST API built with Node.js and Express that allows you to create and retrieve users. User data is persisted to a local JSON file.

## Tech Stack

- **Node.js** — JavaScript runtime
- **Express** — Web framework
- **fs (File System)** — Built-in Node.js module for reading and writing to `user.json`

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository

```bash
git clone https://github.com/HenryUdogu/nhub-backend.git
```

2. Navigate into the project folder

```bash
cd nhub-backend
```

3. Install dependencies

```bash
npm install
```

4. Start the server

```bash
node app.js
```

The server will run on **http://localhost:3000**

---

## API Endpoints

### Get all users

```
GET /api/users
```

**Response:**
```json
{
  "totalUsers": 2,
  "users": [
    { "name": "Henry", "age": 22, "email": "henry@example.com" },
    { "name": "John", "age": 25, "email": "john@example.com" }
  ]
}
```

---

### Create a user

```
POST /api/users
```

**Request body:**
```json
{
  "name": "Henry",
  "age": 22,
  "email": "henry@example.com"
}
```

**Response:**
```json
{
  "message": "user added",
  "users": [...]
}
```

**Validation — all fields are required:**
```json
{
  "message": "Validation failed",
  "error": {
    "name": "Name is required",
    "age": "Age is required",
    "email": "Email is required"
  }
}
```

---

## Project Structure

```
nhub-backend/
├── app.js              # Entry point, sets up Express and mounts routes
├── routes/
│   └── userRoutes.js   # User route handlers (GET, POST)
├── user.json           # Local data storage for users
└── package.json
```

---

## Data Storage

Users are stored in a `user.json` file locally. There is no database — data is read and written directly to this file using Node's built-in `fs` module.

---

## Testing with Postman

- Set method to **POST**, URL to `http://localhost:3000/api/users`
- Set **Body** to `raw` → `JSON`
- Pass `name`, `age`, and `email` fields

To view all users, send a **GET** request to `http://localhost:3000/api/users`

---

## Author

**Henry Udogu**
