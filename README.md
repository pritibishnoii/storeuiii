# 🛍️ StoreUI – Full Stack E-Commerce App -QuickKart

**Live Demo**:(https://storeuiii.vercel.app)

This is a **full-stack E-Commerce web application** built using **React + Vite** on the frontend and **Node.js + Express.js** on the backend, with **Redux Toolkit (RTK)** for state management. It features modern UI design, responsive layout, product listing, cart management, user authentication, and more.

---

## 🔧 Tech Stack

### 🚀 Frontend
- React (with Vite for blazing-fast builds)
- Redux Toolkit (RTK)
- React Router
- Tailwind CSS / Custom CSS Modules
- RTK Query
- React Toastify
- ESLint + Prettier
- motion

### 🛠️ Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens)
- Bcrypt (Password Hashing)
- CORS, dotenv
- Cloudinary

---

## 📁 Folder Structure
storeui/
├── server/ # Backend code (Express API)
│ ├── controllers/ # Route logic
│ ├── models/ # Mongoose models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware (auth, error handlers)
│ ├── config/ # MongoDB connection
│ └── server.js # Entry point
│
└── client/ # Frontend code (React + Vite)
├── public/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page-level components
│ ├── redux/ # Redux slices and store
│ ├── hooks/ # Custom React hooks
│ ├── App.jsx
│ └── main.jsx
└── vite.config.js


## ⚙️ Features

- ✅ User Authentication (Login / Signup)
- ✅ Product List & Details Page
- ✅ Add to Cart, Remove, and Update Quantity
- ✅ JWT-secured APIs
- ✅ Responsive & Mobile Friendly UI
- ✅ Global state with Redux Toolkit
- ✅ Toast Notification System
- ✅ ESLint & Prettier Configured
- ✅ Hot Module Replacement (HMR) with Vite

- ✅ Payment Gateway Integration (Stripe/Razorpay)
- ✅ Admin Dashboard
- ✅ Product Review
- ✅ Order Management System

