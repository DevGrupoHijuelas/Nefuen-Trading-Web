import Navbar from '../components/Navbar'
import { useTranslation } from '../i18n/LanguageContext'

export default function Products() {
  const { t } = useTranslation()

  return (
    <div className="page-container">
      <Navbar />
      <main className="page-content">
        <p className="page-label">{t('nav.productos')}</p>
        <h1 className="page-title">{t('products.subtitle')}</h1>
        <p className="page-body">{t('products.body')}</p>
      </main>
    </div>
  )
}
