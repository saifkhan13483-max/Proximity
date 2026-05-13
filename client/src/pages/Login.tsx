import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { loginUser } from '@services/authService'
import ProximityLogo from '@components/ui/ProximityLogo'
import { Button } from '@components/ui'
import { Label } from '@components/ui'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth } = useAuthStore()
  const from = (location.state as { from?: string })?.from || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user, token } = await loginUser(email, password)
      setAuth(user, token)
      navigate(from, { replace: true })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed')
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
          <div className="inline-flex items-center justify-center mb-4 drop-shadow-[0_0_16px_rgba(184,146,74,0.5)]">
            <ProximityLogo size={56} />
          </div>
          <h1 className="font-heading text-3xl font-black text-white mb-2">Welcome Back</h1>
          <p className="font-body text-white/50 text-sm">Sign in to your Proximity client portal</p>
        </div>

        <div className="bg-[#111111] border border-gold-primary/20 rounded-2xl p-5 sm:p-8 shadow-gold-lg">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <Label htmlFor="email" className="block font-body text-sm font-medium text-white/70 mb-2">
                Email Address
              </Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="email"
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
              <Label htmlFor="password" className="block font-body text-sm font-medium text-white/70 mb-2">
                Password
              </Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
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

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full justify-center py-3.5 text-sm"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign In <ArrowRight size={15} /></>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-body text-sm text-white/40">
              Don't have an account?{' '}
              <Link to="/register" className="text-gold-primary hover:text-gold-light font-semibold transition-colors">
                Create one free
              </Link>
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
