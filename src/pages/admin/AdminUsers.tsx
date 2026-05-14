import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trash2, AlertCircle, RefreshCw, ChevronDown, CreditCard, Check } from 'lucide-react'
import AdminLayout from '@components/layout/AdminLayout'
import { fetchAdminUsers, updateUser, deleteUser, type AdminUser } from '@services/adminService'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'

const PLANS = [
  { name: 'Free Consultation', price: 'Free', color: 'text-white/50', border: 'border-white/10', bg: 'bg-white/5', dot: 'bg-white/30' },
  { name: 'Basic Plan', price: '$49/mo', color: 'text-emerald-300', border: 'border-emerald-500/25', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
  { name: 'Standard Plan', price: '$99/mo', color: 'text-blue-300', border: 'border-blue-500/25', bg: 'bg-blue-500/10', dot: 'bg-blue-400' },
  { name: 'Premium Plan', price: '$149/mo', color: 'text-purple-300', border: 'border-purple-500/25', bg: 'bg-purple-500/10', dot: 'bg-purple-400' },
  { name: 'VIP Plan', price: '$199/mo', color: 'text-gold-primary', border: 'border-gold-primary/30', bg: 'bg-gold-primary/10', dot: 'bg-gold-primary' },
]

function getPlanMeta(planName: string) {
  return PLANS.find((p) => p.name === planName) || PLANS[0]
}

function PlanBadge({ plan }: { plan: string }) {
  const meta = getPlanMeta(plan)
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border font-body text-xs font-semibold ${meta.color} ${meta.border} ${meta.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {plan}
    </span>
  )
}

function ChangePlanModal({
  user,
  isOpen,
  onClose,
  onSave,
}: {
  user: AdminUser | null
  isOpen: boolean
  onClose: () => void
  onSave: (plan: string) => Promise<void>
}) {
  const [selected, setSelected] = useState(user?.plan ?? '')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (user) setSelected(user.plan)
  }, [user])

  async function handleConfirm() {
    if (!user || selected === user.plan) { onClose(); return }
    setSaving(true)
    await onSave(selected)
    setSaving(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="bg-[#111] border border-white/10 max-w-md p-6">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-primary/15 flex items-center justify-center">
              <CreditCard size={16} className="text-gold-primary" />
            </div>
            <div>
              <DialogTitle className="text-base">Change Plan</DialogTitle>
              <p className="font-body text-white/40 text-xs mt-0.5">{user?.name} · {user?.email}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-2">
          {PLANS.map((plan) => {
            const isSelected = selected === plan.name
            const isCurrent = user?.plan === plan.name
            return (
              <button
                key={plan.name}
                onClick={() => setSelected(plan.name)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all text-left ${
                  isSelected
                    ? `${plan.bg} ${plan.border}`
                    : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${plan.dot}`} />
                  <div>
                    <span className={`font-body font-semibold text-sm ${isSelected ? plan.color : 'text-white/70'}`}>
                      {plan.name}
                    </span>
                    {isCurrent && (
                      <span className="ml-2 font-body text-xs text-white/30">(current)</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-body text-xs ${isSelected ? plan.color : 'text-white/30'}`}>{plan.price}</span>
                  {isSelected && (
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center ${plan.bg} ${plan.border} border`}>
                      <Check size={10} className={plan.color} />
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] font-body text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={saving || selected === user?.plan}
            className="flex-1 py-2.5 rounded-xl bg-gold-primary font-body text-sm font-semibold text-black transition-all hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            ) : null}
            {saving ? 'Saving…' : 'Confirm Change'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [filtered, setFiltered] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [planFilter, setPlanFilter] = useState('All')
  const [changingPlanUser, setChangingPlanUser] = useState<AdminUser | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminUsers()
      setUsers(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      users.filter((u) => {
        const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.plan.toLowerCase().includes(q)
        const matchPlan = planFilter === 'All' || u.plan === planFilter
        return matchSearch && matchPlan
      })
    )
  }, [search, planFilter, users])

  async function handlePlanSave(userId: string, plan: string) {
    try {
      const updated = await updateUser(userId, { plan })
      setUsers((prev) => prev.map((u) => (u.id === userId ? updated : u)))
      setChangingPlanUser(null)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Update failed')
      throw e
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

  const planCounts = PLANS.reduce<Record<string, number>>((acc, p) => {
    acc[p.name] = users.filter((u) => u.plan === p.name).length
    return acc
  }, {})

  return (
    <AdminLayout title="Users" subtitle={`${users.length} registered client${users.length !== 1 ? 's' : ''}`}>
      <div className="space-y-4">

        {users.length > 0 && !loading && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {PLANS.map((plan) => (
              <button
                key={plan.name}
                onClick={() => setPlanFilter(planFilter === plan.name ? 'All' : plan.name)}
                className={`flex flex-col items-center justify-center px-3 py-3 rounded-xl border transition-all ${
                  planFilter === plan.name
                    ? `${plan.bg} ${plan.border}`
                    : 'bg-white/3 border-white/6 hover:bg-white/6'
                }`}
              >
                <span className={`font-heading font-black text-xl ${planFilter === plan.name ? plan.color : 'text-white'}`}>
                  {planCounts[plan.name] || 0}
                </span>
                <span className={`font-body text-xs mt-0.5 ${planFilter === plan.name ? plan.color : 'text-white/35'}`}>
                  {plan.name.replace(' Plan', '')}
                </span>
              </button>
            ))}
          </div>
        )}

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
          <div className="relative">
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="appearance-none bg-[#111] border border-white/8 rounded-xl pl-4 pr-9 py-2.5 font-body text-sm text-white/70 focus:outline-none focus:border-gold-primary/40 transition-all cursor-pointer"
            >
              <option value="All">All Plans</option>
              {PLANS.map((p) => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
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
              {search || planFilter !== 'All' ? 'No users match your filters.' : 'No users registered yet.'}
            </p>
            {(search || planFilter !== 'All') && (
              <button
                onClick={() => { setSearch(''); setPlanFilter('All') }}
                className="mt-3 font-body text-xs text-gold-primary/70 hover:text-gold-primary transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30">User</th>
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30 hidden sm:table-cell">Joined</th>
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30">Current Plan</th>
                    <th className="px-5 py-3.5 font-body text-xs font-bold uppercase tracking-widest text-white/30 w-32">Actions</th>
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
                          <PlanBadge plan={user.plan} />
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setChangingPlanUser(user)}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-gold-primary/10 hover:border-gold-primary/25 text-white/40 hover:text-gold-primary font-body text-xs transition-all"
                            >
                              <CreditCard size={11} />
                              Change Plan
                            </button>
                            <button
                              onClick={() => handleDelete(user.id)}
                              disabled={deletingId === user.id}
                              className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/15 text-white/40 hover:text-red-400 flex items-center justify-center transition-colors flex-shrink-0"
                            >
                              {deletingId === user.id
                                ? <span className="w-3 h-3 border border-red-400/50 border-t-red-400 rounded-full animate-spin" />
                                : <Trash2 size={13} />}
                            </button>
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

      <ChangePlanModal
        user={changingPlanUser}
        isOpen={changingPlanUser !== null}
        onClose={() => setChangingPlanUser(null)}
        onSave={(plan) => changingPlanUser ? handlePlanSave(changingPlanUser.id, plan) : Promise.resolve()}
      />
    </AdminLayout>
  )
}
