import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Shield } from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { registerUser } from '@services/authService'

export default function Register() {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    setLoading(true)
    try {
      const { user, token } = await registerUser(name, email, password)
      setAuth(user, token)
      navigate('/dashboard', { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-gradient mb-4 shadow-gold-md">
            <Shield size={26} className="text-white" />
          </div>
          <h1 className="font-heading text-3xl font-black text-white mb-2">Create Your Account</h1>
          <p className="font-body text-white/50 text-sm">Start your credit repair journey with Proximity</p>
        </div>

        <div className="bg-[#111111] border border-gold-primary/20 rounded-2xl p-5 sm:p-8 shadow-gold-lg">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="block font-body text-sm font-medium text-white/70 mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder="John Doe"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/30 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-white/70 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/30 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-sm font-medium text-white/70 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  placeholder="Min. 8 characters"
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-10 py-3 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold-primary/50 focus:ring-1 focus:ring-gold-primary/30 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              <p className="mt-1.5 font-body text-xs text-white/30">Must be at least 8 characters</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 font-body text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-white font-heading font-bold text-sm rounded-pill py-3.5 shadow-gold-sm hover:shadow-gold-md transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={15} /></>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-white/40">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-primary hover:text-gold-light font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-5 pt-5 border-t border-white/5 text-center">
            <p className="font-body text-xs text-white/25">
              By creating an account, you agree to our{' '}
              <span className="text-gold-primary/60">Terms of Service</span> and{' '}
              <span className="text-gold-primary/60">Privacy Policy</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-6 font-body text-xs text-white/20">
          <Link to="/" className="hover:text-white/40 transition-colors">← Back to Proximity Credit Repair</Link>
        </p>
      </motion.div>
    </div>
  )
}
