# Creator Analytics Dashboard

A full-stack application for managing social media creators and viewing backend-generated analytics.

## Tech Stack

- **Backend:** FastAPI (Python), SQLAlchemy, MySQL, PyJWT, Boto3 (AWS S3)
- **Frontend:** Next.js (React), Tailwind CSS, Recharts, Axios
- **Database:** MySQL
- **Storage:** AWS S3

## Features

- **Authentication:** Secure user registration and login (JWT).
- **Creator Management:** Add, view, delete creators with profile images (S3).
- **Analytics:** Mock data generation for followers, engagement, likes, and comments.
- **Visualizations:** Interactive charts for growth and engagement trends.
- **Responsiveness:** Fully responsive dashboard using Tailwind CSS.

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- MySQL Server
- AWS Account (S3 Bucket)

### Backend Setup

1.  Navigate to `backend`:
    ```bash
    cd backend
    ```
2.  Create virtual environment and install dependencies:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    pip install -r requirements.txt
    ```
3.  Create a `.env` file in `backend/` with the following variables:
    ```env
    DATABASE_URL=mysql+pymysql://user:password@localhost/creator_dashboard
    SECRET_KEY=your_secret_key
    AWS_ACCESS_KEY_ID=your_aws_key
    AWS_SECRET_ACCESS_KEY=your_aws_secret
    AWS_REGION=us-east-1
    AWS_S3_BUCKET=your_bucket_name
    ```
4.  Run the application:
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://localhost:8000`.

### Frontend Setup

1.  Navigate to `frontend`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## API Documentation

Once the backend is running, visit `http://localhost:8000/docs` for the interactive Swagger UI.

## Analytics Generation

Analytics are generated using a mock engine on the backend.
- **Followers:** Random integer between 5k - 500k.
- **Engagement Rate:** Random float between 1% - 10%.
- **Historical Data:** Generated for the last 30 days with realistic fluctuations.
