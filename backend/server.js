const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ghedatime')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to GhedaTime API!');
});

// Protected routes - require authentication
app.use(auth);

// Add a new task
app.post('/tasks', async (req, res) => {
  try {
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
      userId: req.user._id // Add user reference
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
});

// Get all tasks for authenticated user
app.get('/tasks', async (req, res) => {
  try {
    const userTasks = tasks.filter(task => task.userId.toString() === req.user._id.toString());
    res.json(userTasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
  try {
    const taskId = Number.parseInt(req.params.id);
    const { title, description, dueDate, status } = req.body;
    const task = tasks.find((t) => t.id === taskId && t.userId.toString() === req.user._id.toString());
    
    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.status = status || task.status;
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const taskId = Number.parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId && t.userId.toString() === req.user._id.toString());
    
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Task not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
