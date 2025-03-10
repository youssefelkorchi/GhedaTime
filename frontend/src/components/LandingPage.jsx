import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRightIcon, ClockIcon, CheckCircleIcon, CalendarIcon } from '@heroicons/react/24/outline';

function LandingPage() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full animate-float-slow"></div>
          <div className="absolute top-1/4 right-10 w-48 h-48 bg-white opacity-10 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-10 left-1/4 w-56 h-56 bg-white opacity-10 rounded-full animate-float-fast"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-20 text-center lg:pt-32">
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
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
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
              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-8 transform transition duration-500 hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white text-center">Time Tracking</h3>
                <p className="mt-2 text-base text-indigo-100 text-center">
                  Track time spent on tasks and projects to improve your productivity and focus.
                </p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-8 transform transition duration-500 hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <CheckCircleIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white text-center">Task Management</h3>
                <p className="mt-2 text-base text-indigo-100 text-center">
                  Create, organize, and prioritize tasks to stay on top of your workload.
                </p>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg px-6 py-8 transform transition duration-500 hover:scale-105">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                  <CalendarIcon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-medium text-white text-center">Progress Tracking</h3>
                <p className="mt-2 text-base text-indigo-100 text-center">
                  Monitor your progress with visual dashboards and detailed reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white bg-opacity-5">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-indigo-300">Start managing your time today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to={currentUser ? "/dashboard" : "/login"}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;