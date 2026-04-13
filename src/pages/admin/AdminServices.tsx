import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, AlertCircle, RefreshCw, Pencil, X, Check, GripVertical, Star } from 'lucide-react'
import AdminLayout from '@components/admin/AdminLayout'
import {
  fetchAdminServices,
  createService,
  updateService,
  deleteService,
  type AdminService,
} from '@services/adminService'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog'

const ICON_OPTIONS = [
  'BarChart2', 'FileText', 'TrendingUp', 'Shield', 'ShieldCheck',
  'BookOpen', 'Star', 'Handshake', 'Zap', 'Lock', 'CheckCircle',
  'Award', 'Users', 'DollarSign', 'Clock', 'Globe', 'Phone',
]

type FormState = {
  title: string
  icon: string
  shortDescription: string
  description: string
  benefits: string[]
}

const EMPTY_FORM: FormState = {
  title: '',
  icon: 'Star',
  shortDescription: '',
  description: '',
  benefits: [''],
}

function ServiceModal({
  isOpen,
  onClose,
  onSave,
  initial,
  mode,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (data: FormState) => Promise<void>
  initial: FormState
  mode: 'add' | 'edit'
}) {
  const [form, setForm] = useState<FormState>(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) { setForm(initial); setError('') }
  }, [isOpen, initial])

  function updateField<K extends keyof FormState>(key: K, val: FormState[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function addBenefit() {
    setForm((f) => ({ ...f, benefits: [...f.benefits, ''] }))
  }

  function updateBenefit(i: number, val: string) {
    setForm((f) => {
      const b = [...f.benefits]
      b[i] = val
      return { ...f, benefits: b }
    })
  }

  function removeBenefit(i: number) {
    setForm((f) => ({ ...f, benefits: f.benefits.filter((_, idx) => idx !== i) }))
  }

  async function handleSave() {
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.shortDescription.trim()) { setError('Short description is required.'); return }
    setSaving(true)
    setError('')
    try {
      await onSave({ ...form, benefits: form.benefits.filter((b) => b.trim()) })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="bg-[#111] border border-white/10 max-w-xl p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gold-primary/15 flex items-center justify-center">
              <Star size={16} className="text-gold-primary" />
            </div>
            <DialogTitle className="text-base">
              {mode === 'add' ? 'Add New Service' : 'Edit Service'}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block font-body text-xs text-white/40 mb-1.5">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => updateField('title', e.target.value)}
                placeholder="e.g. Credit Analysis"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/40 transition-all"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-body text-xs text-white/40 mb-1.5">Icon</label>
              <select
                value={form.icon}
                onChange={(e) => updateField('icon', e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white focus:outline-none focus:border-gold-primary/40 transition-all"
              >
                {ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="block font-body text-xs text-white/40 mb-1.5">Short Description *</label>
              <textarea
                value={form.shortDescription}
                onChange={(e) => updateField('shortDescription', e.target.value)}
                rows={2}
                placeholder="Brief summary shown on cards and previews"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/40 transition-all resize-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block font-body text-xs text-white/40 mb-1.5">Full Description</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                placeholder="Detailed description shown on the Services page"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/40 transition-all resize-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-body text-xs text-white/40">Key Benefits</label>
              <button
                onClick={addBenefit}
                className="flex items-center gap-1 font-body text-xs text-gold-primary/70 hover:text-gold-primary transition-colors"
              >
                <Plus size={12} /> Add benefit
              </button>
            </div>
            <div className="space-y-2">
              {form.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <GripVertical size={14} className="text-white/15 flex-shrink-0" />
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(i, e.target.value)}
                    placeholder={`Benefit ${i + 1}`}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 font-body text-sm text-white placeholder-white/20 focus:outline-none focus:border-gold-primary/40 transition-all"
                  />
                  {form.benefits.length > 1 && (
                    <button
                      onClick={() => removeBenefit(i)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg text-white/25 hover:text-red-400 hover:bg-red-500/10 transition-all flex-shrink-0"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-red-400 font-body text-sm flex items-center gap-2">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/[0.08] font-body text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-gold-primary font-body text-sm font-semibold text-black transition-all hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
              ) : (
                <Check size={14} />
              )}
              {saving ? 'Saving…' : mode === 'add' ? 'Add Service' : 'Save Changes'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function AdminServices() {
  const [services, setServices] = useState<AdminService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<AdminService | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await fetchAdminServices()
      setServices(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  function openAdd() {
    setEditingService(null)
    setModalOpen(true)
  }

  function openEdit(svc: AdminService) {
    setEditingService(svc)
    setModalOpen(true)
  }

  async function handleSave(data: FormState) {
    if (editingService) {
      const updated = await updateService(editingService.id, data)
      setServices((prev) => prev.map((s) => (s.id === editingService.id ? updated : s)))
    } else {
      const created = await createService(data)
      setServices((prev) => [...prev, created])
    }
    setModalOpen(false)
    setEditingService(null)
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this service? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await deleteService(id)
      setServices((prev) => prev.filter((s) => s.id !== id))
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const modalInitial: FormState = editingService
    ? {
        title: editingService.title,
        icon: editingService.icon,
        shortDescription: editingService.shortDescription,
        description: editingService.description,
        benefits: editingService.benefits.length > 0 ? editingService.benefits : [''],
      }
    : EMPTY_FORM

  return (
    <AdminLayout title="Services" subtitle={`${services.length} service${services.length !== 1 ? 's' : ''} listed`}>
      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/8 text-white/50 hover:text-white hover:bg-white/10 font-body text-sm transition-all"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-primary hover:bg-gold-light text-black font-body text-sm font-semibold transition-all"
          >
            <Plus size={14} />
            Add Service
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
        ) : services.length === 0 ? (
          <div className="bg-[#111] border border-white/8 rounded-2xl px-6 py-12 text-center">
            <p className="font-body text-white/30 text-sm">No services yet.</p>
            <button
              onClick={openAdd}
              className="mt-3 font-body text-xs text-gold-primary/70 hover:text-gold-primary transition-colors"
            >
              Add your first service
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {services.map((svc) => (
                <motion.div
                  key={svc.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-[#111] border border-white/8 rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="font-body text-gold-primary text-[10px] font-bold text-center leading-tight px-1 truncate w-full text-center">
                      {svc.icon}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-heading font-bold text-white text-sm">{svc.title}</h3>
                        <p className="font-body text-white/40 text-xs mt-0.5 line-clamp-2">{svc.shortDescription}</p>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          onClick={() => openEdit(svc)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/8 hover:bg-gold-primary/10 hover:border-gold-primary/25 text-white/40 hover:text-gold-primary font-body text-xs transition-all"
                        >
                          <Pencil size={11} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(svc.id)}
                          disabled={deletingId === svc.id}
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/15 text-white/40 hover:text-red-400 flex items-center justify-center transition-colors flex-shrink-0"
                        >
                          {deletingId === svc.id
                            ? <span className="w-3 h-3 border border-red-400/50 border-t-red-400 rounded-full animate-spin" />
                            : <Trash2 size={13} />}
                        </button>
                      </div>
                    </div>

                    {svc.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {svc.benefits.slice(0, 3).map((benefit, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/8 font-body text-[10px] text-white/40"
                          >
                            <span className="w-1 h-1 rounded-full bg-gold-primary/50" />
                            {benefit}
                          </span>
                        ))}
                        {svc.benefits.length > 3 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/8 font-body text-[10px] text-white/25">
                            +{svc.benefits.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <ServiceModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditingService(null) }}
        onSave={handleSave}
        initial={modalInitial}
        mode={editingService ? 'edit' : 'add'}
      />
    </AdminLayout>
  )
}
