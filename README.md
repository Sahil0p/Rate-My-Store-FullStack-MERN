# ⭐ RateMyStore — Full Stack Rating Platform

A **full-stack role-based rating platform** where users can rate stores, owners can analyze ratings, and admins manage the system — built with **modern UI, secure APIs, analytics, and file uploads**.

---

## 🚀 Live Overview

**RateMyStore** is designed to simulate a real-world SaaS product with:

- 🔐 Secure authentication & authorization
- 👥 Role-based dashboards (Admin / Owner / User)
- ⭐ Store rating system
- 📊 Analytics & charts
- 🖼 Image upload (local storage)
- 📱 Fully responsive UI (desktop + mobile)

---

## 🏗 Architecture

```
Frontend (React + Vite + Tailwind)
│
├── AuthContext (JWT + Role handling)
├── Pages
│ ├── Login / Signup
│ ├── User Stores
│ ├── Owner Dashboard
│ ├── Admin Dashboard
│ └── Admin Management
│
└── Axios Service
↓
Backend (Node.js + Express + MongoDb)
│
├── Routes
│ ├── /auth
│ ├── /admin
│ ├── /user
│ └── /owner
│
├── Controllers
├── Middleware (Auth, Role, Multer)
├── MongoDB (Mongoose)
└── Local File Storage (/uploads)
```


---

## ✨ Features

### 👤 User
- View all stores
- See average ratings
- Submit/update ratings
- View own ratings

### 🏪 Store Owner
- View assigned stores
- View uploaded store image
- View all user ratings
- Ratings analytics (charts over time)

### 👨‍💼 Admin
- Dashboard statistics
- Manage users
- Create / edit / delete stores
- Assign store owners
- Upload store images
- System-wide analytics

---

## 🧠 Tech Stack

### Frontend
- ⚛️ React (Vite)
- 🎨 Tailwind CSS
- 🔄 React Hook Form
- 📊 Charts (Recharts)
- 🌙 Dark / Light Theme

### Backend
- 🟢 Node.js
- 🚀 Express.js
- 🍃 MongoDB + Mongoose
- 🔐 JWT Authentication
- 📦 Multer (file uploads)

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd rate-my-store
```
### 2️⃣ Backend Setup
```
cd backend
npm install
```

- 🔐 Create Backend .env File

> Create a file named `.env` inside the backend folder and add the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```


- Run the backend server:
```
npm run dev
```

- Backend runs at: `http://localhost:5000`

### 3️⃣ Frontend Setup

```
cd frontend
npm install
```
- 🔐 Create Frontend .env File

> Create a file named `.env` inside the frontend folder and add:
```
VITE_API_BASE_URL=http://localhost:5000
```

- Run the frontend server:
```
npm run dev
```

- Frontend runs at: `http://localhost:5173`


### ✅ Notes
- Ensure `MongoDB` is running locally or use `MongoDB Atlas`
- Restart servers after updating `.env` files

---

## 🔐 Authentication Flow

- Signup with role:
  - USER
  - OWNER
  - ADMIN
- Login returns JWT token
- Token is auto-attached to API requests
- Role-based route protection

---


## 📬 API Testing (Postman)

### 🔗 Postman Collection Link

👉 **Click here to open**  🔗 [**RateMyStore - Postman Collection**](https://sahilahmed0029-3594081.postman.co/workspace/Sahil-Ahmed's-Workspace~507292b8-beec-4de7-81da-d9594af9042c/collection/47691689-06f3f8cf-6947-4b14-a061-a45fed7a5784?action=share&source=copy-link&creator=47691689)

> This link will redirect you directly to Postman where you can fork or import the collection.


### ✅ Postman Collection Included

A complete end-to-end Postman collection is provided to test:

- Auth (Signup / Login)
- Admin APIs
- User APIs
- Owner APIs
- Ratings
- Image Uploads

### 🔗 Base URL
```
http://localhost:5000
```

### 🔧 How to Use

- Import Postman collection (Raw JSON)
- Login first (token auto-saved)
- Test role-based APIs
- Use multipart/form-data for image upload

- 📌 Note:
> Images are stored locally and served from:
  > /uploads/stores

### 📊 API Modules Overview
| Module  | Description                |
| ------- | -------------------------- |
| Auth    | Signup, Login              |
| Admin   | Dashboard, Users, Stores   |
| User    | View stores, Rate store    |
| Owner   | Store dashboard, Analytics |
| Ratings | User ratings, Avg rating   |

---


## 📡 API Endpoints Reference
### 🔐 Authentication APIs
| Method | Endpoint             | Description                         | Access        |
| ------ | -------------------- | ----------------------------------- | ------------- |
| POST   | `/api/auth/signup`   | Register a new user / owner / admin | Public        |
| POST   | `/api/auth/login`    | Login and receive JWT token         | Public        |
| PUT    | `/api/auth/password` | Update logged-in user password      | Authenticated |

### 👨‍💼 Admin APIs
| Method | Endpoint                | Description                                    | Access |
| ------ | ----------------------- | ---------------------------------------------- | ------ |
| GET    | `/api/admin/dashboard`  | Get system statistics (users, stores, ratings) | Admin  |
| GET    | `/api/admin/users`      | Get all users                                  | Admin  |
| GET    | `/api/admin/stores`     | Get all stores with owners                     | Admin  |
| POST   | `/api/admin/stores`     | Create store (with image upload)               | Admin  |
| PUT    | `/api/admin/stores/:id` | Update store details / image                   | Admin  |
| DELETE | `/api/admin/stores/:id` | Delete store                                   | Admin  |

### 👤 User APIs
| Method | Endpoint                    | Description                   | Access |
| ------ | --------------------------- | ----------------------------- | ------ |
| GET    | `/api/user/stores`          | View all available stores     | User   |
| POST   | `/api/user/rating/:storeId` | Submit or update rating (1–5) | User   |
| GET    | `/api/user/rating/:storeId` | Get user’s rating for a store | User   |

### 🏪 Owner APIs
| Method | Endpoint                      | Description                                | Access |
| ------ | ----------------------------- | ------------------------------------------ | ------ |
| GET    | `/api/owner/dashboard`        | View owner stores with ratings & analytics | Owner  |
| GET    | `/api/owner/ratings/:storeId` | View ratings for a specific store          | Owner  |

### 🖼 Static File Access
| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | `/uploads/stores/:filename` | Access uploaded store images |

### 🔐 Authorization Header (Required)

- All protected APIs require the following header:
```
Authorization: Bearer <JWT_TOKEN>
```

> JWT token is generated during login and stored automatically in Postman.


## 🔒 Security Highlights

- JWT-based authentication
- Role-based authorization
- Protected routes
- Server-side validation
- Secure file upload handling

---

## 🧪 Edge Cases Handled

- No stores assigned
- No ratings available
- Duplicate ratings
- Invalid roles
- Missing permissions
- Empty dashboards

---

### 🎯 Submission Notes

This project demonstrates:

- Real-world architecture
- Clean code structure
- Scalable role handling
- Modern UI/UX patterns
- Production-style API design
