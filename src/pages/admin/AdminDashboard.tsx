import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Mail, TrendingUp, AlertCircle, ArrowRight } from 'lucide-react'
import AdminLayout from '@components/admin/AdminLayout'
import { fetchAdminStats, type AdminStats } from '@services/adminService'

function StatCard({
  label, value, sub, icon: Icon, color, delay = 0
}: {
  label: string; value: string | number; sub: string; icon: React.ElementType; color: string; delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`bg-gradient-to-br ${color} border border-white/8 rounded-2xl p-5`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center">
          <Icon size={18} className="text-white/60" />
        </div>
      </div>
      <p className="font-heading text-3xl font-black text-white">{value}</p>
      <p className="font-body text-white/60 text-sm font-semibold mt-0.5">{label}</p>
      <p className="font-body text-white/30 text-xs mt-1">{sub}</p>
    </motion.div>
  )
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAdminStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <AdminLayout title="Dashboard" subtitle="Overview of your platform">
      {loading && (
        <div className="flex items-center justify-center py-20">
          <span className="w-8 h-8 border-2 border-white/10 border-t-gold-primary rounded-full animate-spin" />
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 font-body text-sm flex items-center gap-2">
          <AlertCircle size={15} />
          {error}
        </div>
      )}

      {stats && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Users" value={stats.totalUsers}
              sub={`+${stats.newUsersThisMonth} this month`}
              icon={Users} color="from-blue-500/15 to-blue-600/5" delay={0}
            />
            <StatCard
              label="Contact Leads" value={stats.totalContacts}
              sub={`+${stats.newContactsThisMonth} this month`}
              icon={Mail} color="from-emerald-500/15 to-emerald-600/5" delay={0.05}
            />
            <StatCard
              label="Unread Leads" value={stats.unreadContacts}
              sub="Awaiting response"
              icon={AlertCircle} color="from-amber-500/15 to-amber-600/5" delay={0.1}
            />
            <StatCard
              label="Growth" value={`${stats.newUsersThisMonth}`}
              sub="New users (30 days)"
              icon={TrendingUp} color="from-gold-primary/15 to-gold-dark/5" delay={0.15}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-[#111] border border-white/8 rounded-2xl p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-white text-sm">Plan Distribution</h3>
              </div>
              {Object.keys(stats.plans).length === 0 ? (
                <p className="font-body text-white/30 text-sm">No users yet</p>
              ) : (
                <div className="space-y-3">
                  {Object.entries(stats.plans).map(([plan, count]) => {
                    const pct = stats.totalUsers > 0 ? Math.round((count / stats.totalUsers) * 100) : 0
                    return (
                      <div key={plan}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-body text-white/70 text-xs font-medium">{plan}</span>
                          <span className="font-body text-white/40 text-xs">{count} ({pct}%)</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold-gradient rounded-full transition-all duration-700"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="bg-[#111] border border-white/8 rounded-2xl p-5 flex flex-col gap-3"
            >
              <h3 className="font-heading font-bold text-white text-sm mb-1">Quick Actions</h3>
              {[
                { label: 'Manage Users', desc: 'View, update or remove users', href: '/admin/users', icon: Users },
                { label: 'View Contact Leads', desc: 'Respond to incoming inquiries', href: '/admin/contacts', icon: Mail },
              ].map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className="group flex items-center gap-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-gold-primary/20 rounded-xl px-4 py-3 transition-all"
                >
                  <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center flex-shrink-0">
                    <action.icon size={15} className="text-gold-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-semibold text-white text-sm">{action.label}</p>
                    <p className="font-body text-white/35 text-xs">{action.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-white/20 group-hover:text-gold-primary transition-colors flex-shrink-0" />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
