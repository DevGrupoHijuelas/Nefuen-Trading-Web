import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n/LanguageContext'

interface NavbarProps {
  visible?: boolean
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
        <Link to="/aboutus">{t('nav.nosotros')}</Link>
        <Link to="/products">{t('nav.productos')}</Link>
        <Link to="/contact">{t('nav.contacto')}</Link>
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        >
          {lang === 'en' ? 'EN' : 'ES'}
        </button>
      </div>
    </nav>
  )
}
