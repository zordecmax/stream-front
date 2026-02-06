'use client';

import { useEffect, useState } from 'react';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import NavItem from './NavItem';
import { IconBell, IconSearch, IconMenu2, IconChevronDown } from '@tabler/icons-react';
import { Suspense } from 'react';
import SearchForm from './SearchForm';
import Button from "@/components/ui/Button";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { userEmail, logout } = useAuth();

  // Initialize searchQuery from the current URL on the client
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search).get('q') || '';
    // microtask to avoid React state update during render warnings
    Promise.resolve().then(() => setSearchQuery(q));
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-gray-900/95 backdrop-blur-md h-[var(--navbar-height)] flex flex-col justify-center">
        <div className="mx-auto px-4 w-full">
          <div className="flex items-center justify-between md:gap-4 gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <img src="/images/logo.svg" alt="HYPE Logo" className="h-auto w-30 min-w-20" />
            </Link>
            <div className="flex items-center gap-8">

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex items-center gap-6">
                <NavItem href="/streams" label="Abonniert" />
                <NavItem href="/categories" label="Kategorien" />
              </nav>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden sm:block">
              <Suspense fallback={null}>
                <SearchForm />
              </Suspense>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Search Icon - Mobile */}
              <button
                onClick={() => setMobileSearchOpen(true)}
                className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Search"
              >
                <IconSearch className="w-6 h-6" />
              </button>

              {/* Notifications */}
              {userEmail && (
                <button
                  className="relative p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Notifications"
                >
                  <IconBell className="w-6 h-6" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              )}

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
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                      <img src="/images/user-avatar.png" alt="User Avatar" className="w-9 h-9 rounded-full" />
                    </div>
                    <span className='hidden lg:inline'>{userEmail.replace(/(.{3}).+(@.+)/, '$1…$2')}</span>
                    <IconChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-800 bg-gray-900 shadow-lg z-50">
                      <div className="py-2">
                        <div className="w-full text-left px-3 py-2 text-sm text-white hover:bg-gray-800 block lg:hidden">
                          {userEmail.replace(/(.{3}).+(@.+)/, '$1…$2')}
                        </div>
                        {/* <Link href="/live/create" className="block px-3 py-2 text-sm text-white hover:bg-gray-800" onClick={() => setProfileOpen(false)}>
                          Live erstellen
                        </Link> */}
                        <Link href="/live-streams/my" className="block px-3 py-2 text-sm text-white hover:bg-gray-800" onClick={() => setProfileOpen(false)}>
                          Meine Live-Streams
                        </Link>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-300 hover:bg-gray-800"
                          onClick={() => { setProfileOpen(false); logout(); }}
                        >
                          Abmelden
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (

                <Button onClick={() => setAuthOpen(true)} >
                  Anmelden
                </Button>
              )}

              {/* Mobile Menu */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              >
                <IconMenu2 />
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
          <div className="absolute top-[var(--navbar-height)] left-0 right-0 bg-gray-900 border-b border-gray-800 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <nav className="flex flex-col gap-2">
                <NavItem href="/streams" label="Abonniert" onClick={() => setMobileOpen(false)} />
                <NavItem href="/categories" label="Kategorien" onClick={() => setMobileOpen(false)} />

                {userEmail && (
                  <>
                    <NavItem href="/live-streams/my" onClick={() => setMobileOpen(false)} label='Meine Live-Streams' />
                    {/* <NavItem href="/live/create" onClick={() => setMobileOpen(false)} label='Live erstellen' /> */}
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />

      {/* Mobile Search Modal */}
      {mobileSearchOpen && (
        <div className="sm:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[var(--background)]"
            onClick={() => setMobileSearchOpen(false)}
          />
          {/* Modal Panel */}
          <div className="absolute inset-0 flex items-start justify-center">
            <div className="w-full">
              <div className="p-4 flex items-center gap-2 justify-between">
                <Suspense fallback={null}>
                  <SearchForm />
                </Suspense>
                <Button variant='transparent' onClick={() => setMobileSearchOpen(false)} >
                  Abbrechen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
