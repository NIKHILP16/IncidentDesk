# 🚀 Incident Management Desk (Full-Stack Setup)

This project consists of a **Python/Django backend** (API) and a **React/TypeScript frontend**. Follow the steps below to set up and run the application locally.

---

## ✅ Prerequisites

Before starting, ensure you have the following installed on your system:

- **Python 3.10+**
- **Node.js 20+** (which includes `npm`)
- **Git** (for cloning the repository)

---

## ⚙️ Backend Setup (Django / Python)

The backend serves the REST API and manages the database.

### 1. Clone the Repository

```bash
# Clone the repository
git clone git@github.com:NIKHILP16/IncidentDesk.git
cd IncidentDesk
```

### 2. Create and Activate Virtual Environment

It's crucial to isolate Python dependencies in a virtual environment (`venv`).

```bash
# Create the virtual environment
python -m venv venv
```

Activate the virtual environment:

```bash
# On macOS/Linux:
source venv/bin/activate

# On Windows (Command Prompt):
venv\Scripts\activate

# On Windows (PowerShell):
.\venv\Scripts\Activate
```

### 3. Install Dependencies

Install the required Python packages using `pip`.

```bash
# Assuming your requirements file is named requirements.txt
pip install -r requirements.txt
```

### 4. Database Setup

Run the initial database migrations to set up the SQLite database and create necessary tables.

```bash
cd backend

# Create migration files (if needed)
python manage.py makemigrations

# Apply migrations to the database
python manage.py migrate
```

### 5. Start the Backend Server

Start the Django development server:

```bash
python manage.py runserver
```

The backend will typically be available at: [http://localhost:8000](http://localhost:8000)

> ✅ Leave this terminal window open to keep the backend running.

---

## 🌐 Frontend Setup (React / TypeScript)

The frontend is the React application that consumes the API.

### 1. Navigate to the Frontend Directory

Open a new terminal window and navigate into the frontend directory ( `frontend`).

```bash

cd frontend
```

### 2. Install Dependencies

Install the Node.js packages (React, MUI, Axios, etc.):

```bash
# Using npm:
npm install

```

### 3. Start the Frontend Application

Start the React development server:

```bash
npm run dev
```

The app will typically run on:

- [http://localhost:3000](http://localhost:3000)
- OR [http://localhost:5173](http://localhost:5173) (if using Vite)

> 🌐 Your browser should automatically open the application. If not, navigate to the local address shown in the terminal.

---

## 🎉 You're Ready!

With both servers running, you can now access the **Incident Management Desk** frontend and interact with the Django backend API.

---

### 🛠 Common Development URLs

- Backend API: [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)
- Frontend App: [http://localhost:5173](http://localhost:5173) 

---

