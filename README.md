# 🎓 Course Management Platform – Backend Service

📽️ **Demo Video:** [Watch on YouTube](https://www.youtube.com/watch?v=mbaf7LqdQAw&ab_channel=Khaalidawyuusuf)  
 i18n-ready Student Reflection UI [Deployed](https://studentreflect.netlify.app/)
🧾 **Project Type:** ALU Summative Project – Node.js Backend (July 2025)  
🔒 **Authentication:** JWT with Role-Based Access Control (Manager, Facilitator, Student)  

---

## 📌 Overview

The **Course Management Platform** backend supports academic operations including course allocation, facilitator activity tracking, and student reflection logging.

This system is organized into **three main modules**:

### 1️⃣ Course Allocation System
- Managers assign courses (modules) to facilitators per trimester, mode, class, and intake period.

### 2️⃣ Facilitator Activity Tracker
- Facilitators report attendance, grading, and moderation weekly.
- Redis queues + email notify managers on missed reports.

### 3️⃣ Student Reflection Module *(i18n-ready)*
- [Frontend Phase] Students will submit reflections in multiple languages.

---

## 🧰 Tech Stack

| Tech         | Usage                          |
|--------------|--------------------------------|
| Node.js      | Backend Runtime                |
| Express.js   | API Server                     |
| Sequelize    | ORM for MySQL                  |
| MySQL        | Database                       |
| Redis        | Real-Time Queue & Notifications|
| JWT          | Authentication                 |
| Nodemailer   | CLI Notifications            |
| Swagger      | API Documentation              |
| Mocha / Jest | Unit Testing                   |
| i18n         | Internationalization (frontend) |

---

## 📂 Folder Structure

```
course-management-backend/
├── app.js
├── .env
├── config/
│   ├── db.js
│   ├── redis.js
│   ├── notificationPublisher.js
├── controllers/
│   ├── allocation.controller.js
│   ├── activityTracker.controller.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── index.js
│   ├── user.js
│   ├── course.js
│   ├── class.model.js
│   ├── cohort.model.js
│   ├── facilitator.model.js
│   ├── allocation.model.js
│   ├── activityTracker.model.js
├── routes/
│   ├── auth.routes.js
│   ├── allocation.routes.js
│   ├── activityTracker.routes.js
├── jobs/
│   └── queueReminders.js
├── swagger/
│   └── swagger.js
├── test/
│   └── course.test.js
└── README.md
```

---

## 🔐 Authentication & Authorization

- **Login Endpoint:** `POST /auth/login`
- Middleware: `authenticate`, `authorizeRoles('manager')`, etc.
- Use JWT Token in Header:
  ```http
  Authorization: Bearer <your_token>
  ```

---

## 🧾 API Endpoints

### 📘 Course Allocation System

| Method | Endpoint             | Role    | Description               |
|--------|----------------------|---------|---------------------------|
| POST   | api/allocation          | Manager | Create a course allocation |
| GET    | api/allocation          | Manager | View all allocations       |
| PUT    | api/allocation/:id      | Manager | Update allocation          |
| DELETE | api/allocation/:id      | Manager | Delete allocation          |

### 📗 Facilitator Activity Tracker

| Method | Endpoint                   | Role        | Description                |
|--------|----------------------------|-------------|----------------------------|
| POST   | api/activity-tracker          | Facilitator | Submit weekly activity     |
| PUT    | api/activity-tracker/:id      | Facilitator | Update tracker             |
| GET    | api/activity-tracker          | Manager     | View all activity logs     |
| DELETE | api/activity-tracker/:id      | Manager     | Delete activity log        |

### 📙 Authentication Routes

| Method | Endpoint        | Description           |
|--------|------------------|-----------------------|
| POST   | /auth/register   | Register a new user   |
| POST   | /auth/login      | Login and get token   |

---

## 📡 Notifications System

✅ **Redis + Cli Alerts** for managers/facilitators:
- Reminders sent via Redis queue if reports are missed.
- cli notifications triggered automatically.

---

## 📑 Swagger API Docs

Interactive docs:  
[http://localhost:5000/api-docs](http://localhost:5000/api-docs)  
- Integrated with all endpoints
- Paste JWT with "Authorize" button to test

---

## 🧪 Unit Testing

Includes unit tests for:
- activityTracker.model.test.js
- User.model.test.js
- course.model.test.js


```bash
npm test
```

---

## ⚙️ Environment Configuration

`.env` file structure:

```ini
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=course_db
JWT_SECRET=myjwtsecret
REDIS_PORT=6379
EMAIL_USER=megakhalid32@gmail.com
EMAIL_PASS=password
```

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/course-management-backend.git

# 2. Install dependencies
cd course-management-backend
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in the details

# 4. Start the server
npm run dev
```

---

## ✅ Project Status

- ✅ Course Allocation complete  
- ✅ Activity Tracker with Redis + Email notifications  
- ✅ Swagger documentation integrated  
- ✅ Unit testing for core logic  
- ✅ i18n-ready (Frontend Phase 2)



## 📌 Next Steps

- 📥 Commit and push this README.md to GitHub  
- 🎬 Include in your demo video  
- ✅ Submit via LMS