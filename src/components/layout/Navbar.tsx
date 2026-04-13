import { useRef, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import {
  Menu, X, Phone, ChevronDown, Star, ArrowRight,
  Shield, BarChart2, FileText, TrendingUp, LogOut, LayoutDashboard, UserPlus,
} from 'lucide-react'
import { navLinks } from '@config/navigation'
import { cn } from '@lib/utils'
import ProximityLogo from '@components/ui/ProximityLogo'
import { useUIStore } from '@store/uiStore'
import { useAuthStore } from '@store/authStore'

const SERVICES_DROPDOWN = [
  { label: 'Credit Analysis', href: '/services#credit-analysis', icon: BarChart2, desc: 'Full 3-bureau analysis' },
  { label: 'Dispute Filing', href: '/services#dispute-filing', icon: FileText, desc: 'Expert dispute letters' },
  { label: 'Score Monitoring', href: '/services#score-monitoring', icon: TrendingUp, desc: 'Real-time alerts' },
  { label: 'Debt Validation', href: '/services#debt-validation', icon: Shield, desc: 'Protect your rights' },
]

type NavItemWithDropdown = { label: string; href: string; hasDropdown?: boolean }

const NAV_WITH_DROPDOWN: NavItemWithDropdown[] = navLinks.map((link) =>
  link.label === 'Services' ? { ...link, hasDropdown: true } : { ...link }
)

const TABLET_LINKS = navLinks.filter((l) =>
  ['Home', 'Services', 'Pricing', 'Contact'].includes(l.label)
)

function LogoMark() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 sm:gap-2.5 group flex-shrink-0"
      aria-label="Proximity Credit Repair — Home"
    >
      <div className="relative flex-shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(184,146,74,0.6)] transition-all duration-300">
        <ProximityLogo size={32} />
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-heading font-extrabold text-sm sm:text-base lg:text-lg gold-gradient-text tracking-tight">
          Proximity
        </span>
        <span className="font-body text-white/50 text-[9px] sm:text-[10px] tracking-widest uppercase mt-0.5">
          Credit Repair
        </span>
      </div>
    </Link>
  )
}

function ServicesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-[#111111] border border-gold-primary/20 rounded-card shadow-gold-lg overflow-hidden"
    >
      <div className="p-1.5">
        {SERVICES_DROPDOWN.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gold-primary/10 transition-colors duration-150 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gold-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-primary/20 transition-colors duration-150">
              <item.icon size={15} className="text-gold-primary" />
            </div>
            <div>
              <p className="font-body font-semibold text-white text-sm leading-none">{item.label}</p>
              <p className="font-body text-muted-text text-xs mt-0.5">{item.desc}</p>
            </div>
            <ArrowRight size={13} className="ml-auto text-gold-primary/0 group-hover:text-gold-primary/70 transition-colors duration-150" />
          </Link>
        ))}
      </div>
      <div className="border-t border-gold-primary/10 px-4 py-3 bg-gold-primary/5">
        <Link
          to="/services"
          onClick={onClose}
          className="flex items-center justify-center gap-2 text-gold-primary font-body font-semibold text-xs hover:text-gold-light transition-colors duration-150"
        >
          View all services <ArrowRight size={12} />
        </Link>
      </div>
    </motion.div>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] bg-gold-gradient origin-left"
      style={{ scaleX: scrollYProgress, width: '100%' }}
    />
  )
}

