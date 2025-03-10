import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRightIcon, ClockIcon, CheckCircleIcon, CalendarIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';

function LandingPage() {
  const { currentUser } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for scroll-triggered animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/4 right-10 w-48 h-48 bg-white opacity-10 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-10 left-1/4 w-56 h-56 bg-white opacity-10 rounded-full animate-float-fast"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-20 text-center lg:pt-32 lg:pb-28">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Manage Your Time</span>
              <span className="block text-indigo-200">Like Never Before</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-xl text-indigo-100 sm:max-w-3xl">
              GhedaTime helps you organize tasks, track progress, and boost productivity with a simple and intuitive interface.
            </p>
            <div className="mt-10 sm:flex sm:justify-center">
              <div className="rounded-md shadow">
                <Link
                  to={currentUser ? "/dashboard" : "/login"}
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative bg-white bg-opacity-5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform transition-500 hover:scale-105 hover:bg-opacity-15">
              <p className="text-4xl font-extrabold text-white">85%</p>
              <p className="mt-2 text-lg text-indigo-100">Productivity Increase</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform transition-500 hover:scale-105 hover:bg-opacity-15">
              <p className="text-4xl font-extrabold text-white">10,000+</p>
              <p className="mt-2 text-lg text-indigo-100">Active Users</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform transition-500 hover:scale-105 hover:bg-opacity-15">
              <p className="text-4xl font-extrabold text-white">1M+</p>
              <p className="mt-2 text-lg text-indigo-100">Tasks Completed</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 transform transition-500 hover:scale-105 hover:bg-opacity-15">
              <p className="text-4xl font-extrabold text-white">4.8/5</p>
              <p className="mt-2 text-lg text-indigo-100">User Rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Features that make time management easy
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
              Everything you need to stay organized and productive
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-8 transform transition duration-500 hover:scale-105 hover:bg-opacity-25 hover:shadow-xl">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white text-center">Time Tracking</h3>
                <p className="mt-2 text-base text-indigo-100 text-center">
                  Track time spent on tasks and projects to improve your productivity and focus.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Automatic time tracking</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Detailed time reports</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Customizable timers</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-8 transform transition duration-500 hover:scale-105 hover:bg-opacity-25 hover:shadow-xl">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white text-center">Task Management</h3>
                <p className="mt-2 text-base text-indigo-100 text-center">
                  Create, organize, and prioritize tasks to stay on top of your workload.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Drag-and-drop organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Priority levels</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Deadline reminders</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-8 transform transition duration-500 hover:scale-105 hover:bg-opacity-25 hover:shadow-xl">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <ChartBarIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white text-center">Analyze & Improve</h3>
                <p className="mt-2 text-base text-indigo-100 text-center">
                  Review your productivity data and optimize your workflow.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Performance insights</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Productivity trends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 h-5 w-5 text-indigo-300">✓</span>
                    <span className="ml-2 text-sm text-indigo-100">Custom reports</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              How GhedaTime Works
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-indigo-100 mx-auto">
              Simple steps to boost your productivity
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              {/* Connection line */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-indigo-400 bg-opacity-30 transform -translate-y-1/2"></div>
              
              <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
                <div className="relative bg-white bg-opacity-10 rounded-lg p-8 backdrop-filter backdrop-blur-sm transform transition duration-500 hover:scale-105">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white border-4 border-indigo-700">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white text-center">Create Tasks</h3>
                  <p className="mt-2 text-base text-indigo-100 text-center">
                    Add your tasks with details like priority, deadlines, and categories.
                  </p>
                </div>

                <div className="relative bg-white bg-opacity-10 rounded-lg p-8 backdrop-filter backdrop-blur-sm transform transition duration-500 hover:scale-105">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white border-4 border-indigo-700">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white text-center">Track Time</h3>
                  <p className="mt-2 text-base text-indigo-100 text-center">
                    Use our timer to track how much time you spend on each task.
                  </p>
                </div>

                <div className="relative bg-white bg-opacity-10 rounded-lg p-8 backdrop-filter backdrop-blur-sm transform transition duration-500 hover:scale-105">
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500 text-white border-4 border-indigo-700">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <h3 className="mt-6 text-xl font-medium text-white text-center">Analyze & Improve</h3>
                  <p className="mt-2 text-base text-indigo-100 text-center">
                    Review your productivity data and optimize your workflow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#features" className="text-base text-indigo-300 hover:text-white">Features</a></li>
                <li><a href="#" className="text-base text-indigo-300 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-base text-indigo-300 hover:text-white">Integrations</a></li>
              </ul>
            </div>
            {/* Footer content */}
          </div>
          <div className="mt-12 border-t border-indigo-800 pt-8">
            <p className="text-base text-indigo-400 text-center">
              &copy; {new Date().getFullYear()} GhedaTime. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              {/* Social media icons */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;