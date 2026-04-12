import { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { ToastContainer, BackToTopButton, LoadingScreen } from '@components/ui'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function AppLayout() {
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
      <Suspense fallback={<LoadingScreen />}>
        <Outlet />
      </Suspense>
      <Footer />
      <ToastContainer />
      <BackToTopButton />
    </>
  )
}
