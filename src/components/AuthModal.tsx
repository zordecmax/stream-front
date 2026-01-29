'use client';

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { IconX } from '@tabler/icons-react';

type Mode = 'login' | 'register';

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { login, register, userEmail } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setLoading(false);
      closeRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onClose(); };
    document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [isOpen, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === 'login') {
        await login({ email, password });
      } else {
        await register({ email, password, name });
      }
      onClose();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Etwas ist schiefgelaufen';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="relative w-full max-w-md bg-gray-900 text-white rounded-lg shadow-xl">
        <button ref={closeRef} onClick={onClose} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center" aria-label="Close">
          <IconX className="w-5 h-5" />
        </button>

        <div className="px-6 pt-6">
          <div className="flex gap-2 mb-4">
            <button className={`px-3 py-2 rounded ${mode === 'login' ? 'bg-purple-600' : 'bg-gray-800'}`} onClick={() => setMode('login')}>Anmelden</button>
            <button className={`px-3 py-2 rounded ${mode === 'register' ? 'bg-purple-600' : 'bg-gray-800'}`} onClick={() => setMode('register')}>Registrieren</button>
          </div>
          <h2 id="auth-title" className="text-xl font-bold mb-2">{mode === 'login' ? 'Willkommen zurück' : 'Erstelle dein Konto'}</h2>
          {userEmail && <p className="text-sm text-gray-400 mb-2">Angemeldet als {userEmail}</p>}
        </div>

        <form onSubmit={submit} className="px-6 pb-6 space-y-3">
          {mode === 'register' && (
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600" placeholder="Ihr Name" />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1">E-Mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full rounded bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600" placeholder="sie@beispiel.de" />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Passwort</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full rounded bg-gray-800 px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600" placeholder="••••••••" />
          </div>
          {error && <div className="text-red-400 text-sm">{error}</div>}
          <button type="submit" disabled={loading} className="w-full py-2 rounded bg-purple-600 hover:bg-purple-500 font-semibold">{loading ? 'Bitte warten…' : mode === 'login' ? 'Anmelden' : 'Registrieren'}</button>
        </form>
      </div>
    </div>
  );
}
