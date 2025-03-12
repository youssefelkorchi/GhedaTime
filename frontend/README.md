# 🌟 GhedaTime Frontend

Welcome to the **GhedaTime Frontend** the user interface for the ultimate procrastinator's paradise. This application delivers a playful task management experience with a humorous twist.

## 🛠️ Tech Stack

- **React 18.3.1** – UI library for building the interface
- **Vite 5.4.14** – Fast development and build tool
- **Tailwind CSS 3.3.0** – Utility-first CSS framework
- **React Router** – Client-side routing
- **Axios** – API request management

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**

### Installation

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

Access the frontend at: [http://localhost:5173](http://localhost:5173)

### Building for Production

Create a production-ready build:

```bash
npm run build
```

## 🔗 API Connection

The frontend communicates with the backend API using **Axios**. API requests are proxied to the backend server during development through the Vite configuration for seamless integration.

## 📂 Project Structure

```
frontend/
├── public/              # Static files (e.g., icons, assets)
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # Global state (Auth, Task, Toast)
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── package.json         # Project metadata and dependencies
└── vite.config.js       # Vite configuration
```

## ✨ Features

- ✅ **User Authentication**: Login and signup functionality
- 📊 **Task Management Dashboard**: View, create, and manage tasks
- 🔍 **Task Filtering & Sorting**: Organize tasks easily
- 😂 **Procrastination Tools**: "Wlakin Gheda" button for instant task postponement
- 🎭 **Excuse Generator**: Dynamic, humor-driven excuse creation

## 📖 Additional Information

For full documentation, API details, and backend setup, refer to the [main GhedaTime repository](../README.md).

Made with ❤️ and a touch of procrastination!

