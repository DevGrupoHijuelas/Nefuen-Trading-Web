import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

interface NavbarProps {
  visible?: boolean
}

function AnimatedLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="nav-link-animated">
      <span className="nav-link-top">{children}</span>
      <span className="nav-link-bottom">{children}</span>
    </Link>
  )
}

export default function Navbar({ visible = true }: NavbarProps) {
  const { lang, setLang, t } = useTranslation()

  if (!visible) return null

  return (
    <nav className="navbar fade-in">
      <div className="logo">
        <Link to="/">
          <img src="/logo_notext.png" alt="Nefuen Trading" />
        </Link>
      </div>
      <div className="nav-links">
        <AnimatedLink to="/aboutus">{t('nav.nosotros')}</AnimatedLink>
        <AnimatedLink to="/products">{t('nav.productos')}</AnimatedLink>
        <AnimatedLink to="/contact">{t('nav.contacto')}</AnimatedLink>
        <button
          className="lang-slide-button"
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        >
          <span className="lang-slide-top">{lang === 'en' ? 'EN' : 'ES'}</span>
          <span className="lang-slide-bottom">{lang === 'en' ? 'EN' : 'ES'}</span>
        </button>
      </div>
    </nav>
  )
}
