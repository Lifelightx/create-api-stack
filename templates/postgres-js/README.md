# API Project (Node.js & PostgreSQL)

Generated with [create-api-stack](https://github.com/life/create-api-stack)

## Getting Started

1.  Clone the repository
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up your `.env` file (Make sure to provide `POSTGRES_URI`)
4.  Run in development mode:
    ```bash
    npm run dev
    ```

## Scripts

- `npm run dev`: Starts the server with nodemon for development.
- `npm start`: Starts the server in production mode.

## API Documentation

- Swagger documentation: `http://localhost:5000/api-docs`

### Auth
- `POST /api/v1/auth/register`: Register a new user
- `POST /api/v1/auth/login`: Login user
- `GET /api/v1/auth/me`: Get current user profile (Requires Bearer Token)

## Health Check
- `GET /health`: Check server status
