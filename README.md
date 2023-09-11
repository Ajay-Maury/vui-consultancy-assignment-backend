# VUI Consultancy Assignment Backend

This is the backend server for the VUI Consultancy Assignment project. It provides API endpoints for user registration, authentication, logout and user data retrieval. The server is built using Node.js and Express.js and uses MongoDB for data storage.

## Table of Contents

1. [Frameworks and Dependencies](#frameworks-and-dependencies)
2. [Setup Instructions](#setup-instructions)
3. [Running the Server](#running-the-server)
4. [API Endpoints](#api-endpoints)

## Frameworks and Dependencies

- Node.js
- Express.js
- MongoDB (for data storage)
- Bcrypt (for password hashing)
- Jsonwebtoken (for JWT authentication)
- Validator (for input validation)
- Nodemon (for development)

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Ajay-Maury/vui-consultancy-assignment-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vui-consultancy-assignment-backend
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT=3000
   DATABASE_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   ```

   Replace `your_mongodb_connection_string` with your MongoDB database connection string and `your_secret_key` with your JWT secret key.

5. Set up your MongoDB database.

## Running the Server

To run the server, use the following command:

```bash
npm start
```

The server will start on port 3000 by default. You can change the port in the `.env` file if needed.

## API Endpoints

- `POST /api/user/register`: Register a new user.
  - Request Body:
    - `userName`: User's name
    - `email`: User's email address
    - `password`: User's password
  - Response:
    - `message`: Success or error message
    - `status`: `true` for success, `false` for error

- `POST /api/user/authenticate`: Authenticate a user and generate a JWT token.
  - Request Body:
    - `email`: User's email address
    - `password`: User's password
  - Response:
    - `token`: JWT token for authentication
    - `status`: `true` for success, `false` for error
    - `message`: Success or error message

- `POST /api/user/logout`: Log out a user and blacklist their JWT token.
  - Request Header:
    - `Authorization`: Bearer token
  - Response:
    - `status`: `true` for success, `false` for error
    - `message`: Success or error message

- `POST /api/user/get-data`: Get user data for an authenticated user.
  - Request Header:
    - `Authorization`: Bearer token
  - Response:
    - `status`: `true` for success, `false` for error
    - `user`: User data
    - `message`: Success or error message

- `GET /api`: Check if the server is running.
  - Response:
    - `message`: "Server is running"

---

With these instructions, you should be able to set up and run the VUI Consultancy Assignment Backend server locally.