export default function Navbar() {
  const mobileMenuOpen = useUIStore((state) => state.mobileMenuOpen)
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu)
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu)
  const { user, logout, isAuthenticated, isAdmin } = useAuthStore()
  const loggedIn = isAuthenticated()
  const adminUser = isAdmin()
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    closeMobileMenu()
    navigate('/')
  }

  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [announcementVisible, setAnnouncementVisible] = useState(true)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  const { scrollY: motionScrollY } = useScroll()
  useMotionValueEvent(motionScrollY, 'change', (y) => {
    setIsScrolled(y > 40)
    setScrollY(y)
  })

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      const timer = setTimeout(() => firstLinkRef.current?.focus(), 50)
      return () => clearTimeout(timer)
    } else {
      document.body.style.overflow = ''
      hamburgerRef.current?.focus()
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    closeMobileMenu()
    setServicesOpen(false)
  }, [location.pathname, closeMobileMenu])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const hideAnnouncement = scrollY > 60

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">

        {/* ── Announcement Bar ─────────────────────────────── */}
        <AnimatePresence>
          {announcementVisible && !hideAnnouncement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gold-gradient text-near-black">
                <div className="container mx-auto flex items-center justify-between py-1.5 px-3 sm:px-4 gap-2">
                  {/* Left: rating text */}
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Star size={10} fill="currentColor" className="flex-shrink-0" />
                    <span className="text-[11px] sm:text-xs font-body font-semibold truncate">
                      <span className="hidden sm:inline">Rated #1 Credit Repair — </span>
                      Join 10,000+ Clients
                    </span>
                    <Star size={10} fill="currentColor" className="flex-shrink-0 hidden sm:inline" />
                  </div>

                  {/* Right: phone + close */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    <a
                      href="tel:+18005550192"
                      className="hidden sm:flex items-center gap-1.5 text-[11px] sm:text-xs font-body font-bold hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                      <Phone size={11} />
                      (800) 555-0192
                    </a>
                    <button
                      onClick={() => setAnnouncementVisible(false)}
                      aria-label="Close announcement"
                      className="text-near-black/60 hover:text-near-black transition-colors p-0.5"
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Main Nav Bar ─────────────────────────────────── */}
        <motion.div
          animate={{
            backgroundColor: isScrolled ? 'rgba(10,10,10,0.92)' : 'rgba(10,10,10,0)',
            borderBottomColor: isScrolled ? 'rgba(184,146,74,0.15)' : 'rgba(184,146,74,0)',
            boxShadow: isScrolled ? '0 4px 32px rgba(0,0,0,0.4)' : '0 0px 0px rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="relative border-b backdrop-blur-md"
          style={{ borderBottomWidth: 1 }}
        >
          <ScrollProgress />

          <nav
            role="navigation"
            aria-label="Main navigation"
            className="container mx-auto flex items-center justify-between h-[62px] sm:h-[68px] lg:h-[72px] px-2 sm:px-4 lg:px-0"
          >
            {/* Logo */}
            <LogoMark />

            {/* ── Desktop Nav Links (lg+) ── */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_WITH_DROPDOWN.map((link) => {
                const isActive =
                  location.pathname === link.href ||
                  (link.href === '/services' && location.pathname.startsWith('/services'))

                if (link.hasDropdown) {
                  return (
                    <div key={link.href} className="relative" ref={servicesRef}>
                      <button
                        onClick={() => setServicesOpen((v) => !v)}
                        onMouseEnter={() => setServicesOpen(true)}
                        className={cn(
                          'flex items-center gap-1 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200',
                          isActive || servicesOpen
                            ? 'text-gold-primary bg-gold-primary/8'
                            : 'text-white/75 hover:text-white hover:bg-white/5'
                        )}
                        aria-haspopup="true"
                        aria-expanded={servicesOpen}
                      >
                        {link.label}
                        <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                          <ChevronDown size={13} className="mt-0.5" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <ServicesDropdown onClose={() => setServicesOpen(false)} />
                        )}
                      </AnimatePresence>
                    </div>
                  )
                }

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'relative px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-gold-primary bg-gold-primary/8'
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-lg bg-gold-primary/8 border border-gold-primary/20"
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* ── Tablet Nav Links (md only — 4 key links) ── */}
            <div className="hidden md:flex lg:hidden items-center gap-0.5">
              {TABLET_LINKS.map((link) => {
                const isActive =
                  location.pathname === link.href ||
                  (link.href === '/services' && location.pathname.startsWith('/services'))
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      'px-3 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'text-gold-primary bg-gold-primary/8'
                        : 'text-white/75 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            {/* ── Right Side Controls ── */}
            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* Phone icon — mobile only */}
              <a
                href="tel:+18005550192"
                className="flex md:hidden items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-white/60 hover:text-gold-primary hover:bg-white/5 transition-all duration-200"
                aria-label="Call (800) 555-0192"
              >
                <Phone size={16} />
              </a>

              {/* Phone text — desktop only */}
              <a
                href="tel:+18005550192"
                className="hidden lg:flex items-center gap-2 text-white/50 hover:text-gold-primary transition-colors duration-200 font-body text-sm"
              >
                <Phone size={14} />
                <span className="font-medium">(800) 555-0192</span>
              </a>

              {/* Divider — desktop only */}
              <div className="hidden lg:block w-px h-5 bg-white/10" />

              {/* Auth / CTA — desktop */}
              {loggedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to={adminUser ? '/admin' : '/dashboard'}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-gold-primary/10 border border-gold-primary/25 text-gold-primary font-body font-semibold text-sm hover:bg-gold-primary/20 transition-all duration-200"
                  >
                    <LayoutDashboard size={14} />
                    <span className="hidden lg:inline">
                      {adminUser ? 'Admin Panel' : (user?.name?.split(' ')[0] || 'Dashboard')}
                    </span>
                    <span className="lg:hidden">{adminUser ? 'Admin' : 'Portal'}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center w-8 h-8 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200"
                    aria-label="Sign out"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3.5 py-2 rounded-lg font-body font-semibold text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-1.5 rounded-pill bg-gold-gradient font-heading font-bold text-white shadow-gold-sm hover:shadow-gold-md transition-all duration-200 overflow-hidden px-3.5 py-2 text-xs lg:px-5 lg:py-2.5 lg:text-sm lg:gap-2"
                  >
                    <UserPlus size={12} className="lg:hidden" />
                    <span className="lg:hidden">Register</span>
                    <span className="hidden lg:inline">Get Started</span>
                    <ArrowRight size={14} className="hidden lg:inline" />
                  </Link>
                </div>
              )}

              {/* Hamburger — mobile and tablet (hidden on desktop) */}
              <button
                ref={hamburgerRef}
                onClick={toggleMobileMenu}
                className={cn(
                  'lg:hidden relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-all duration-200',
                  mobileMenuOpen
                    ? 'bg-gold-primary/15 text-gold-primary'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                )}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="open"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </motion.div>
      </header>

      {/* ── Mobile / Tablet Drawer ─────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={closeMobileMenu}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              role="dialog"
              aria-label="Navigation menu"
              aria-modal="true"
              className="fixed inset-y-0 right-0 w-[min(300px,88vw)] bg-[#0d0d0d] border-l border-gold-primary/15 z-50 flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 sm:px-5 py-4 border-b border-white/5">
                <LogoMark />
                <button
                  onClick={closeMobileMenu}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
                  aria-label="Close navigation menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-4 px-2 sm:px-3">
                <p className="px-3 mb-2 text-[10px] font-body font-semibold tracking-widest uppercase text-white/25">
                  Navigation
                </p>

                {NAV_WITH_DROPDOWN.map((link, index) => {
                  const isActive =
                    location.pathname === link.href ||
                    (link.href === '/services' && location.pathname.startsWith('/services'))

                  if (link.hasDropdown) {
                    return (
                      <div key={link.href}>
                        <button
                          ref={index === 0 ? (firstLinkRef as unknown as React.RefObject<HTMLButtonElement>) : undefined}
                          onClick={() => setMobileServicesOpen((v) => !v)}
                          className={cn(
                            'w-full flex items-center justify-between px-3 py-3 rounded-lg font-body font-medium text-sm transition-all duration-150',
                            isActive || mobileServicesOpen
                              ? 'text-gold-primary bg-gold-primary/8'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          )}
                        >
                          {link.label}
                          <motion.span animate={{ rotate: mobileServicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={14} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {mobileServicesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-3 mt-1 mb-1 pl-3 border-l border-gold-primary/20 space-y-1">
                                {SERVICES_DROPDOWN.map((item) => (
                                  <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-white/5 transition-colors"
                                  >
                                    <item.icon size={14} className="text-gold-primary flex-shrink-0" />
                                    <div>
                                      <p className="font-body text-white/80 text-sm font-medium leading-none">{item.label}</p>
                                      <p className="font-body text-white/30 text-[11px] mt-0.5">{item.desc}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={link.href}
                      ref={index === 0 ? firstLinkRef : undefined}
                      to={link.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        'flex items-center px-3 py-3 rounded-lg font-body font-medium text-sm transition-all duration-150',
                        isActive
                          ? 'text-gold-primary bg-gold-primary/8'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {link.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-primary" />
                      )}
                    </Link>
                  )
                })}
              </div>

              {/* Drawer footer actions */}
              <div className="px-3 sm:px-4 py-4 sm:py-5 border-t border-white/5 space-y-3">
                <a
                  href="tel:+18005550192"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-gold-primary/25 text-gold-primary font-body font-semibold text-sm hover:bg-gold-primary/8 transition-colors duration-150"
                >
                  <Phone size={14} />
                  (800) 555-0192
                </a>
                {loggedIn ? (
                  <>
                    <Link
                      to={adminUser ? '/admin' : '/dashboard'}
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-pill bg-gold-gradient text-white font-heading font-bold text-sm shadow-gold-sm"
                    >
                      <LayoutDashboard size={14} />
                      {adminUser ? 'Admin Panel' : 'My Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-white/10 text-white/50 hover:text-white font-body font-semibold text-sm transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-pill bg-gold-gradient text-white font-heading font-bold text-sm shadow-gold-sm"
                    >
                      Get Started <ArrowRight size={14} />
                    </Link>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-white/10 text-white/50 hover:text-white font-body font-semibold text-sm transition-colors"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>

              <div className="px-4 pb-5">
                <p className="text-white/20 text-[10px] font-body text-center">
                  © 2026 Proximity Credit Repair
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
