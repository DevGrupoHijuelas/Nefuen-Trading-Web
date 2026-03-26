import Navbar from '../components/Navbar'
import { useTranslation } from '../i18n/LanguageContext'

export default function AboutUs() {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-content">
        <p className="page-label">{t('nav.nosotros')}</p>
        <h1 className="page-title">{t('aboutus.subtitle')}</h1>
        <p className="page-body">{t('aboutus.body')}</p>
      </main>
    </div>
  )
}
