# 🌟 GhedaTime Frontend

Welcome to the **frontend** of **GhedaTime**—The Ultimate Procrastinator's Paradise! 🎉  
This React-based web application helps users manage (or delay) their tasks in the most entertaining way possible.

## 🚀 Tech Stack

- ⚛ **React 18.3.1** - UI library  
- ⚡ **Vite 5.4.14** - Fast build tool  
- 🎨 **Tailwind CSS 3.3.0** - Utility-first styling  
- 🌍 **React Router** - Client-side routing  
- 🔗 **Axios** - API requests handling  

---

## 🔧 Getting Started

### Prerequisites  
Ensure you have the following installed:  
- **Node.js** (v14 or higher)  
- **npm** or **yarn**  

### 📥 Installation  
Clone the repository and install dependencies:  
```bash
git clone https://github.com/yourusername/GhedaTime.git
cd GhedaTime/frontend
npm install
```

### 💻 Running in Development Mode  
Start the development server:  
```bash
npm run dev
```
The application will be available at **http://localhost:5173**  

---

## 📦 Building for Production  
To generate an optimized production build, run:  
```bash
npm run build
```

---

## 🔗 API Connection  

The frontend communicates with the backend using **Axios**.  
- API requests are **proxied** in development via **Vite config**, ensuring seamless backend interaction.  

---

## 📁 Project Structure  

```
frontend/
├── public/              # Static assets (icons, logos, etc.)
├── src/
│   ├── components/      # UI components (buttons, forms, etc.)
│   ├── contexts/        # Global state management (Auth, Tasks, Toasts)
│   ├── data/            # Static data files
│   ├── App.jsx          # Main application wrapper
│   └── main.jsx         # Application entry point
├── package.json         # Project dependencies & scripts
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite project configuration
```

---

## ✨ Features  

- 🔑 **User authentication** (Login & Signup)  
- 📋 **Task management dashboard**  
- 🏷 **Task filtering & sorting**  
- 🎭 **Procrastination tools & excuse generator**  
- ⏳ **"Wlakin Gheda" button for ultimate task postponement**  

For detailed documentation, visit the **[main repository](https://github.com/yourusername/GhedaTime)**.  

---

## 📜 License  
This project is licensed under **MIT License**.  

📢 Made with **❤️ and procrastination**  
```