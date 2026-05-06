# 🏡 StayHub

StayHub is a full-stack web application where users can explore, create, edit, and manage property listings — inspired by modern rental platforms like Airbnb.

---

## 🚀 Features

* 🏠 Browse all listings
* ➕ Create new property listings
* 📝 Edit existing listings
* ❌ Delete listings
* 🖼️ Display images for each property
* 💰 Price formatting in INR
* 📱 Responsive UI using Bootstrap
* ♻️ Reusable components (Navbar & Footer using EJS includes)

---

## 🛠️ Tech Stack

**Frontend**

* HTML
* CSS
* Bootstrap
* EJS

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

---

## 📂 Project Structure

```id="8y3p2k"
StayHub/
│── init/                # Initial data / seed files
│── models/
│   └── listing.js       # Mongoose schema for listings
│── public/
│   └── css/
│       └── style.css    # Custom styles
│── views/
│   ├── includes/
│   │   ├── navbar.ejs   # Navbar component
│   │   └── footer.ejs   # Footer component
│   ├── layouts/
│   │   └── boilerplate.ejs  # Main layout template
│   └── listings/
│       ├── home.ejs     # Show all listings
│       ├── new.ejs      # Create new listing form
│       ├── edit.ejs     # Edit listing form
│       └── show.ejs     # Show single listing
│── app.js               # Main server file
│── package.json
│── package-lock.json
│── .gitignore
```

---

## ⚙️ Installation & Setup

1. Clone the repository:

```bash id="k2a9x1"
git clone https://github.com/your-username/stayhub.git
```

2. Navigate into the project:

```bash id="v3t7s9"
cd stayhub
```

3. Install dependencies:

```bash id="m5n8q2"
npm install
```

4. Start the server:

```bash id="z7l1p4"
nodemon app.js
```

5. Open in browser:

```id="c4x8e6"
http://localhost:8080
```

---


## ✨ Future Improvements

* 🔐 User authentication (Login / Signup)
* ⭐ Reviews & ratings system
* 🗺️ Map integration for locations
* ❤️ Wishlist / favorites feature


