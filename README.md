# Creator Dashboard Backend

This is the backend API for the Creator Dashboard application, built with FastAPI. It handles data analytics processing, user authentication, and data retrieval from various social media mock APIs.

## Tech Stack

-   **FastAPI**: Modern, fast (high-performance) web framework for building APIs with Python 3.7+.
-   **Uvicorn**: Lightning-fast ASGI server implementation.
-   **Pydantic**: Data validation and settings management using python type annotations.

## Prerequisites

-   Python 3.8+
-   `pip` (Python package installer)

## Setup & Installation

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create a virtual environment:**
    ```bash
    python -m venv venv
    ```

3.  **Activate the virtual environment:**
    -   **Windows:**
        ```bash
        venv\Scripts\activate
        ```
    -   **macOS/Linux:**
        ```bash
        source venv/bin/activate
        ```

4.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

## Running the Server

Start the development server with live reloading:

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

## API Documentation

Once the server is running, you can access the interactive API documentation (Swagger UI) at:
`http://127.0.0.1:8000/docs`

## Project Structure

-   `main.py`: Entry point for the FastAPI application.
-   `routers/`: Contains API route definitions (e.g., `analytics.py`, `auth.py`, `creators.py`).
-   `services/`: Business logic and data processing services.

## Production Deployment (Render)

When deploying to Render, use the following **Start Command**:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Ensure your Root Directory is set to `backend` (if deploying monorepo) or just root if deploying the backend repo separately.

-   `models.py`: Database models (SQLAlchemy/Pydantic schemas).
-   `database.py`: Database connection configuration.
