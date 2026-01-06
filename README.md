# 🌿 Rainforest Royal Heritage Cabin  
**Full Stack Web Application (MERN + TypeScript)**

---

## 📌 Project Overview
Rainforest Royal Heritage Cabin is a full-stack web application developed using the **MERN stack with TypeScript**, following **Rapid Application Development (RAD)** principles.  
The system provides a secure, scalable, and responsive platform for managing users, bookings, and content with modern UI/UX and cloud-based deployment.

---

## 🎯 Learning Outcomes Achieved
- Design and development of a full-stack MERN + TypeScript application
- Application of RAD & Agile methodologies
- Secure authentication using JWT & bcryptjs
- State management using Redux Toolkit
- Cloud deployment with professional DevOps practices
- Version control using Git & GitHub

---

## 🧩 System Architecture
- Frontend (React + TypeScript + Tailwind + Redux)
- ↓ REST API
- Backend (Node.js + Express + TypeScript)
- ↓
- MongoDB Atlas (Cloud Database)



---

## 🛠️ Technologies Used

### Frontend
- React (TypeScript)
- Redux Toolkit
- TailwindCSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB & Mongoose
- JWT Authentication
- bcryptjs (Password Encryption)

### Deployment & Tools
- Git & GitHub
- MongoDB Atlas
- Render (Backend)
- Vercel / Netlify (Frontend)

---

## 🔐 Security Features
- JWT-based authentication & authorization
- Password hashing using bcryptjs
- Protected API routes
- Environment variable management with `.env`
- Token expiry handling

---

## 🚀 Core Features
- User registration and login
- Role-based authorization
- Secure CRUD operations
- Responsive UI (mobile & desktop)
- Redux-based global state management
- RESTful API with proper HTTP status codes
- Centralized error handling

---

## 🌟 Advanced Feature
One advanced feature is implemented as per coursework requirements:
- AI-powered functionality **OR**
- PDF report generation **OR**
- Analytics dashboard / automation feature

---

## 🗂️ Backend Folder Structure
```
  backend/
  │── src/
  │ ├── controllers/
  │ ├── models/
  │ ├── routes/
  │ ├── middleware/
  │ ├── config/
  │ └── server.ts
  │── .env
  │── package.json
```

---

## 🎨 Frontend Folder Structure
```
  frontend/
  │── src/
  │ ├── components/
  │ ├── pages/
  │ ├── redux/
  │ ├── services/
  │ └── App.tsx
  │── package.json
```

---

## ⚙️ Setup & Run Instructions

### 1️⃣ Clone the Repository
```
  git clone https://github.com/ThamiduChamod/rainforest_royal_heritage_cabin_back_end.git
```
### 2️⃣ Backend Setup

```
  cd backend
  npm install
  npm run dev
``` 

**Create a .env file inside the backend folder:**
  ```
    PORT=5000
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_secret_key
  ```
### 3️⃣ Frontend Setup
  ``` 
    cd frontend
    npm install
    npm run dev  
  ```

## 🌐 Deployed URLs
```
  Frontend:
    https://your-frontend.vercel.app

  Backend API:
    https://your-backend.onrender.com
```

## 📸 Screenshots
**Include screenshots of:**

  Login / Register page

  Dashboard

  CRUD operations

  Responsive mobile view



## 🧪 Sample API Endpoints

```  
  POST   /api/auth/login
  POST   /api/auth/register
  GET    /api/users
  POST   /api/bookings
  PUT    /api/bookings/:id
  DELETE /api/bookings/:id
```

## 📊 Evaluation Criteria Alignment
- ✅ MERN + TypeScript
- ✅ JWT Authentication & Security
- ✅ Redux State Management
- ✅ Cloud Deployment
- ✅ Advanced Feature
- ✅ Proper Documentation
- ✅ GitHub Version Control 

---
## 👨‍🎓 Author
 **Thamidu Chamod**