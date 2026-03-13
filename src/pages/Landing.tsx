import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FaStar, FaBolt, FaLink, FaShieldAlt, FaArrowRight, FaCheck, FaInstagram, FaTwitter, FaGithub, FaLinkedin, FaYoutube, FaTiktok, FaSpotify, FaTwitch } from 'react-icons/fa'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'
import Navbar from '@/components/Navbar'

export default function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedShaderBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-10 relative">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-600/10 backdrop-blur-sm border border-white/20 px-5 py-2.5 rounded-full shadow-lg shadow-purple-500/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
              <span className="text-sm text-white/90 font-medium tracking-wide">Tamamen Ücretsiz • Sınırsız Link</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white leading-[0.95] tracking-tighter">
                Dijital Kimliğini
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Tek Linkle Yönet
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-white/60 max-w-4xl mx-auto leading-relaxed font-light">
                Sosyal medya hesaplarını, portfolyonu ve tüm önemli linklerini 
                tek bir şık sayfada topla. Profesyonel görün, kolayca paylaş.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-center justify-center gap-6 pt-6">
              <Link to="/register" className="w-full sm:w-auto">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-12 py-8 text-xl shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 transition-all duration-300 group rounded-2xl"
                >
                  Hemen Başla
                  <FaArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </Link>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/50">
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

            {/* Social Media Icons Showcase */}
            <div className="pt-16">
              <p className="text-white/40 text-sm font-medium mb-8 tracking-wider uppercase">Desteklenen Platformlar</p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { icon: FaInstagram, color: '#E4405F', name: 'Instagram' },
                  { icon: FaTwitter, color: '#1DA1F2', name: 'Twitter' },
                  { icon: FaGithub, color: '#ffffff', name: 'GitHub' },
                  { icon: FaLinkedin, color: '#0A66C2', name: 'LinkedIn' },
                  { icon: FaYoutube, color: '#FF0000', name: 'YouTube' },
                  { icon: FaTiktok, color: '#ffffff', name: 'TikTok' },
                  { icon: FaSpotify, color: '#1DB954', name: 'Spotify' },
                  { icon: FaTwitch, color: '#9146FF', name: 'Twitch' },
                ].map((platform, index) => (
                  <div
                    key={platform.name}
                    className="group relative"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div 
                      className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                      style={{ backgroundColor: platform.color }}
                    />
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110">
                      <platform.icon 
                        className="w-8 h-8 transition-transform duration-300" 
                        style={{ color: platform.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-white/30 text-xs mt-6">ve daha fazlası...</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Neden <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LinkHub</span>?
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Profesyonel dijital varlığını oluşturmak için ihtiyacın olan her şey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FaBolt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Hızlı Kurulum</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  30 saniyede hesap oluştur, linklerini ekle ve hemen paylaşmaya başla. Hiçbir teknik bilgi gerektirmez.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FaLink className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Sınırsız Link</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  İstediğin kadar sosyal medya, web sitesi ve özel link ekle. Hiçbir kısıtlama yok.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 hover:border-white/20 transition-all duration-300 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-pink-500/30 group-hover:scale-110 transition-transform duration-300">
                  <FaShieldAlt className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Premium Tasarım</h3>
                <p className="text-white/60 leading-relaxed text-lg">
                  Minimal ve profesyonel görünüm ile takipçilerini etkile. Mobil uyumlu tasarım.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-[3rem] blur-3xl animate-pulse" />
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-16 md:p-20 text-center overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-sm border border-yellow-500/30 px-5 py-2.5 rounded-full mb-8">
                  <FaStar className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-100 font-medium">Binlerce kullanıcı tarafından tercih ediliyor</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
                  Dijital varlığını<br />güçlendir
                </h2>
                <p className="text-2xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                  Ücretsiz hesap oluştur ve tüm linklerini tek bir yerde topla. Profesyonel görünüm için hazır.
                </p>
                <Link to="/register">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold px-14 py-9 text-xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 group rounded-2xl"
                  >
                    Ücretsiz Hesap Oluştur
                    <FaArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12 mt-20">
        <div className="container mx-auto px-6 text-center max-w-6xl">
          <p className="text-white/40 text-sm">© 2026 LinkHub. Tüm hakları saklıdır.</p>
          <p className="text-white/30 text-xs mt-2">Plato Meslek Yüksekokulu - AI-Driven Product Design & Development</p>
        </div>
      </footer>
    </div>
  )
}
