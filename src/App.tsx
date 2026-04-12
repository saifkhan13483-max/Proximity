import { lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from '@components/layout/AppLayout'
import NotFound from '@pages/NotFound'

const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Services = lazy(() => import('@pages/Services'))
const HowItWorks = lazy(() => import('@pages/HowItWorks'))
const Testimonials = lazy(() => import('@pages/Testimonials'))
const FAQ = lazy(() => import('@pages/FAQ'))
const Contact = lazy(() => import('@pages/Contact'))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/how-it-works', element: <HowItWorks /> },
      { path: '/testimonials', element: <Testimonials /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
