import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Mail, LogOut, Menu, X,
  ShieldCheck, ChevronRight, ExternalLink, Briefcase,
} from 'lucide-react'
import { useAuthStore } from '@store/authStore'
import { cn } from '@lib/utils'
import ProximityLogo from '@common/ProximityLogo'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Contacts', href: '/admin/contacts', icon: Mail },
  { label: 'Services', href: '/admin/services', icon: Briefcase },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  function handleLogout() {
    logout()
    onClose?.()
    navigate('/')
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <ProximityLogo size={36} />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#111] flex items-center justify-center border border-white/10">
              <ShieldCheck size={9} className="text-gold-primary" />
            </div>
          </div>
          <div>
            <p className="font-heading font-black text-white text-sm leading-none">Admin Panel</p>
            <p className="font-body text-white/35 text-[10px] tracking-widest uppercase mt-0.5">Proximity</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="px-3 pt-2 pb-1 font-body text-[10px] font-bold tracking-widest uppercase text-white/20">Menu</p>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-gold-primary/15 text-gold-primary'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon size={16} className="flex-shrink-0" />
              {item.label}
              {isActive && <ChevronRight size={13} className="ml-auto text-gold-primary/60" />}
            </Link>
          )
        })}

        <div className="pt-4">
          <p className="px-3 pb-1 font-body text-[10px] font-bold tracking-widest uppercase text-white/20">Site</p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-body text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-150"
          >
            <ExternalLink size={16} className="flex-shrink-0" />
            View Website
          </a>
        </div>
      </nav>

      <div className="p-4 border-t border-white/5 space-y-2">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-lg bg-gold-primary/15 flex items-center justify-center flex-shrink-0">
            <span className="font-heading font-black text-gold-primary text-xs">
              {user?.name?.[0] || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body font-semibold text-white text-xs truncate">{user?.name}</p>
            <p className="font-body text-white/35 text-[10px] truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/8 text-white/40 hover:text-white/70 hover:bg-white/5 font-body text-sm transition-all"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </div>
  )
}

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export default function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#080808] flex">
      <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 bg-[#0d0d0d] border-r border-white/5 fixed inset-y-0 left-0 z-30">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-60 bg-[#0d0d0d] border-r border-white/5 z-50 lg:hidden flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white"
              >
                <X size={18} />
              </button>
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-5 h-14 flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white/40 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="font-heading font-bold text-white text-base leading-none">{title}</h1>
            {subtitle && <p className="font-body text-white/35 text-xs mt-0.5">{subtitle}</p>}
          </div>
        </header>

        <main className="flex-1 p-5 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}
