import { useState, FormEvent } from 'react';
import { UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CommunityApplication } from '../types';

export default function JoinCommunity() {
  const [formData, setFormData] = useState<CommunityApplication>({
    name: '',
    email: '',
    skills: '',
    experience: '',
    portfolio: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setStatus('error');
      setErrorMessage('Applications are temporarily unavailable. Please try again later or email unmakt.info@gmail.com.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('community_applications')
        .insert([formData]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        skills: '',
        experience: '',
        portfolio: '',
        message: ''
      });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const handleChange = (field: keyof CommunityApplication, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-unmakt-1/10 via-white to-unmakt-3/10 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white mx-auto">
            <UserPlus size={32} />
          </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Join Our <span className="bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Are you a talented developer, designer, marketer, or cloud specialist?
            Join our collective of experts and collaborate on exciting projects.
          </p>
          <a
            href="https://discord.gg/hHvRzMxw"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white font-semibold hover:shadow-lg transition"
          >
            Join our Discord community
          </a>
        </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          {status === 'success' ? (
            <div className="text-center space-y-6 py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mx-auto">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Application Submitted!
              </h2>
              <p className="text-xl text-gray-600 max-w-lg mx-auto">
                Thank you for your interest in joining Unmakt. We'll review your application
                and get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Submit Another Application
              </button>
            </div>
          ) : !isSupabaseConfigured ? (
            <div className="text-center space-y-6 py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-600 mx-auto">
                <AlertCircle size={48} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">
                Applications Temporarily Offline
              </h2>
              <p className="text-xl text-gray-600 max-w-xl mx-auto">
                We are configuring our application portal. Please reach us at{' '}
                <a href="mailto:unmakt.info@gmail.com" className="text-blue-600 underline">
                  unmakt.info@gmail.com
                </a>{' '}
                or check back soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-unmakt-2 focus:ring-2 focus:ring-unmakt-2 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-unmakt-2 focus:ring-2 focus:ring-unmakt-2 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Skills *
                </label>
                <input
                  type="text"
                  id="skills"
                  required
                  value={formData.skills}
                  onChange={(e) => handleChange('skills', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-unmakt-2 focus:ring-2 focus:ring-unmakt-2 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="e.g., React, Node.js, AWS, Digital Marketing"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <input
                  type="text"
                  id="experience"
                  required
                  value={formData.experience}
                  onChange={(e) => handleChange('experience', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-unmakt-2 focus:ring-2 focus:ring-unmakt-2 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="e.g., 5 years"
                />
              </div>

              <div>
                <label htmlFor="portfolio" className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio / LinkedIn URL
                </label>
                <input
                  type="url"
                  id="portfolio"
                  value={formData.portfolio}
                  onChange={(e) => handleChange('portfolio', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-unmakt-2 focus:ring-2 focus:ring-unmakt-2 focus:ring-opacity-20 outline-none transition-all"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Why do you want to join Unmakt? *
                </label>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-unmakt-2 focus:ring-2 focus:ring-unmakt-2 focus:ring-opacity-20 outline-none transition-all resize-none"
                  placeholder="Tell us about your experience and what you can bring to our community..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
                  <AlertCircle size={20} className="flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-8 py-4 bg-gradient-to-r from-unmakt-1 via-unmakt-2 to-unmakt-3 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-unmakt-2 mb-2">Flexible</div>
            <p className="text-gray-600">Work on your own schedule</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-unmakt-3 mb-2">Collaborative</div>
            <p className="text-gray-600">Join a community of experts</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-unmakt-2 mb-2">Rewarding</div>
            <p className="text-gray-600">Work on exciting projects</p>
          </div>
        </div>
      </div>
    </div>
  );
}
