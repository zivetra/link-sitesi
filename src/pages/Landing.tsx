import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FaLink, FaStar, FaBolt, FaShieldAlt } from 'react-icons/fa'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

export default function Landing() {
  return (
    <div className="min-h-screen relative">
      <AnimatedShaderBackground />
      
      {/* Header */}
      <header className="border-b border-white/10 sticky top-0 z-50 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-6xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaLink className="w-5 h-5 text-white" />
            <span className="text-lg font-semibold text-white">LinkHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">Giriş Yap</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-white text-black hover:bg-white/90">Ücretsiz Başla</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm border border-white/20">
            <FaStar className="w-3.5 h-3.5" />
            Ücretsiz ve Sınırsız
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Tüm linklerinizi<br />
            <span className="text-white/60">tek bir yerde</span>
          </h1>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Sosyal medya hesaplarınızı, web sitelerinizi ve önemli linklerinizi 
            tek bir minimal sayfada toplayın.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <Link to="/register">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8">
                Hemen Başla
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="px-8 border-white/20 text-white hover:bg-white/10">
                Demo Görüntüle
              </Button>
            </Link>
          </div>

          <p className="text-sm text-white/60 pt-2">
            Kayıt olmak ücretsiz • Kredi kartı gerektirmez
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-16 max-w-5xl relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-3 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <FaBolt className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-white">Hızlı Kurulum</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              30 saniyede hesap oluşturun ve linklerinizi eklemeye başlayın
            </p>
          </div>

          <div className="text-center space-y-3 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <FaLink className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-white">Sınırsız Link</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              İstediğiniz kadar sosyal medya ve web sitesi linki ekleyin
            </p>
          </div>

          <div className="text-center space-y-3 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <FaShieldAlt className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-white">Minimal Tasarım</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Sade ve profesyonel görünüm ile takipçilerinizi etkileyin
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24 max-w-4xl relative z-10">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Hemen başlamaya hazır mısınız?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Ücretsiz hesap oluşturun ve linklerinizi paylaşmaya başlayın
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8 bg-white text-black hover:bg-white/90">
              Ücretsiz Hesap Oluştur
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-16 relative z-10">
        <div className="container mx-auto px-6 text-center text-white/60 text-sm max-w-6xl">
          <p>© 2026 LinkHub. Tüm hakları saklıdır.</p>
          <p className="mt-1">Plato Meslek Yüksekokulu - AI-Driven Product Design & Development</p>
        </div>
      </footer>
    </div>
  )
}
