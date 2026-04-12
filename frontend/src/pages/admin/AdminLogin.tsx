import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { loginUser } from '@services/authService'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { setAuth, isAdmin } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdmin()) {
    navigate('/admin', { replace: true })
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user, token } = await loginUser(email, password)
      if (user.role !== 'admin') {
        setError('This portal is for administrators only.')
        setLoading(false)
        return
      }
      setAuth(user, token)
      navigate('/admin', { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gold-gradient mb-4 shadow-gold-md">
            <ShieldCheck size={26} className="text-white" />
          </div>
          <h1 className="font-heading text-2xl font-black text-white mb-1">Admin Portal</h1>
          <p className="font-body text-white/40 text-sm">Proximity Credit Repair · Restricted Access</p>
        </div>

        <div className="bg-[#111] border border-gold-primary/20 rounded-2xl p-7 shadow-gold-lg">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  placeholder="admin@proximity.com"
                  className="w-full bg-[#1a1a1a] border border-white/8 rounded-xl pl-10 pr-4 py-3 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/40 focus:ring-1 focus:ring-gold-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block font-body text-xs font-semibold text-white/50 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-[#1a1a1a] border border-white/8 rounded-xl pl-10 pr-10 py-3 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/40 focus:ring-1 focus:ring-gold-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-sm font-body bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gold-gradient text-white font-heading font-bold text-sm rounded-xl py-3 shadow-gold-sm hover:shadow-gold-md transition-all disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In to Admin'}
            </button>
          </form>
        </div>

        <p className="text-center mt-5 font-body text-xs text-white/15">
          Default: admin@proximity.com · Admin@2026!
        </p>
      </motion.div>
    </div>
  )
}
