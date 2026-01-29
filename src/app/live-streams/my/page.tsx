'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import MuxVideoPlayer from '@/components/MuxVideoPlayer';

type MyLiveStream = {
  id: string;
  playbackId: string;
  title: string;
  description: string;
  status: string;
  playbackUrl: string;
  createdAt: string;
};

const API_URL = 'https://stream-be.onrender.com/api/live-streams/my';
const BASE_URL = 'https://stream-be.onrender.com/api/live-streams';

export default function MyLiveStreamsPage() {
  const { accessToken, userEmail } = useAuth();
  const [data, setData] = useState<MyLiveStream[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const fetchMyStreams = useCallback(async (signal?: AbortSignal) => {
    if (!accessToken) { setData(null); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        signal,
        cache: 'no-store',
      });
      if (!res.ok) throw new Error(`Fetch my streams error: ${res.status} ${res.statusText}`);
      const json = (await res.json()) as MyLiveStream[];
      setData(Array.isArray(json) ? json : []);
    } catch (e) {
      const isAbort = e instanceof DOMException && e.name === 'AbortError';
      if (!isAbort) setError(e instanceof Error ? e.message : 'Fehler beim Laden von Live-Streams');
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const controller = new AbortController();
    fetchMyStreams(controller.signal);
    return () => controller.abort();
  }, [fetchMyStreams]);

  async function toggleStream(id: string, action: 'activate' | 'deactivate') {
    if (!accessToken) return;
    try {
      setBusyId(id);
      setError(null);
      const res = await fetch(`${BASE_URL}/${id}/${action}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`${action} failed: ${res.status} ${res.statusText} - ${text}`);
      }
      // Refresh list after successful toggle
      await fetchMyStreams();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Aktion fehlgeschlagen');
    } finally {
      setBusyId(null);
    }
  }

  const isAuthed = !!accessToken;
  const list = data ?? [];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8 space-y-8">
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Meine Live-Streams</h1>
          {!isAuthed && (
            <p className="mt-2 text-yellow-300">Bitte melden Sie sich an, um Ihre Live-Streams anzuzeigen.</p>
          )}
        </section>

        {error && (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-red-400">{error}</div>
        )}

        {loading ? (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-700 rounded-lg aspect-video mb-3" />
                  <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-700 rounded w-1/2" />
                </div>
              ))}
            </div>
          </section>
        ) : isAuthed && list.length === 0 ? (
          <section>
            <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900 p-8 text-center">
              <svg className="w-12 h-12 text-gray-600 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h2 className="text-white text-xl font-semibold">Noch keine Live-Streams</h2>
              <p className="text-gray-400 mt-1">Erstellen Sie einen neuen Stream auf der Seite Live-Stream erstellen.</p>
            </div>
          </section>
        ) : (
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {list.map((s) => (
                <div key={s.id} className="rounded-lg border border-gray-800 bg-gray-900 p-3">
                  <div className="relative aspect-video bg-black rounded-md overflow-hidden mb-3">
                    {s.playbackId ? (
                      <MuxVideoPlayer
                        playbackId={s.playbackId}
                        className="w-full h-full"
                        metadata={{
                          video_id: s.id,
                          video_title: s.title,
                          viewer_user_id: userEmail ?? undefined,
                        }}
                        muted
                        autoPlay={false}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gray-800" aria-hidden="true" />
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-sm">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.description}</p>
                  <div className="text-gray-500 text-xs">Status: {s.status}</div>
                  <div className="text-gray-500 text-xs">Erstellt: {new Date(s.createdAt).toLocaleString()}</div>
                  {s.playbackUrl && (
                    <div className="text-gray-400 text-xs truncate mt-1">{s.playbackUrl}</div>
                  )}
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${s.status === 'active' ? 'bg-green-700 text-white' : 'bg-gray-700 text-gray-200'}`}>
                      {s.status}
                    </span>
                    {s.status === 'active' ? (
                      <button
                        className="bg-red-600 hover:bg-red-500 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                        disabled={busyId === s.id || !accessToken}
                        onClick={() => toggleStream(s.id, 'deactivate')}
                      >
                        {busyId === s.id ? 'Wird deaktiviert…' : 'Deaktivieren'}
                      </button>
                    ) : (
                      <button
                        className="bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                        disabled={busyId === s.id || !accessToken}
                        onClick={() => toggleStream(s.id, 'activate')}
                      >
                        {busyId === s.id ? 'Wird aktiviert…' : 'Aktivieren'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
