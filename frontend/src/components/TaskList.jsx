import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import { useToast } from '../contexts/ToastContext';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import TaskForm from './TaskForm';

function TaskList() {
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  const { addToast } = useToast();
  const [editingTask, setEditingTask] = useState(null);

  if (loading) {
    return <div className="flex justify-center p-4">Loading tasks...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  const handleStatusChange = async (task) => {
    const newStatus = task.status === 'completed' ? 'pending' : 'completed';
    try {
      await updateTask(task._id, { ...task, status: newStatus });
      addToast(`Task marked as ${newStatus}`, 'success');
    } catch (err) {
      console.error('Failed to update task status', err);
      addToast('Failed to update task status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        addToast('Task deleted successfully', 'success');
      } catch (err) {
        console.error('Failed to delete task', err);
        addToast('Failed to delete task', 'error');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setEditingTask({ title: '', description: '', dueDate: '', status: 'pending' })}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">You don't have any tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <div 
              key={task._id} 
              className={`border rounded-lg shadow-sm p-4 ${
                task.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-white'
              }`}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStatusChange(task)}
                    className={`p-1 rounded-full ${
                      task.status === 'completed' ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {task.status === 'completed' ? (
                      <CheckIcon className="h-5 w-5" />
                    ) : (
                      <ClockIcon className="h-5 w-5" />
                    )}
                  </button>
                  <button 
                    onClick={() => setEditingTask(task)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{task.description}</p>
              {task.dueDate && (
                <div className="mt-3 text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTask && (
        <TaskForm 
          task={editingTask} 
          onClose={() => setEditingTask(null)} 
        />
      )}
    </div>
  );
}

export default TaskList;