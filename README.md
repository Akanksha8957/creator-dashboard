# Creator Dashboard Frontend

This is the frontend for the Creator Dashboard, a comprehensive analytics platform for content creators. It is built with Next.js, Tailwind CSS, and Framer Motion.

## Features

-   **Dashboard Overview**: Aggregated stats for followers and engagement across multiple platforms.
-   **Creator Profiles**: Detailed analytics for individual creators with historical data visualization.
-   **Authentication**: Secure login and registration flows.
-   **Interactive Charts**: Beautiful data visualization using Recharts.
-   **Responsive Design**: Optimized for both desktop and mobile devices.

## Tech Stack

-   **Next.js 14**: React framework for building fast web applications.
-   **React**: JavaScript library for building user interfaces.
-   **Tailwind CSS**: Utility-first CSS framework for styling.
-   **Framer Motion**: Library for production-ready animations.
-   **Recharts**: Composable charting library built on React components.
-   **Lucide React**: Beautiful & consistent icon toolkit.

## Prerequisites

-   Node.js 18+
-   npm or yarn or pnpm

## Setup & Installation

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Next.js App Router directory containing pages and layouts.
-   `components/`: Reusable UI components (Charts, Cards, Stats).
-   `context/`: React Context providers (e.g., `AuthContext`).
-   `lib/`: Utility functions and API clients.
-   `public/`: Static assets like images and icons.

## Environment Variables

Create a `.env.local` file in the root of the frontend directory if you need to override default API endpoints:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
