# Candidate MRF Project

This is the backend server for the **Project MRF** application. It is built using [Express.js](https://expressjs.com/) and runs using Node.js with support for both development and production environments.

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/dem-n-mux/project-mrf-backend.git
cd project-mrf-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create the `.env` File

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
NODE_SECRET=your-secret-key
MONGODB_URI=your-mongodb-uri

AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET_NAME=dev-mrf-user-bucket

NODEMAILER_EMAIL=your-gmail-app-email
NODEMAILER_PASSWORD=your-gmail-app-password
SMTP_SECURE=true
```

> ⚠️ Make sure this file exists and contains all required values before running the server.

## 🚀 Running the Server

### For Development
```bash
npm run dev
```

This will start the server with hot reload (typically using nodemon).

### For Production
```bash
npm run start
```

This will start the server normally. For deployment with [PM2](https://pm2.keymetrics.io/), you can use:

```bash
pm2 start npm --name mrf-backend -- run start
```

## 📂 API Base URL

The backend base URL (used by frontend or clients) will look like:

```
http://<your-server-domain>:<PORT>/api
```

Ensure this matches the frontend configuration (`VITE_BASE_URL` in its `.env` file).

---

Feel free to open issues, request features, or contribute!
