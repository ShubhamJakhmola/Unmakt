import { useState } from 'react';
import { Lock, Mail, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, register, loading } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');
    try {
      if (mode === 'login') {
        await login(email, password);
        setMessage('Logged in successfully!');
      } else {
        await register(email, password, adminCode || undefined);
        setMessage('Account created and logged in!');
      }
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Unable to authenticate.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-xs uppercase tracking-[0.3em]">
            Secure access
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Manage your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Unmakt
            </span>{' '}
            workspace
          </h1>
          <p className="text-lg text-gray-600">
            Admins can oversee incoming applications and manage collaborators. Members get a personalized portal to stay connected with active projects.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <ShieldCheck className="text-blue-600 mb-3" />
              <p className="font-semibold text-gray-900">Admin Console</p>
              <p className="text-sm text-gray-500">Approve talent, review community applications.</p>
            </div>
            <div className="p-4 rounded-2xl border border-gray-100 bg-white shadow-sm">
              <UserPlus className="text-cyan-600 mb-3" />
              <p className="font-semibold text-gray-900">Member Workspace</p>
              <p className="text-sm text-gray-500">Track opportunities and collaborate on briefs.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex gap-2 mb-8 bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
                mode === 'login' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold transition ${
                mode === 'register' ? 'bg-white shadow text-gray-900' : 'text-gray-500'
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Email</span>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="you@unmakt.com"
                />
              </div>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700 mb-2 block">Password</span>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="At least 8 characters"
                />
              </div>
            </label>

            {mode === 'register' && (
              <label className="block">
                <span className="text-sm font-semibold text-gray-700 mb-2 block">Admin invite code (optional)</span>
                <input
                  type="text"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter provided admin code"
                />
              </label>
            )}

            {status === 'error' && (
              <div className="p-3 rounded-2xl bg-red-50 text-red-600 text-sm">{message}</div>
            )}

            {status === 'success' && (
              <div className="p-3 rounded-2xl bg-green-50 text-green-700 text-sm">{message}</div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting' || loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Processing…' : mode === 'login' ? 'Login' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

