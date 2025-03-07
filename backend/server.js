const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for tasks (replace with a database later)
let tasks = [];

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to GhedaTime API!');
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { title, description, dueDate } = req.body;
  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'Title, description, and dueDate are required' });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    dueDate,
    status: 'pending',
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Update a task
app.put('/tasks/:id', (req, res) => {
  const taskId = Number.parseInt(req.params.id);
  const { title, description, dueDate, status } = req.body;
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = Number.parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
