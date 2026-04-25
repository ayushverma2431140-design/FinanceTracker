import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Mail, User } from 'lucide-react';
import { User as UserType } from '../../types';

interface OnboardingProps {
  onComplete: (user: UserType) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    
    onComplete({ name: name.trim(), email: email.trim() });
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Target className="h-8 w-8 text-black" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#fafafa] uppercase tracking-tight">
          Welcome to FinTrack
        </h2>
        <p className="mt-2 text-center text-sm text-[#a1a1aa]">
          Let's get to know you before we begin.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-[#18181b] py-8 px-4 shadow-xl shadow-black/40 sm:rounded-2xl sm:px-10 border border-[#27272a]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#fafafa]">
                Full Name
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#a1a1aa]" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-[#27272a] bg-[#09090b] text-[#fafafa] rounded-xl py-3 px-3 border outline-none placeholder-[#71717a] transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#fafafa]">
                Email Address
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#a1a1aa]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-[#27272a] bg-[#09090b] text-[#fafafa] rounded-xl py-3 px-3 border outline-none placeholder-[#71717a] transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </p>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-black bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-[#18181b] transition-all uppercase tracking-wide"
              >
                Get Started
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
