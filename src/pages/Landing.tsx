import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FaStar, FaBolt, FaLink, FaShieldAlt, FaArrowRight, FaCheck } from 'react-icons/fa'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'
import Navbar from '@/components/Navbar'

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedShaderBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-white/90 font-medium">Tamamen Ücretsiz • Sınırsız Link</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] tracking-tight">
                Dijital Kimliğini
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Tek Linkle Yönet
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed font-light">
                Sosyal medya hesaplarını, portfolyonu ve tüm önemli linklerini 
                tek bir şık sayfada topla. Profesyonel görün, kolayca paylaş.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-8 py-6 text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all group"
                >
                  Hemen Başla
                  <FaArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full sm:w-auto border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30 font-semibold px-8 py-6 text-lg transition-all"
                >
                  Demo Görüntüle
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-400" />
                <span>Kredi kartı gerektirmez</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-400" />
                <span>30 saniyede kurulum</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="w-4 h-4 text-green-400" />
                <span>Sınırsız link</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                  <FaBolt className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Hızlı Kurulum</h3>
                <p className="text-white/70 leading-relaxed">
                  30 saniyede hesap oluştur, linklerini ekle ve hemen paylaşmaya başla. Hiçbir teknik bilgi gerektirmez.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                  <FaLink className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Sınırsız Link</h3>
                <p className="text-white/70 leading-relaxed">
                  İstediğin kadar sosyal medya, web sitesi ve özel link ekle. Hiçbir kısıtlama yok.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-pink-500/30">
                  <FaShieldAlt className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Premium Tasarım</h3>
                <p className="text-white/70 leading-relaxed">
                  Minimal ve profesyonel görünüm ile takipçilerini etkile. Mobil uyumlu tasarım.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 md:p-16 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
                <FaStar className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white/90 font-medium">Binlerce kullanıcı tarafından tercih ediliyor</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Dijital varlığını güçlendir
              </h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Ücretsiz hesap oluştur ve tüm linklerini tek bir yerde topla. Profesyonel görünüm için hazır.
              </p>
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-10 py-7 text-lg shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all group"
                >
                  Ücretsiz Hesap Oluştur
                  <FaArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <p className="text-white/50 text-sm">© 2026 LinkHub. Tüm hakları saklıdır.</p>
          <p className="text-white/40 text-xs mt-2">Plato Meslek Yüksekokulu - AI-Driven Product Design & Development</p>
        </div>
      </footer>
    </div>
  )
}
