import Navbar from '../components/Navbar'
import { useTranslation } from '../i18n/LanguageContext'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-content">
        <p className="page-label">{t('nav.contacto')}</p>
        <h1 className="page-title">{t('contact.subtitle')}</h1>
        <p className="page-body">{t('contact.body')}</p>
      </main>
    </div>
  )
}
