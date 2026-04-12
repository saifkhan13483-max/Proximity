import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trash2, Edit3, Check, X, AlertCircle, RefreshCw } from 'lucide-react'
import AdminLayout from '@components/admin/AdminLayout'
import { fetchAdminUsers, updateUser, deleteUser, type AdminUser } from '@services/adminService'

const PLANS = ['Free Consultation', 'Basic Plan', 'Standard Plan', 'Premium Plan', 'VIP Plan']

function PlanBadge({ plan }: { plan: string }) {
  const colors: Record<string, string> = {
    'VIP Plan': 'bg-gold-primary/20 text-gold-primary border-gold-primary/30',
    'Premium Plan': 'bg-purple-500/15 text-purple-300 border-purple-500/25',
    'Standard Plan': 'bg-blue-500/15 text-blue-300 border-blue-500/25',
    'Basic Plan': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
  }
  const cls = colors[plan] || 'bg-white/8 text-white/50 border-white/10'
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-body text-xs font-semibold ${cls}`}>
      {plan}
    </span>
  )
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [filtered, setFiltered] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editPlan, setEditPlan] = useState('')
  const [savingId, setSavingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminUsers()
      setUsers(data)
      setFiltered(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(users.filter((u) =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.plan.toLowerCase().includes(q)
    ))
  }, [search, users])

  async function handleSave(id: string) {
    setSavingId(id)
    try {
      const updated = await updateUser(id, { plan: editPlan })
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
      setEditingId(null)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setSavingId(null)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this user? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteUser(id)
      setUsers((prev) => prev.filter((u) => u.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <AdminLayout title="Users" subtitle={`${users.length} registered client${users.length !== 1 ? 's' : ''}`}>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email or plan…"
              className="w-full bg-[#111] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold-primary/40 transition-all"
            />
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 font-body text-sm transition-all"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 font-body text-sm flex items-center gap-2">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <span className="w-8 h-8 border-2 border-white/10 border-t-gold-primary rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-[#111] border border-white/8 rounded-2xl px-6 py-12 text-center">
            <p className="font-body text-white/30 text-sm">
              {search ? 'No users match your search.' : 'No users registered yet.'}
            </p>
          </div>
        ) : (
          <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30">User</th>
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30 hidden sm:table-cell">Joined</th>
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30">Plan</th>
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30 w-20">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {filtered.map((user) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="border-b border-white/3 hover:bg-white/2 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gold-primary/15 flex items-center justify-center flex-shrink-0">
                              <span className="font-heading font-black text-gold-primary text-xs">
                                {user.name[0]?.toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-body font-semibold text-white text-sm">{user.name}</p>
                              <p className="font-body text-white/35 text-xs">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden sm:table-cell">
                          <span className="font-body text-white/40 text-sm">
                            {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {editingId === user.id ? (
                            <select
                              value={editPlan}
                              onChange={(e) => setEditPlan(e.target.value)}
                              className="bg-[#1a1a1a] border border-gold-primary/30 rounded-lg px-2 py-1.5 font-body text-sm text-white focus:outline-none"
                            >
                              {PLANS.map((p) => <option key={p} value={p}>{p}</option>)}
                            </select>
                          ) : (
                            <PlanBadge plan={user.plan} />
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            {editingId === user.id ? (
                              <>
                                <button
                                  onClick={() => handleSave(user.id)}
                                  disabled={savingId === user.id}
                                  className="w-7 h-7 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 flex items-center justify-center transition-colors"
                                >
                                  {savingId === user.id
                                    ? <span className="w-3 h-3 border border-emerald-400/50 border-t-emerald-400 rounded-full animate-spin" />
                                    : <Check size={13} />}
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 flex items-center justify-center transition-colors"
                                >
                                  <X size={13} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => { setEditingId(user.id); setEditPlan(user.plan) }}
                                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-gold-primary/15 text-white/40 hover:text-gold-primary flex items-center justify-center transition-colors"
                                >
                                  <Edit3 size={13} />
                                </button>
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  disabled={deletingId === user.id}
                                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/15 text-white/40 hover:text-red-400 flex items-center justify-center transition-colors"
                                >
                                  {deletingId === user.id
                                    ? <span className="w-3 h-3 border border-red-400/50 border-t-red-400 rounded-full animate-spin" />
                                    : <Trash2 size={13} />}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
