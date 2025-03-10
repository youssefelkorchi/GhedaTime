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
      <div className="py-24 bg-gradient-to-r from-purple-700 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
              How GhedaTime Works
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-indigo-100 mx-auto">
              Three simple steps to transform your productivity journey
            </p>
          </div>

          <div className="relative">
            {/* Connection line with animation */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 transform -translate-y-1/2 opacity-30"></div>
            
            <div className="grid grid-cols-1 gap-16 md:grid-cols-3">
              {/* Step 1 */}
              <div className="relative bg-white bg-opacity-10 rounded-2xl p-8 backdrop-filter backdrop-blur-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-20 border border-indigo-400 border-opacity-20">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur opacity-50"></div>
                    <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-white border-opacity-20">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white text-center mb-4">Create Tasks</h3>
                  <p className="text-lg text-indigo-100 text-center leading-relaxed">
                    Easily create and organize your tasks with priorities, deadlines, and custom categories.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="p-3 bg-indigo-600 bg-opacity-30 rounded-lg">
                      <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative bg-white bg-opacity-10 rounded-2xl p-8 backdrop-filter backdrop-blur-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-20">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur opacity-50"></div>
                    <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-white border-opacity-20">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white text-center mb-4">Track Progress</h3>
                  <p className="text-lg text-indigo-100 text-center leading-relaxed">
                    Monitor your time and progress with our intuitive tracking system and real-time updates.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="p-3 bg-indigo-600 bg-opacity-30 rounded-lg">
                      <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white bg-opacity-10 rounded-2xl p-8 backdrop-filter backdrop-blur-lg transform transition duration-500 hover:scale-105 hover:bg-opacity-20">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <div className="absolute inset-0 bg-indigo-500 rounded-full blur opacity-50"></div>
                    <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 border-4 border-white border-opacity-20">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white text-center mb-4">Analyze & Improve</h3>
                  <p className="text-lg text-indigo-100 text-center leading-relaxed">
                    Get detailed insights and analytics to optimize your productivity and workflow.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <div className="p-3 bg-indigo-600 bg-opacity-30 rounded-lg">
                      <svg className="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
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
            {/* Product Section */}
            <div>
              <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#features" className="text-base text-indigo-300 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-base text-indigo-300 hover:text-white">Pricing</a></li>
                <li><a href="#integrations" className="text-base text-indigo-300 hover:text-white">Integrations</a></li>
                <li><a href="#updates" className="text-base text-indigo-300 hover:text-white">Updates</a></li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="/about" className="text-base text-indigo-300 hover:text-white">About</a></li>
                <li><a href="/careers" className="text-base text-indigo-300 hover:text-white">Careers</a></li>
                <li><a href="/blog" className="text-base text-indigo-300 hover:text-white">Blog</a></li>
                <li><a href="/contact" className="text-base text-indigo-300 hover:text-white">Contact</a></li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="/documentation" className="text-base text-indigo-300 hover:text-white">Documentation</a></li>
                <li><a href="/guides" className="text-base text-indigo-300 hover:text-white">Guides</a></li>
                <li><a href="/support" className="text-base text-indigo-300 hover:text-white">Support</a></li>
                <li><a href="/api" className="text-base text-indigo-300 hover:text-white">API</a></li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h3 className="text-sm font-semibold text-indigo-200 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="/privacy" className="text-base text-indigo-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="text-base text-indigo-300 hover:text-white">Terms of Service</a></li>
                <li><a href="/security" className="text-base text-indigo-300 hover:text-white">Security</a></li>
                <li><a href="/cookies" className="text-base text-indigo-300 hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-indigo-800 pt-8">
            <p className="text-base text-indigo-400 text-center">
              &copy; {new Date().getFullYear()} GhedaTime. All rights reserved.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              {/* Social Media Icons */}
              <a href="https://twitter.com/ghedatime" className="text-indigo-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>

              <a href="https://github.com/ghedatime" className="text-indigo-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>

              <a href="https://linkedin.com/company/ghedatime" className="text-indigo-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;