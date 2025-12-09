# Zupiq E-commerce

## Proposal

### Project Overview
Zupiq is a premium E-commerce platform for clothing and jewelry, designed with a unique "violetish and blackish" aesthetic using the "Science Gothic" font. The platform aims to provide a seamless shopping experience with features like user authentication, product search/filtering, wishlist management, and a responsive design.

### Tech Stack
- **Frontend**: React, Tailwind CSS (styled manually/inline for specific requirements), Axios, React Router.
- **Backend**: Node.js, Express.js, Prisma ORM.
- **Database**: PostgreSQL (Neon).
- **Authentication**: JWT (JSON Web Tokens).

### Key Features
1.  **Authentication**: Secure Signup and Login using JWT.
2.  **Product Management**: Fetch products from FakeStoreAPI, sync to local DB, and support CRUD operations.
3.  **Search & Filter**: Advanced search by title/description, filter by category, and sort by price/rating.
4.  **User Features**: Wishlist and Favorites management, User Profile view.
5.  **Responsive Design**: Premium dark-themed UI optimized for all devices.

### Database Schema
- **User**: Stores user credentials and profile info.
- **Product**: Stores product details (synced from API).
- **Wishlist/Favorite**: Relational tables linking Users and Products.

### Hosting
- **Frontend**: [Link to Vercel Deployment](https://zupiq-ecommerce.vercel.app)
- **Backend**: [Link to Render Deployment](https://zupiq-backend.onrender.com)
- **Database**: Neon PostgreSQL.

## Setup Instructions

1.  **Clone the repository**.
2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    # Create .env file with DATABASE_URL and JWT_SECRET
    npx prisma migrate dev
    npm run dev
    ```
3.  **Frontend Setup**:
    ```bash
    cd frontend
    npm install
    npm start
    ```
