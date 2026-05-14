import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import AppLayout from '@components/layout/AppLayout'
import NotFound from '@pages/NotFound'
import ProtectedRoute from '@components/guards/ProtectedRoute'
import AdminRoute from '@components/guards/AdminRoute'
import LoadingScreen from '@components/ui/LoadingScreen'

const Home = lazy(() => import('@pages/Home'))
const About = lazy(() => import('@pages/About'))
const Services = lazy(() => import('@pages/Services'))
const Pricing = lazy(() => import('@pages/Pricing'))
const HowItWorks = lazy(() => import('@pages/HowItWorks'))
const Testimonials = lazy(() => import('@pages/Testimonials'))
const FAQ = lazy(() => import('@pages/FAQ'))
const Contact = lazy(() => import('@pages/Contact'))
const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
const Dashboard = lazy(() => import('@pages/Dashboard'))
const AdminLogin = lazy(() => import('@pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('@pages/admin/AdminDashboard'))
const AdminUsers = lazy(() => import('@pages/admin/AdminUsers'))
const AdminContacts = lazy(() => import('@pages/admin/AdminContacts'))
const AdminServices = lazy(() => import('@pages/admin/AdminServices'))
const CreditReviewer = lazy(() => import('@pages/CreditReviewer'))
const DisputeLetterGenerator = lazy(() => import('@pages/DisputeLetterGenerator'))
const DisputeAutopilot = lazy(() => import('@pages/DisputeAutopilot'))

function Wrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingScreen />}>{children}</Suspense>
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/services', element: <Services /> },
      { path: '/pricing', element: <Pricing /> },
      { path: '/how-it-works', element: <HowItWorks /> },
      { path: '/testimonials', element: <Testimonials /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/contact', element: <Contact /> },
      { path: '/ai-credit-reviewer', element: <Wrap><CreditReviewer /></Wrap> },
      { path: '/dispute-letter-generator', element: <Wrap><DisputeLetterGenerator /></Wrap> },
      { path: '/ai-dispute-autopilot', element: <Wrap><DisputeAutopilot /></Wrap> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/login',
    element: <Wrap><Login /></Wrap>,
  },
  {
    path: '/register',
    element: <Wrap><Register /></Wrap>,
  },
  {
    path: '/dashboard',
    element: <Wrap><ProtectedRoute><Dashboard /></ProtectedRoute></Wrap>,
  },
  {
    path: '/admin/login',
    element: <Wrap><AdminLogin /></Wrap>,
  },
  {
    path: '/admin',
    element: <Wrap><AdminRoute><AdminDashboard /></AdminRoute></Wrap>,
  },
  {
    path: '/admin/users',
    element: <Wrap><AdminRoute><AdminUsers /></AdminRoute></Wrap>,
  },
  {
    path: '/admin/contacts',
    element: <Wrap><AdminRoute><AdminContacts /></AdminRoute></Wrap>,
  },
  {
    path: '/admin/services',
    element: <Wrap><AdminRoute><AdminServices /></AdminRoute></Wrap>,
  },
  {
    path: '/admin/*',
    element: <Navigate to="/admin" replace />,
  },
])

export default function App() {
  return <RouterProvider router={router} future={{ v7_startTransition: true }} />
}
