import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';
import { ClockIcon, CheckIcon, PlusIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks, loading } = useTasks();
  const [greeting, setGreeting] = useState('');
  const [animate, setAnimate] = useState(false);

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
    
    // Trigger animations after component mounts
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className={`transition-all duration-700 ease-out transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg rounded-lg p-6 mb-8 text-white">
          <h2 className="text-2xl font-bold mb-2">{greeting}, {currentUser.name || currentUser.email.split('@')[0]}!</h2>
          <p className="opacity-90">
            Here's an overview of your tasks and progress.
          </p>
          <div className="mt-4 h-2 bg-white bg-opacity-20 rounded-full">
            <div 
              className="h-2 bg-white rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm">
            <span className="font-medium">{completionRate}% complete</span> - {completedTasks} of {totalTasks} tasks completed
          </div>
        </div>
      </div>
      
      <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 transition-all duration-700 delay-100 ease-out transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <p className="text-2xl font-bold">{totalTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <CheckIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-2xl font-bold">{completedTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <ClockIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Pending</p>
              <p className="text-2xl font-bold">{pendingTasks}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md hover:shadow-lg rounded-lg p-6 transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <ChartBarIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`grid gap-6 md:grid-cols-2 transition-all duration-700 delay-200 ease-out transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-blue-500" />
            Recent Tasks
          </h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Create your first task!</p>
          ) : (
            <ul className="divide-y">
              {tasks.slice(0, 5).map(task => (
                <li key={task._id} className="py-3 hover:bg-gray-50 rounded-md px-2 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`mr-2 ${
                        task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                      }`}>
                        {task.status === 'completed' ? <CheckIcon className="h-5 w-5" /> : <ClockIcon className="h-5 w-5" />}
                      </span>
                      <span className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(task.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {task.description && (
                    <p className="ml-7 text-sm text-gray-500 mt-1 truncate">
                      {task.description}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <Link to="/tasks" className="text-blue-600 hover:text-blue-800 font-medium flex items-center">
              View all tasks 
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/tasks" 
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center transition-colors duration-200 flex items-center justify-center"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Manage Tasks
            </Link>
            <button 
              className="block w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md text-center transition-colors duration-200 flex items-center justify-center"
              onClick={() => window.location.href = '/tasks?new=true'}
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Task
            </button>
          </div>
        </div>
      </div>

      {/* Progress Over Time */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-1000 ease-out"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <div className="mt-2 flex justify-between text-sm text-gray-600">
          <span>0%</span>
          <span>Progress: {completionRate}%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2 text-indigo-800">Productivity Tips</h3>
        <p className="text-indigo-700 mb-4">Here are some tips to boost your productivity:</p>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Break large tasks into smaller, manageable chunks
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Use the Pomodoro technique: 25 minutes of focus followed by a 5-minute break
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Prioritize tasks using the Eisenhower Matrix (Urgent vs. Important)
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;