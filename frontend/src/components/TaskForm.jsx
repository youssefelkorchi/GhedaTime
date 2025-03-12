import React, { useState, useEffect } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { useToast } from '../contexts/ToastContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

function TaskForm({ task, onClose }) {
  const { addTask, updateTask } = useTasks();
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',
    category: 'default'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isEditing = task && task._id;

  useEffect(() => {
    // Initialize form data even if task is an empty object
    const formattedDate = task?.dueDate 
      ? new Date(task.dueDate).toISOString().split('T')[0] 
      : '';
    
    setFormData({
      title: task?.title || '',
      description: task?.description || '',
      dueDate: formattedDate,
      status: task?.status || 'pending',
      category: task?.category || 'default'
    });
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Log the task data being sent
      console.log('Submitting task data:', formData);
      
      const taskData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
        status: formData.status || 'pending',
        category: formData.category || 'default'
      };
      
      if (isEditing) {
        await updateTask(task._id, taskData);
        addToast('Task updated successfully!', 'success');
      } else {
        await addTask(taskData);
        addToast('Task added successfully!', 'success');
      }
      
      onClose();
    } catch (err) {
      console.error('Error submitting task:', err);
      setError(err.response?.data?.message || 'Failed to save task');
      addToast('Failed to save task', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter task description"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Regular Task</option>
            <option value="urgent">🔥 3endek Gheda Wla Ma3endekch (Super Urgent)</option>
            <option value="night">🌙 Gheda F Lil (Night Tasks)</option>
            <option value="someday">🌈 Chi Nhar Men Layam (Someday)</option>
            <option value="yesterday">⏰ Kan Khesso Ytdar Lbareh (Yesterday's Tasks)</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;