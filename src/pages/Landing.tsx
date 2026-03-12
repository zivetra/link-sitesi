import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FaLink, FaStar, FaBolt, FaShieldAlt } from 'react-icons/fa'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaLink className="w-5 h-5 text-gray-900" />
            <span className="text-lg font-semibold text-gray-900">LinkHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Giriş Yap</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gray-900 hover:bg-gray-800">Ücretsiz Başla</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm">
            <FaStar className="w-3.5 h-3.5" />
            Ücretsiz ve Sınırsız
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            Tüm linklerinizi<br />
            <span className="text-gray-500">tek bir yerde</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sosyal medya hesaplarınızı, web sitelerinizi ve önemli linklerinizi 
            tek bir minimal sayfada toplayın.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Link to="/register">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 px-8">
                Hemen Başla
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8">
                Demo Görüntüle
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 pt-2">
            Kayıt olmak ücretsiz • Kredi kartı gerektirmez
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FaBolt className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900">Hızlı Kurulum</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              30 saniyede hesap oluşturun ve linklerinizi eklemeye başlayın
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FaLink className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900">Sınırsız Link</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              İstediğiniz kadar sosyal medya ve web sitesi linki ekleyin
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <FaShieldAlt className="w-5 h-5 text-gray-900" />
            </div>
            <h3 className="font-semibold text-gray-900">Minimal Tasarım</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Sade ve profesyonel görünüm ile takipçilerinizi etkileyin
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 max-w-4xl">
        <div className="bg-gray-900 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hemen başlamaya hazır mısınız?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Ücretsiz hesap oluşturun ve linklerinizi paylaşmaya başlayın
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="px-8 bg-white text-gray-900 hover:bg-gray-100">
              Ücretsiz Hesap Oluştur
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm max-w-6xl">
          <p>© 2026 LinkHub. Tüm hakları saklıdır.</p>
          <p className="mt-1">Plato Meslek Yüksekokulu - AI-Driven Product Design & Development</p>
        </div>
      </footer>
    </div>
  )
}
