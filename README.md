# Leafinity Project

## Description
Leafinity is a full-stack web application consisting of a Node.js/Express backend and a React frontend. The backend provides RESTful API endpoints for managing plants, calendar events, consultations, database entries, exchanges, marketplace, and user authentication. The frontend is a React application that interacts with the backend API to provide a seamless user experience.

## Prerequisites
- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB (local or cloud instance)

## Backend Setup and Run Instructions

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server in development mode:
   ```bash
   npm run dev
   ```

5. The backend server will run at [http://localhost:5000](http://localhost:5000).

## Frontend Setup and Run Instructions

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

4. The frontend app will run at [http://localhost:3000](http://localhost:3000) and proxy API requests to the backend.

## Running the Full Application

- Start the backend server first (`npm run dev` in `backend`).
- Then start the frontend server (`npm start` in `frontend`).
- Access the app via [http://localhost:3000](http://localhost:3000).

## API Routes Overview

The backend exposes the following main API routes:

- `/api/plants` - Plant related operations
- `/api/calender` - Calendar events
- `/api/consultations` - Consultations management
- `/api/database` - Database entries
- `/api/exchange` - Exchange features
- `/api/marketplace` - Marketplace operations
- `/api/auth` - User authentication (login, register, etc.)

## License

This project is licensed under the ISC License.

## Author

Chetana Rangu
