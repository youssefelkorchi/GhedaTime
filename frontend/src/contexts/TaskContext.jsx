import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import excusesData from '../data/excuses.json';

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [procrastinationScore, setProcrastinationScore] = useState(0);
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [showExcuse, setShowExcuse] = useState(false);
  const { currentUser } = useAuth();

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [currentUser]);

  // Calculate procrastination score whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      const totalPostpones = tasks.reduce((total, task) => total + (task.postponeCount || 0), 0);
      setProcrastinationScore(totalPostpones);
    }
  }, [tasks]);

  // Fetch all tasks for the current user
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Generate a random excuse
  const generateExcuse = () => {
    const allExcuses = [
      ...excusesData.general,
      ...excusesData.work,
      ...excusesData.personal
    ];
    const randomIndex = Math.floor(Math.random() * allExcuses.length);
    return allExcuses[randomIndex];
  };

  // Postpone a task to tomorrow
  const postponeTask = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Find the task to get its current data
      const task = tasks.find(t => t._id === id);
      if (!task) throw new Error('Task not found');
      
      // Calculate tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      // Generate a random excuse
      const excuse = generateExcuse();
      setCurrentExcuse(excuse);
      
      // Update the task with new due date and increment postpone count
      const updatedTask = {
        ...task,
        dueDate: tomorrow.toISOString(),
        postponeCount: (task.postponeCount || 0) + 1,
        lastExcuse: excuse
      };
      
      const response = await axios.put(`/api/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update tasks in state
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      
      // Show the excuse popup
      setShowExcuse(true);
      
      return response.data;
    } catch (err) {
      setError('Failed to postpone task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add a new task
  const addTask = async (taskData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      console.log('Sending task data to server:', taskData);
      
      const response = await axios.post('/api/tasks', taskData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Server response:', response.data);
      
      setTasks(prevTasks => [...prevTasks, response.data]);
      return response.data;
    } catch (err) {
      console.error('Detailed add task error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing task
  const updateTask = async (id, taskData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.put(`/api/tasks/${id}`, taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map(task => task._id === id ? response.data : task));
      return response.data;
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a task
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await axios.delete(`/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    tasks,
    loading,
    error,
    procrastinationScore,
    currentExcuse,
    showExcuse,
    setShowExcuse,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    postponeTask
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}