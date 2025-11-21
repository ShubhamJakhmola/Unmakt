import { useState, FormEvent } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const res = await fetch('/.netlify/functions/send-mailjet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name,
          email,
          phone,
          message
        })
      });

      // some responses may return an empty body; parse safely
      const text = await res.text();
      let json: any = {};
      try {
        json = text ? JSON.parse(text) : {};
      } catch (e) {
        json = { raw: text };
      }

      if (!res.ok) {
        const msg = (json && (json.error || (json.message))) || `Mail service error: ${res.status}`;
        throw new Error(msg);
      }

      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Unable to send message');
    }
  };

  return (
    <div className="tech-surface min-h-screen pt-24 pb-16 px-4">
      <div className="tech-surface__inner max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">Email the team</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              inputMode="email"
              autoComplete="email"
              pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"
              title="Enter a valid email such as name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="w-full px-4 py-3 rounded-xl border border-gray-300" required />
          </div>

          {status === 'success' && <div className="p-3 bg-green-50 text-green-700 rounded">Message sent — we will reply soon.</div>}
          {status === 'error' && <div className="p-3 bg-red-50 text-red-700 rounded">{error}</div>}

          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" disabled={status === 'sending'} className="px-6 py-3 bg-unmakt-2 text-white rounded-xl font-semibold hover:shadow-lg transition">
              {status === 'sending' ? 'Sending...' : 'Send Email'}
            </button>
            <button type="button" onClick={() => { setName(''); setEmail(''); setPhone(''); setMessage(''); }} className="px-6 py-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
