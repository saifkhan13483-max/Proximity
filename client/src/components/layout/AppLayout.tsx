import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer, BackToTopButton, LoadingScreen } from '@components/ui'
import AIChatWidget from '@common/AIChatWidget'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function AppLayout() {
  const location = useLocation()

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to main content
      </a>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </motion.div>
      </AnimatePresence>
      <Footer />
      <ToastContainer />
      <BackToTopButton />
      <AIChatWidget />
    </>
  )
}
