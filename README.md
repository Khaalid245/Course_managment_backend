# 🎓 Course Management Platform – Backend Service

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

