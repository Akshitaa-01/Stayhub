# 🏡StayHub

A full-stack rental platform for discovering, creating, and managing property listings.

## 📌About the Project

StayHub is a full-stack web application inspired by modern rental platforms. It allows users to browse and search for stays, explore listings by category, view detailed property information, and manage their own listings.

The application also includes user authentication, reviews and ratings, image uploads, and authorization for user-specific actions. StayHub follows an MVC architecture with a Node.js and Express.js backend, MongoDB for data storage, and EJS for server-side rendering.

The application is deployed using Render, with MongoDB Atlas for the production database and Cloudinary for image storage.

## 🔗Live Demo

[StayHub](https://stayhub-wq1q.onrender.com/listings)

## 📸Screenshots

| Home | Category Filtering | Listing Details |
|---|---|---|
| ![Home](assets/home.png) | ![Category Filtering](assets/category-filter.png) | ![Listing Details](assets/show.png) |

| Reviews & Ratings | Create Listing | Authentication |
|---|---|---|
| ![Reviews](assets/review.png) | ![Create Listing](assets/create.png) | ![Login](assets/login.png) |

## ⚙️Features

- Explore and search property listings by destination
- Discover stays through category-based filtering
- View detailed property information, pricing, and reviews
- Create, edit, and delete personal property listings
- Upload and manage property images with Cloudinary
- Secure user authentication with signup, login, and logout
- Session-based authorization for protected actions
- Share experiences through reviews and 1–5 star ratings
- Toggle tax-inclusive pricing when browsing stays
- Form validation, flash messages, and centralized error handling
- Responsive interface built with Bootstrap

## 🛠️Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript, Bootstrap, EJS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose, MongoDB Atlas |
| Authentication | Passport.js |
| Sessions | Express Session, Connect-Mongo |
| Image Storage | Cloudinary |
| Deployment | Render |

## ⚙️Technical Highlights

- Follows an MVC architecture with separate models, controllers, routes, and views
- Implements authentication and authorization using Passport.js and Express Session
- Integrates Cloudinary for property image uploads and MongoDB Atlas for cloud data storage
- Persists user sessions with Connect-Mongo and handles protected user actions

## 📂 Project Structure

```text
StayHub/
│
├── controllers/          # Application logic for listings, reviews, and users
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── init/                 # Database initialization and seed data
│   ├── data.js
│   └── index.js
│
├── models/               # Mongoose schemas and database models
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/               # Routes for listings, reviews, and users
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/                # EJS templates for the application UI
│   ├── includes/         # Reusable EJS components
│   ├── layouts/          # Main page layout
│   ├── listings/         # Listing-related pages
│   ├── users/            # Authentication pages
│   └── error.ejs         # Error page
│
├── public/               # Client-side CSS and JavaScript
│   ├── css/
│   └── js/
│
├── utils/                # Reusable utility functions and configuration
│   ├── categories.js
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── assets/               # README screenshots and project assets
│
├── app.js                # Main application entry point and configuration
├── middleware.js         # Authentication, authorization, and validation middleware
├── schema.js             # Joi validation schemas
├── cloudConfig.js        # Cloudinary configuration
├── package.json          # Project dependencies and scripts
└── package-lock.json     # Locked dependency versions
```

## Getting Started

### Prerequisites

Before running StayHub locally, make sure you have:

- Node.js
- A MongoDB Atlas account
- A Cloudinary account

### Installation

Clone the repository:

```bash
git clone https://github.com/Akshitaa-01/StayHub.git
cd StayHub
```

Install the project dependencies:

```bash
npm install
```

### 🔐Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SESSION_SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

These variables are required for the database connection, session management, and image uploads.

Do not commit your `.env` file or expose your credentials.

### Run Locally

Start the development server:

```bash
nodemon app.js
```

Once the server is running, open:

```text
http://localhost:8080
```

## ☁️Deployment

StayHub is deployed on Render.

- MongoDB Atlas is used as the production database
- Cloudinary is used for property image storage
- Render hosts the web application
- The application can be automatically redeployed when changes are pushed to the GitHub repository

## 📈Future Improvements

- Mapbox integration for interactive maps and listing locations
- Booking and reservation functionality
- Wishlist / favorite listings

## 👩‍💻Author

**Akshita Bhardwaj**

[GitHub](https://github.com/Akshitaa-01)