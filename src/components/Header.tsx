'use client';

import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import NavItem from './NavItem';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { userEmail, logout } = useAuth();
  // Read query from URL on client without useSearchParams to avoid SSR Suspense requirement
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search).get('q') || '';
    // microtask to avoid React state update during render warnings
    Promise.resolve().then(() => setSearchQuery(q));
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md border-b border-gray-800">
        <div className=" mx-auto px-4 md:px-8 py-4 lg:px-12">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img src="images/logo.svg" alt="ZenithFlix Logo" className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-8">

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center gap-6">
                <NavItem href="video" label="Durchsuchen" active />
                <NavItem href="streams" label="Abonniert" />
                <NavItem href="categories" label="Kategorien" />
                <NavItem href="#" label="VOD" />
              </nav>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden sm:block">
              <form className="relative" action="/search" method="GET">
                <input
                  type="text"
                  name="q"
                  placeholder="Streams, Spiele oder Nutzer suchen"
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
              </form>
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

              {/* User/Profile or Sign in */}
              {userEmail ? (
                <div className="relative">
                  {/* Profile button with partial email */}
                  <button
                    type="button"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    onClick={() => setProfileOpen((v) => !v)}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      {userEmail.charAt(0).toUpperCase()}
                    </div>

                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-800 bg-gray-900 shadow-lg z-50">
                      <div className="py-2">
                        <div className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-800">
                          {userEmail.replace(/(.{3}).+(@.+)/, '$1…$2')}
                        </div>
                        <Link href="/live/create" className="block px-3 py-2 text-sm text-white hover:bg-gray-800" onClick={() => setProfileOpen(false)}>
                          Create Live
                        </Link>
                        <Link href="/live-streams/my" className="block px-3 py-2 text-sm text-white hover:bg-gray-800" onClick={() => setProfileOpen(false)}>
                          My Live Streams
                        </Link>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-gray-800"
                          onClick={() => { setProfileOpen(false); logout(); }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button onClick={() => setAuthOpen(true)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors" aria-label="Sign in">
                  <img src="images/user-avatar.png" className="w-8 h-8 rounded-full" />
                  <span className="hidden md:inline text-white">rodiehlmagenta75x</span>
                </button>
              )}

              {/* Sign Up Button
              {!userEmail && (
                <button onClick={() => setAuthOpen(true)} className="hidden lg:block bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                  Sign Up
                </button>
              )} */}

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-30" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          {/* Panel */}
          <div className="absolute top-0 left-0 right-0 bg-gray-900 border-b border-gray-800 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-white font-medium hover:text-purple-400 transition-colors" onClick={() => setMobileOpen(false)}>
                  Browse
                </Link>
                <Link href="#" className="text-gray-300 font-medium hover:text-purple-400 transition-colors" onClick={() => setMobileOpen(false)}>
                  Following
                </Link>
                <Link href="#" className="text-gray-300 font-medium hover:text-purple-400 transition-colors" onClick={() => setMobileOpen(false)}>
                  Categories
                </Link>
                <Link href="#" className="text-gray-300 font-medium hover:text-purple-400 transition-colors" onClick={() => setMobileOpen(false)}>
                  Esports
                </Link>
                {userEmail && (
                  <>
                    <Link href="/live-streams/my" className="text-white font-medium hover:text-purple-400 transition-colors" onClick={() => setMobileOpen(false)}>
                      My Live Streams
                    </Link>
                    <Link href="/live/create" className="text-white font-medium hover:text-purple-400 transition-colors" onClick={() => setMobileOpen(false)}>
                      Create Live
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}
