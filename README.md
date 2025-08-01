# 🎓 Course Management Platform – Backend Service
# youtube video:  https://www.youtube.com/watch?v=mbaf7LqdQAw&ab_channel=Khaalidawyuusuf
> ✅ **Summative Project - ALU Node.js Cohort (July 2025)**  
> 🔐 Role-based REST API using Node.js, Express, Sequelize (MySQL), Redis, and Swagger for API docs  
> 📚 Designed to support academic coordination, course allocation, activity tracking, and student engagement  

---

## 📦 Project Overview

This backend service powers a **Course Management Platform** used by academic institutions. The system is divided into **three modules**, all supporting role-based access control (Manager, Facilitator, Student):

### ✅ Module 1: Course Allocation System
- Managers assign facilitators to teach specific courses
- Courses are assigned by class, trimester, mode (online/in-person), and intake period

### ✅ Module 2: Facilitator Activity Tracker
- Facilitators log weekly attendance and update grading/moderation statuses
- Redis + email notifications alert managers of pending tasks

### ✅ Module 3: Student Reflection System *(i18n-ready)*
- [Phase 2] Students can submit course reflections in multiple languages
- Multilingual UI ready via internationalization libraries (not in backend)

---

## 🛠 Tech Stack

| Technology      | Purpose                         |
|----------------|----------------------------------|
| **Node.js**     | Backend runtime                 |
| **Express.js**  | API framework                   |
| **MySQL**       | Relational database             |
| **Sequelize**   | ORM for MySQL                   |
| **Redis**       | Real-time notifications         |
| **JWT**         | User authentication             |
| **Nodemailer**  | Email delivery system           |
| **Swagger**     | API documentation               |
| **Mocha/Jest**  | Unit testing                    |
| **i18n**        | Multilingual readiness (frontend) |

---

## 📁 Folder Structure


course-management-backend/
├── app.js
├── .env
├── config/
│ ├── db.js
│ ├── redis.js
│ ├── notificationPublisher.js
├── controllers/
│ ├── allocation.controller.js
│ ├── activityTracker.controller.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── index.js
│ ├── user.js
│ ├── course.js
│ ├── class.model.js
│ ├── cohort.model.js
│ ├── facilitator.model.js
│ ├── allocation.model.js
│ ├── activityTracker.model.js
├── routes/
│ ├── auth.routes.js
│ ├── allocation.routes.js
│ ├── activityTracker.routes.js
├── swagger/
│ └── swagger.js
├── jobs/
│ └── queueReminders.js
├── test/
│ └── course.test.js
└── README.md



---

## 🔐 Authentication

- JWT-based auth with role checks
- Middleware: `authenticate`, `authorizeRoles('manager')`, etc.

```bash
POST /auth/login
{
  "email": "manager@example.com",
  "password": "yourpassword"
}

Use the returned token in Swagger or Postman:

Authorization: Bearer <your_token>
