# Leave Management System (LMS)

A full-stack web application designed to streamline employee leave requests and approvals. Built with the MERN stack, this system provides separate, secure portals for Employees to submit requests and for Administrators to review and manage them.

## Tech Stack

* **Frontend:** React.js (Vite), Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas & Mongoose
* **Authentication:** bcrypt
* **Deployment:** Vercel (Frontend) & Render (Backend)

## Project Structure

This repository is a monorepo containing both the frontend and backend of the application:

* `/frontend` - The React user interface.
* `/backend` - The Node.js REST API.

## Local Setup Instructions

To run this full-stack application on your local machine, you will need to open **two separate terminal windows**.

### 1. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install

Create a .env file in the /backend folder with your database credentials:

Code snippet
PORT=8080
MONGO_URI=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/lms
NODE_ENV=development
Start the backend server:

Bash
npm run dev
2. Frontend Setup
In a new terminal window, navigate to the frontend directory:

Bash
cd frontend
npm install
Create a .env file in the /frontend folder:

Code snippet
VITE_API_URL=http://localhost:8080
Start the React development server:

Bash
npm run dev
Core Features

Employee Portal: View leave balance, apply for new leaves, and track the status (Pending, Approved, Rejected) of historical requests.

Admin Dashboard: Company-wide view of all pending requests with one-click approve/reject functionality.

Dynamic Routing: Frontend seamlessly switches between local development APIs and live production servers.


---

