# ETask - Initiative and Assignment Management System

ETask is a comprehensive full-stack web application designed for workplaces to streamline how teams organize their work, delegate responsibilities, and track the progress of various initiatives from start to finish.

##  Features

- **Role-Based Access Control:** Secure user authentication with distinct access levels (`Standard` and `Manager`).
- **Initiative Management:** Managers can create, view, and manage large-scale initiatives (projects).
- **Assignment Tracking:** Tasks can be created under specific initiatives and assigned to employees.
- **Real-Time Status Updates:** Track assignment progress through various stages (`Not Started`, `In Progress`, `Completed`).
- **Responsive UI:** A modern, fast, and responsive user interface built with React and Tailwind CSS.

##  Tech Stack

### Frontend
- **React.js** (built with Vite for fast performance)
- **Tailwind CSS** (for styling and responsive design)
- **React Router DOM** (for client-side routing)
- **React Hook Form** (for efficient form handling)
- **Axios** (for API requests)
- **React Toastify** (for instant user notifications)

### Backend
- **Node.js & Express.js** (RESTful API architecture)
- **MongoDB & Mongoose** (Database and ODM)
- **JSON Web Tokens (JWT)** (for secure authentication)
- **Bcrypt.js** (for password hashing)

##  Database Models

1. **User (Employee):** Stores employee details, credentials, and access levels (`standard` or `manager`).
2. **Initiative (Project):** Stores details about large-scale projects, including the title, description, and the manager who initiated it.
3. **Task (Assignment):** Stores individual tasks linked to an Initiative, assigned to a specific Employee, and tracks its status.


