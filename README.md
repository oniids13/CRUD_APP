# CRUD_APP

Assessment Exam

# Flask-React CRUD Application

## Overview

This project is a simple CRUD (Create, Read, Update, Delete) web application built using Flask for the backend and React.js (with Vite) for the frontend. The application allows users to manage a list of items, including creating new items, viewing item details, updating existing items, and deleting items. The backend uses Flask and SQLAlchemy, and the frontend is built using React.js with Vite as the build tool.

## Project Structure

The project is divided into two main parts:

1. **Backend (Flask)**:

   - The backend API is built with Flask, using SQLAlchemy for database management.
   - The application has SQLite database (`items.db`) for managing item data.

2. **Frontend (React.js)**:
   - The frontend is built using React.js with Vite for fast development and easy configuration.
   - The application includes pages for listing items, viewing item details, creating new items, and updating existing items.

## Setup Instructions

### Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- Python 3.7+
- Node.js (with npm or Yarn)
- Git (for version control)

### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/oniids13/CRUD_APP.git
   cd your-repo/backend
   ```

2. **Create a Virtual Environment**:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install Backend Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure the Databases**:

   - The application uses SQLite database: `items.db`.
   - Make sure these files are present in the project directory.

5. **Start the Flask Application**:

   ```bash
   flask run
   ```

   The Flask API will be available at `http://127.0.0.1:5000/`.

### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash
   cd ../frontend
   ```

2. **Install Frontend Dependencies**:

   ```bash
   npm install  # or yarn install
   ```

3. **Start the React Application**:

   ```bash
   npm run dev  # or yarn dev
   ```

   The React application will be available at `http://localhost:5173/`.

## Project Explanation

### Backend

- **Flask**: Used for creating the RESTful API.
- **SQLAlchemy**: Used for ORM-based database management.
- **SQLite**: Used for the `items.db` database.

### Frontend

- **React.js**: Used for building the user interface.
- **Vite**: Used as the build tool for fast development and bundling.

## Assumptions Made

- The `items.db` SQLite database is used for managing item data. Ensure these database are created and configured properly.
- The React frontend expects the Flask backend to be running on `http://127.0.0.1:5000/`. Adjust API endpoints if necessary.
- Basic error handling is implemented in the frontend, but detailed error reporting is assumed to be handled by the Flask backend.

## Notes

- Ensure that the backend and frontend are started simultaneously for the application to function correctly.
- Modify API endpoints and database configurations as needed based on your deployment environment.
