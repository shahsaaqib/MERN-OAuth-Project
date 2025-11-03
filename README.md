# 🌐 Image Search OAuth Project

**Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js) + OAuth (Google, GitHub, Facebook) + Unsplash API

## 🚀 Overview

This full-stack web application allows users to **search images using the Unsplash API** — but only after logging in via **OAuth authentication**. It includes personalized search history, global top search tracking, and a sleek, responsive UI with a multi-select image grid.

✅ **Key Features:**

* OAuth login via **Google, GitHub, Facebook**
* Protected image search using **Unsplash API**
* Real-time **Top 5 Searches** banner (global aggregation)
* Per-user **Search History**
* **Multi-select grid** with live counter
* Built using **Vite + React (frontend)** and **Express + MongoDB (backend)**

---

## 📁 Project Structure

```
image-search-oauth/
│
├── client/         # React + Vite frontend
│   ├── src/
│   │   ├── pages/  # Home page and UI components
│   │   ├── styles.css
│   │   └── main.jsx
│   └── .env.example
│
├── server/         # Express backend with OAuth + Unsplash API
│   ├── src/
│   │   ├── models/     # MongoDB models (User, Search)
│   │   ├── routes/     # Auth & API routes
│   │   ├── passport/   # OAuth strategies setup
│   │   └── middleware/ # Authentication middleware
│   └── .env.example
│
├── docker-compose.yml  # MongoDB setup
└── README.md           # Documentation
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone & Install

```bash
git clone [https://github.com/yourusername/image-search-oauth.git](https://github.com/shahsaaqib/MERN-OAuth-Project.git)
cd image-search-oauth
```

### 2️⃣ Setup Environment

Copy `.env.example` files and update credentials:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Update the following in **server/.env**:

```
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
```

### 3️⃣ Start Services

```bash
docker-compose up -d        # Start MongoDB
cd server && npm run dev    # Run backend
cd ../client && npm run dev # Run frontend
```

**Frontend:** [http://localhost:5173](http://localhost:5173)
**Backend:** [http://localhost:4000](http://localhost:4000)

---

## 🔑 OAuth Redirect URLs

Add these callback URLs in your provider dashboards:

* **Google:** [http://localhost:4000/auth/google/callback](http://localhost:4000/auth/google/callback)
* **GitHub:** [http://localhost:4000/auth/github/callback](http://localhost:4000/auth/github/callback)
* **Facebook:** [http://localhost:4000/auth/facebook/callback](http://localhost:4000/auth/facebook/callback)

---

## 📡 API Endpoints

| Method | Endpoint            | Description                 |
| ------ | ------------------- | --------------------------- |
| GET    | `/auth/google`      | Start Google OAuth login    |
| GET    | `/auth/github`      | Start GitHub OAuth login    |
| GET    | `/auth/facebook`    | Start Facebook OAuth login  |
| GET    | `/auth/me`          | Get logged-in user info     |
| POST   | `/auth/logout`      | Logout user                 |
| POST   | `/api/search`       | Search Unsplash (protected) |
| GET    | `/api/top-searches` | Get top 5 global searches   |
| GET    | `/api/history`      | Get user search history     |

---

## 🧠 Features Demonstration

📸 **Visual Proof (Suggested for Submission):**

* OAuth Login Screens (Google / GitHub / Facebook)
* Top 5 Searches Banner
* Search Results Grid + Multi-Select Counter
* User Search History Panel

---

## 💬 Summary

This project demonstrates:

* Secure **OAuth Authentication**
* **API Integration** with external services (Unsplash)
* **Full-stack development** using the MERN stack
* Clean UI/UX with **React + Vite**
* Data persistence and aggregation with **MongoDB**

A perfect representation of your ability to handle **authentication, API integration, and full-stack workflow** in a professional environment.
