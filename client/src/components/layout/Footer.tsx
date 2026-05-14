import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import { navLinks, footerServiceLinks } from '@config/navigation'
import { siteConfig } from '@config/site'
import { SectionDivider } from '@components/ui'
import ProximityLogo from '@common/ProximityLogo'

const socialLinks = [
  { icon: Facebook, label: 'Facebook', href: siteConfig.social.facebook },
  { icon: Instagram, label: 'Instagram', href: siteConfig.social.instagram },
  { icon: Twitter, label: 'Twitter / X', href: siteConfig.social.twitter },
  { icon: Linkedin, label: 'LinkedIn', href: siteConfig.social.linkedin },
].filter((s) => s.href)

export default function Footer() {
  return (
    <footer className="bg-near-black text-white">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="flex-shrink-0 group-hover:drop-shadow-[0_0_10px_rgba(184,146,74,0.55)] transition-all duration-300">
                <ProximityLogo size={44} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-extrabold text-xl gold-gradient-text tracking-tight">
                  Proximity
                </span>
                <span className="font-body text-white/40 text-[10px] tracking-widest uppercase mt-1">
                  Credit Repair
                </span>
              </div>
            </Link>
            <p className="text-muted-text-dark font-body text-caption leading-relaxed mb-6">
              Rebuilding credit. Rebuilding lives.
            </p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Proximity Credit Repair on ${label}`}
                    whileHover={{ scale: 1.15 }}
                    className="text-white/40 hover:text-gold-primary transition-colors duration-200"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-gold-primary font-heading font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white text-caption font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold-primary font-heading font-bold mb-4">Our Services</h3>
            <ul className="space-y-3">
              {footerServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white text-caption font-body transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold-primary font-heading font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="text-gold-primary w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <a
                  href={siteConfig.phoneHref}
                  className="text-white/60 hover:text-white text-caption font-body transition-colors duration-200"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start">
                <Mail className="text-gold-primary w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/60 hover:text-white text-caption font-body transition-colors duration-200"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="text-gold-primary w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-caption font-body">
                  {siteConfig.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 mb-6">
          <SectionDivider />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 pt-6">
          <p className="text-muted-text-dark text-caption">
            © {new Date().getFullYear()} Proximity Credit Repair. All rights reserved.
          </p>
          <p className="text-muted-text-dark text-label italic">
            Results may vary. We do not guarantee specific credit score improvements.
          </p>
        </div>
      </div>
    </footer>
  )
}
