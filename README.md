# COMP3123 Assignment 2 — Employee Management Backend (Node.js + Express + MongoDB)

This is the **backend API** for the Employee Management System built using:

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **JWT Authentication**
- **BCrypt Password Hashing**
- **CORS**
- **Multer (file upload optional)**

The backend exposes secure REST endpoints used by the React frontend.

---

## Features

### Authentication
- User Registration (`/api/auth/signup`)
- User Login (`/api/auth/login`)
- JWT-protected routes
- Middleware-based auth guard

### Employee Management
- Create employee
- List all employees
- View employee details
- Update employee
- Delete employee
- Search employees by **department** and **position**

### Database
- MongoDB (Atlas)
- Employee and User schemas (Mongoose)

---
## Docker Support

Backend has a Dockerfile:
```bash
docker build -t assignment2-backend .
docker run -p 5000:5000 assignment2-backend
```
Used in docker-compose.yml:
```bash
backend:
  build: ./backend
  environment:
    PORT: 5000
    MONGO_URI: mongodb+srv://...
    JWT_SECRET: supersecretkey
  ports:
    - "5000:5000"
```
## Author

Mariia Shmidt
COMP3123 — Full Stack Development
George Brown College
