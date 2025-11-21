import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    document.title = '404 — Not Found';
  }, []);

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-white">
      <div className="max-w-2xl text-center p-8">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">Sorry — the page you were looking for was not found.</p>
        <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'home' }))} className="px-6 py-3 bg-unmakt-2 text-white rounded">Go home</button>
      </div>
    </div>
  );
}
