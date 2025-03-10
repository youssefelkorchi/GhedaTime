import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import NewTaskModal from './NewTaskModal';
import { ClockIcon, CheckIcon, PlusIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks, loading, updateTask } = useTasks();
  const [greeting, setGreeting] = useState('');
  const [animate, setAnimate] = useState(false);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Function to toggle task completion status


  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Get tasks due today
  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate.split('T')[0] === today;
  });

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    switch (selectedFilter) {
      case 'today':
        return todayTasks.includes(task);
      case 'pending':
        return task.status === 'pending';
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  // Sort tasks by priority and due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    // Sort by priority first
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    
    // Handle tasks without due dates
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    
    // Then sort by due date
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className={`transition-all duration-700 ease-out transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg p-6 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {greeting}, {currentUser.name || currentUser.email.split('@')[0]}!
              </h2>
              <p className="opacity-90">Here's your task overview for today</p>
            </div>
            <button
              onClick={() => setIsNewTaskModalOpen(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-md flex items-center hover:bg-indigo-50 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              New Task
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <ClockIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Total Tasks</p>
                <p className="text-2xl font-semibold">{totalTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Completed</p>
                <p className="text-2xl font-semibold">{completedTasks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Due Today</p>
                <p className="text-2xl font-semibold">{todayTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ChartBarIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Completion Rate</p>
                <p className="text-2xl font-semibold">{completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Filter */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setSelectedFilter('today')}
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'today'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Due Today
          </button>
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedFilter('completed')}
            className={`px-4 py-2 rounded-md ${
              selectedFilter === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow">
          {sortedTasks.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No tasks found. Click "New Task" to create one.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {sortedTasks.map((task, index) => (
                <li key={`${task._id}-${index}`} className="py-3 hover:bg-gray-50 px-4 transition-colors duration-150">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center flex-1">
                      <button 
                        onClick={() => handleTaskToggle(task._id)}
                        className="mr-2 focus:outline-none"
                      >
                        <span className={`inline-flex items-center justify-center w-5 h-5 border rounded-full
                          ${task.status === 'completed' 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 group-hover:border-green-500'}`}
                        >
                          {task.status === 'completed' && (
                            <CheckIcon className="h-3 w-3 text-white" />
                          )}
                        </span>
                      </button>
                      <div className="flex-1 min-w-0">
                        <span className={`font-medium block truncate ${
                          task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </span>
                        {task.description && (
                          <p className="text-sm text-gray-500 truncate">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center ml-4 space-x-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800'
                            : task.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-gray-500">
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Task Creation Modal */}
      {isNewTaskModalOpen && (
        <NewTaskModal
          isOpen={isNewTaskModalOpen}
          onClose={() => setIsNewTaskModalOpen(false)}
        />
      )}
    </div>
  );
}

export default Dashboard;