import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trash2, AlertCircle, RefreshCw, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '@components/layout/AdminLayout'
import { fetchAdminContacts, updateContactStatus, deleteContact, type AdminContact } from '@services/adminService'

const STATUS_OPTIONS: AdminContact['status'][] = ['new', 'in-progress', 'resolved']

const STATUS_STYLES: Record<AdminContact['status'], string> = {
  new: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'in-progress': 'bg-blue-500/15 text-blue-300 border-blue-500/25',
  resolved: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
}

const STATUS_LABELS: Record<AdminContact['status'], string> = {
  new: 'New',
  'in-progress': 'In Progress',
  resolved: 'Resolved',
}

function StatusBadge({ status }: { status: AdminContact['status'] }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border font-body text-xs font-semibold ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<AdminContact[]>([])
  const [filtered, setFiltered] = useState<AdminContact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | AdminContact['status']>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminContacts()
      setContacts(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    const q = search.toLowerCase()
    setFiltered(
      contacts.filter((c) => {
        const matchSearch = c.fullName.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.serviceOfInterest.toLowerCase().includes(q)
        const matchFilter = filter === 'all' || c.status === filter
        return matchSearch && matchFilter
      })
    )
  }, [search, filter, contacts])

  async function handleStatusChange(id: string, status: AdminContact['status']) {
    setUpdatingId(id)
    try {
      const updated = await updateContactStatus(id, status)
      setContacts((prev) => prev.map((c) => (c.id === id ? updated : c)))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Update failed')
    } finally {
      setUpdatingId(null)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this contact? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteContact(id)
      setContacts((prev) => prev.filter((c) => c.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const counts = { all: contacts.length, new: 0, 'in-progress': 0, resolved: 0 }
  contacts.forEach((c) => { counts[c.status]++ })

  return (
    <AdminLayout title="Contact Leads" subtitle={`${contacts.length} total submission${contacts.length !== 1 ? 's' : ''}`}>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or service…"
              className="w-full bg-[#111] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 font-body text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold-primary/40 transition-all"
            />
          </div>
          <button
            onClick={load}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white font-body text-sm transition-all"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {(['all', 'new', 'in-progress', 'resolved'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3.5 py-1.5 rounded-xl font-body text-xs font-semibold border transition-all ${
                filter === s
                  ? 'bg-gold-primary/15 border-gold-primary/30 text-gold-primary'
                  : 'bg-white/4 border-white/8 text-white/40 hover:text-white/60'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABELS[s]} ({counts[s]})
            </button>
          ))}
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
              {search || filter !== 'all' ? 'No contacts match your filter.' : 'No contact submissions yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <AnimatePresence>
              {filtered.map((contact) => {
                const isExpanded = expandedId === contact.id
                return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="bg-[#111] border border-white/8 rounded-2xl overflow-hidden"
                  >
                    <div
                      className="flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-white/2 transition-colors"
                      onClick={() => setExpandedId(isExpanded ? null : contact.id)}
                    >
                      <div className="w-9 h-9 rounded-xl bg-gold-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail size={15} className="text-gold-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                            <p className="font-body font-semibold text-white text-sm">{contact.fullName}</p>
                            <p className="font-body text-white/35 text-xs mt-0.5">{contact.email}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <StatusBadge status={contact.status} />
                            {isExpanded ? <ChevronUp size={14} className="text-white/30" /> : <ChevronDown size={14} className="text-white/30" />}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                          <span className="font-body text-white/40 text-xs bg-white/5 px-2 py-0.5 rounded-md">{contact.serviceOfInterest}</span>
                          <span className="font-body text-white/25 text-xs">
                            {new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
                            <div className="bg-[#0d0d0d] rounded-xl p-4">
                              <p className="font-body text-xs font-semibold text-white/30 uppercase tracking-widest mb-2">Message</p>
                              <p className="font-body text-white/70 text-sm leading-relaxed">{contact.message}</p>
                            </div>

                            {contact.phone && (
                              <div className="flex items-center gap-2 text-white/40 font-body text-sm">
                                <Phone size={13} />
                                <a href={`tel:${contact.phone}`} className="hover:text-gold-primary transition-colors">{contact.phone}</a>
                              </div>
                            )}

                            <div className="flex items-center gap-3 flex-wrap">
                              <div className="flex items-center gap-2">
                                <span className="font-body text-xs text-white/30">Status:</span>
                                <select
                                  value={contact.status}
                                  onChange={(e) => handleStatusChange(contact.id, e.target.value as AdminContact['status'])}
                                  disabled={updatingId === contact.id}
                                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-2.5 py-1.5 font-body text-xs text-white focus:outline-none focus:border-gold-primary/40 transition-all disabled:opacity-50"
                                >
                                  {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                                </select>
                                {updatingId === contact.id && <span className="w-3.5 h-3.5 border border-gold-primary/30 border-t-gold-primary rounded-full animate-spin" />}
                              </div>

                              <a
                                href={`mailto:${contact.email}`}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-primary/10 hover:bg-gold-primary/20 text-gold-primary font-body text-xs font-semibold transition-colors"
                              >
                                <Mail size={12} /> Reply by Email
                              </a>

                              <button
                                onClick={() => handleDelete(contact.id)}
                                disabled={deletingId === contact.id}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 font-body text-xs font-semibold transition-colors ml-auto disabled:opacity-50"
                              >
                                {deletingId === contact.id
                                  ? <span className="w-3 h-3 border border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                  : <Trash2 size={12} />}
                                Delete
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
