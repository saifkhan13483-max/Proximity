import { Link } from 'react-router-dom'
import { Button } from '@components/ui'
import SEOHead from '@components/layout/SEOHead'

export default function NotFound() {
  return (
    <>
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="bg-near-black min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="gold-gradient-text font-heading font-black text-h1 leading-none mb-4">404</p>
        <h1 className="font-heading font-bold text-h3 text-white mb-3">Page Not Found</h1>
        <p className="text-muted-text text-body-base mb-8 max-w-md">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="primary" size="lg">Back to Home</Button>
        </Link>
      </div>
    </>
  )
}
