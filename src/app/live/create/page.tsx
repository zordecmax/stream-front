'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import MuxVideoPlayer from '@/components/MuxVideoPlayer';

type CreateStreamPayload = {
  title: string;
  description: string;
};

type CreateStreamResponse = {
  id: string;
  muxStreamId: string;
  streamKey: string;
  playbackId: string;
  title: string;
  description: string;
  status: string;
  isActive: boolean;
  assetId: string | null;
  user: { email: string };
  streamUrl: string; // rtmps URL including key
  playbackUrl: string; // m3u8 URL
  createdAt: string;
  updatedAt: string;
};

const API_URL = 'https://stream-be.onrender.com/api/live-streams';

export default function CreateLiveStreamPage() {
  const { accessToken } = useAuth();

  const [title, setTitle] = useState('My Gaming Stream');
  const [description, setDescription] = useState('Playing Minecraft with friends');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CreateStreamResponse | null>(null);

  const canSubmit = !!accessToken && title.trim().length > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify({ title, description } as CreateStreamPayload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Create stream failed: ${res.status} ${res.statusText} - ${txt}`);
      }
      const json = (await res.json()) as CreateStreamResponse;
      setResult(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="px-4 md:px-8 lg:px-12 py-8 space-y-8">
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Create Live Stream</h1>
          <p className="text-gray-300">Authenticated users can create a new Mux-backed live stream and get the stream key for OBS.</p>
        </section>

        {!accessToken && (
          <div className="rounded-lg border border-gray-800 bg-gray-900 p-4 text-yellow-300">
            You are not signed in. Please sign in to create a live stream.
          </div>
        )}

        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="My Gaming Stream"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1" htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-800 text-white placeholder-gray-500 px-4 py-2 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                placeholder="Playing Minecraft with friends"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={!canSubmit || loading}
                className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg"
              >
                {loading ? 'Creating…' : 'Create Stream'}
              </button>
              {error && <span className="text-red-400 text-sm">{error}</span>}
            </div>
          </form>
        </section>

        {result && (
          <section className="rounded-lg border border-gray-800 bg-gray-900 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Stream Created</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-gray-300"><span className="text-gray-400">Title:</span> {result.title}</div>
                <div className="text-gray-300"><span className="text-gray-400">Description:</span> {result.description}</div>
                <div className="text-gray-300"><span className="text-gray-400">Status:</span> {result.status}</div>
                <div className="text-gray-300"><span className="text-gray-400">Email:</span> {result.user?.email}</div>
                <div className="text-gray-300"><span className="text-gray-400">Stream Key:</span> <code className="text-purple-300">{result.streamKey}</code></div>
                <div className="text-gray-300"><span className="text-gray-400">RTMPS URL:</span> <code className="text-purple-300">rtmps://global-live.mux.com:443/app</code></div>
                <div className="text-gray-300"><span className="text-gray-400">Playback ID:</span> <code className="text-purple-300">{result.playbackId}</code></div>
                <div className="text-gray-300"><span className="text-gray-400">Playback URL:</span> <code className="text-purple-300">{result.playbackUrl}</code></div>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold">How to stream with OBS (MUX)</h3>
                <ol className="list-decimal ml-5 text-gray-300 space-y-1">
                  <li>Open OBS and go to Settings → Stream.</li>
                  <li>Service: Custom...</li>
                  <li>Server: <code className="text-purple-300">rtmps://global-live.mux.com:443/app</code></li>
                  <li>Stream Key: <code className="text-purple-300">{result.streamKey}</code></li>
                  <li>Apply and Start Streaming.</li>
                </ol>
                <p className="text-gray-400 text-sm">You can preview your live playback using the Mux player below once the stream is active.</p>
              </div>
            </div>

            {/* Preview Player (if playbackId is available) */}
            {result.playbackId && (
              <div className="mt-4">
                <MuxVideoPlayer
                  playbackId={result.playbackId}
                  className="w-full max-w-3xl"
                  metadata={{
                    video_id: result.id,
                    video_title: result.title,
                    viewer_user_id: result.user?.email,
                  }}
                  muted
                  autoPlay={false}
                />
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
