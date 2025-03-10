import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';
import { ClockIcon, CheckIcon } from '@heroicons/react/24/outline';

function Dashboard() {
  const { currentUser } = useAuth();
  const { tasks, loading } = useTasks();

  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (loading) {
    return <div className="flex justify-center p-4">Loading dashboard...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Welcome back, {currentUser.name || currentUser.email}!</h2>
        <p className="text-gray-600">
          Here's an overview of your tasks and progress.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white shadow rounded-lg p-6">
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
        
        <div className="bg-white shadow rounded-lg p-6">
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
        
        <div className="bg-white shadow rounded-lg p-6">
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
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Completion Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks yet. Create your first task!</p>
          ) : (
            <ul className="divide-y">
              {tasks.slice(0, 5).map(task => (
                <li key={task._id} className="py-3">
                  <div className="flex items-center">
                    <span className={`mr-2 ${
                      task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'
                    }`}>
                      {task.status === 'completed' ? <CheckIcon className="h-5 w-5" /> : <ClockIcon className="h-5 w-5" />}
                    </span>
                    <span className="font-medium">{task.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-4">
            <Link to="/tasks" className="text-blue-600 hover:text-blue-800 font-medium">
              View all tasks →
            </Link>
          </div>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link 
              to="/tasks" 
              className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-center"
            >
              Manage Tasks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;