import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@config/navigation'
import { useScrollPosition } from '@hooks/useScrollPosition'
import { Button } from '@components/ui'
import { cn } from '@lib/utils'

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { isScrolled } = useScrollPosition()
  const location = useLocation()

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'backdrop-blur-md bg-near-black/80 border-b border-gold-primary/10'
          : 'bg-transparent'
      )}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="container mx-auto flex items-center justify-between h-20"
      >
        <Link to="/" className="flex flex-col leading-tight">
          <span className="font-heading font-extrabold text-xl gold-gradient-text">Proximity</span>
          <span className="font-body text-white text-xs">Credit Repair</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'font-body text-sm font-medium transition-colors duration-200 relative pb-1',
                  isActive
                    ? 'text-gold-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gold-primary'
                    : 'text-white/80 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden lg:block">
          <Button variant="primary" size="md" href="/contact">
            Get Free Consultation
          </Button>
        </div>

        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className="lg:hidden text-white p-2"
          aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={drawerOpen}
        >
          {drawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeDrawer}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-64 bg-near-black z-50 flex flex-col p-6 lg:hidden"
            >
              <button
                onClick={closeDrawer}
                className="self-end text-white mb-6"
                aria-label="Close navigation menu"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col gap-4 flex-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={closeDrawer}
                      className={cn(
                        'font-body font-medium py-2 transition-colors duration-200',
                        isActive ? 'text-gold-primary' : 'text-white/80 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>
              <Button variant="primary" size="md" href="/contact" className="w-full text-center mt-4">
                Get Free Consultation
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
