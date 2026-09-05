# HireHub - Job Portal

HireHub is a full-stack job portal web application built using the MERN stack.

It provides separate experiences for Job Seekers and Recruiters, allowing users to search for jobs, apply for jobs, save jobs, post jobs, manage applications, and track hiring activity.

## 🚀 Features

### 👨‍💻 Job Seeker
- User registration and login
- Browse available jobs
- Search jobs by keyword
- Filter jobs by location, job type, and experience
- View detailed job information
- Apply for jobs with a cover letter
- Save and remove saved jobs
- Track submitted applications
- View application status
- Manage user profile

### 🏢 Recruiter
- Recruiter registration and login
- Recruiter dashboard
- Post new jobs
- Edit existing jobs
- Delete jobs
- View applicants
- Search and filter applicants
- Update application status
- Track hiring statistics
- Manage recruiter profile

### 🔐 Authentication & Security
- JWT-based authentication
- Protected routes
- Role-based authorization
- Separate permissions for Job Seekers and Recruiters
- Environment variables for sensitive configuration

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Bootstrap
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- dotenv

## 📁 Project Structure

```text
HireHub
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── backend
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    ├── server.js
    └── package.json