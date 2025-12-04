'use client';

import { useState } from 'react';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center group">
              <svg 
                className="h-8 w-auto" 
                viewBox="0 0 200 40" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <text
                  x="0"
                  y="30"
                  className="font-bold transition-colors"
                  style={{ fontSize: '32px' }}
                  fill="url(#gradient)"
                >
                  ZenithFlix
                </text>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" className="transition-all" style={{ stopColor: '#9333ea' }} />
                    <stop offset="100%" className="transition-all" style={{ stopColor: '#ec4899' }} />
                  </linearGradient>
                </defs>
              </svg>
            </a>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-6">
              <a 
                href="#" 
                className="text-white font-medium hover:text-purple-400 transition-colors"
              >
                Browse
              </a>
              <a 
                href="#" 
                className="text-gray-400 font-medium hover:text-purple-400 transition-colors"
              >
                Following
              </a>
              <a 
                href="#" 
                className="text-gray-400 font-medium hover:text-purple-400 transition-colors"
              >
                Categories
              </a>
              <a 
                href="#" 
                className="text-gray-400 font-medium hover:text-purple-400 transition-colors"
              >
                Esports
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search streams, games, or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon - Mobile */}
            <button 
              className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Notifications */}
            <button 
              className="relative p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Notifications"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button 
              className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
            </button>

            {/* Sign Up Button */}
            <button className="hidden lg:block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
              Sign Up
            </button>

            {/* Mobile Menu */}
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
