import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Please login to view the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="uppercase text-sm tracking-[0.3em] text-cyan-300">Welcome back</p>
            <h1 className="text-4xl font-bold mt-2">Control Center</h1>
            <p className="text-white/70 mt-2">
              Signed in as {user.email} ·{' '}
              <span className="font-semibold text-cyan-200">{user.role.toUpperCase()}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="self-start md:self-auto px-6 py-3 rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            Logout
          </button>
        </header>

        {user.role === 'admin' ? (
          <section className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-2">Community applications</h2>
              <p className="text-white/70 mb-4">
                Connect this dashboard with Supabase or Netlify DB to review and mark applications.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li>• Use Neon queries to pull submissions table</li>
                <li>• Implement status updates (pending → accepted)</li>
                <li>• Trigger notification workflows via Netlify</li>
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-2">Team access</h2>
              <p className="text-white/70 mb-4">
                Generate invite codes via Neon to onboard new admins securely.
              </p>
              <ul className="space-y-3 text-sm text-white/70">
                <li>• Run INSERT statements with role=admin</li>
                <li>• Share ADMIN_INVITE_CODE securely</li>
                <li>• Rotate codes in Netlify env settings</li>
              </ul>
            </div>
          </section>
        ) : (
          <section className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-2">Member workspace</h2>
            <p className="text-white/70">
              You now have access to Unmakt opportunities. We’ll surface a personalized feed here once the Neon-backed job board is connected.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

