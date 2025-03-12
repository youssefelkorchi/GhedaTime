# 🌟 GhedaTime

<div align="center">

![GhedaTime Logo](https://via.placeholder.com/200x200?text=GhedaTime)

**The Ultimate Procrastinator's Paradise**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.14-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.0-38B2AC.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21.2-green.svg)](https://expressjs.com/)

</div>

## 📋 Overview

**GhedaTime** is a humorous task management app that embraces the art of procrastination while helping you manage your tasks. It features playful tools like the **"Wlakin Gheda"** button, an **Excuse Generator**, and a **Procrastination Meter** to make staying organized (or delaying it) a fun experience.

## ✨ Key Features

### 🛠️ "Wlakin Gheda" Button
- 🔄 Instantly reschedule tasks with style
- 😂 Auto-generate top-tier excuses
- 🎨 Playful procrastination animations

### 📊 Procrastination Meter™
- 📈 Real-time procrastination tracking
- 🏆 Unlockable achievements
- 🎮 Compete with other world-class procrastinators

### 🎭 Excuse Generator 3000
- 🎲 Smart, context-aware excuse creation
- 🌍 Customize excuses by region
- 📱 Share excuses directly to social media

### 🎯 Task Categories
- "🔥 3endek Gheda Wla Ma3endekch" – Urgent but... maybe tomorrow
- "🌙 Gheda F Lil" – Night tasks that will never happen
- "🌈 Chi Nhar Men Layam" – The mythical someday
- "⏰ Kan Khesso Ytdar Lbareh" – Yesterday's forgotten to-dos

## 🚀 Tech Stack

### Frontend
- **React 18.3.1** – Modern UI framework
- **Vite 5.4.14** – Lightning-fast build tool
- **Tailwind CSS 3.3.0** – Utility-first styling
- **React Router** – Declarative routing
- **Axios** – API communication

### Backend
- **Express 4.21.2** – Web framework
- **MongoDB** – Database for task and user management
- **JWT** – Secure authentication
- **Bcrypt** – Password hashing

## 🏗️ Project Structure

```bash
GhedaTime/
├── backend/             # Express server
│   ├── middleware/      # Authentication
│   ├── models/          # MongoDB models
│   ├── routes/          # API endpoints
│   └── server.js        # Main backend entry
├── frontend/            # React application
│   └── src/
│       ├── components/  # UI components
│       ├── contexts/    # Global state management
│       └── main.jsx     # Frontend entry
├── docs/                # Documentation
└── assets/              # Static project assets
```

## 🛠️ Installation Guide

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/GhedaTime.git
cd GhedaTime
```

### 2. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

### 3. Environment Setup

Create a `.env` file in the `backend` directory:

```bash
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## 🚀 Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend server:
```bash
cd frontend
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Start the backend server in production:
```bash
cd backend
npm start
```

## 🧪 Features in Development
- 📱 Mobile app support
- 🌐 Social sharing capabilities
- 🎮 Gamification and badges
- 📊 Advanced analytics
- 🔔 Smart reminders

## 🤝 Contributing

We welcome contributions! Follow these steps to get started:

1. Fork the repository
2. Create a new feature branch:
```bash
git checkout -b feature/your-feature-name
```
3. Commit your changes:
```bash
git commit -m "Add: New feature description"
```
4. Push your branch:
```bash
git push origin feature/your-feature-name
```
5. Submit a Pull Request

## 📜 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.

## 🌟 Acknowledgements

Special thanks to:
- Procrastinators worldwide for the inspiration
- The timeless phrase **"ghda inchallah"** for keeping us hopeful

⚠️ This project is under active development – features may change or break. ⚠️

Made with ❤️ and a lot of procrastination!

