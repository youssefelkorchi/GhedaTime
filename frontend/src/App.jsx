import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { ToastProvider } from './contexts/ToastContext';
import ProtectedRoute from './components/ProtectedRoute';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Signup from './components/Signup';
import ExcusePopup from './components/ExcusePopup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <ToastProvider>
            <div className="min-h-screen bg-gray-100">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Signup />} />
                <Route 
                  path="/tasks" 
                  element={
                    <ProtectedRoute>
                      <TaskList />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/" element={<Navigate to="/tasks" />} />
              </Routes>
            </div>
          </ToastProvider>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;