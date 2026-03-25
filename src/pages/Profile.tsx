import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaLink, FaExternalLinkAlt, FaVolumeUp, FaVolumeMute, FaQrcode, FaShare, FaTimes } from 'react-icons/fa'
import { getAllUsers, getUserLinks, getProfile } from '@/utils/storage'
import { incrementLinkClicks } from '@/utils/jsonStorage'
import { getPlatformIcon } from '@/utils/platforms'
import type { User, Profile as ProfileType, Link as LinkType } from '@/types'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'
import { QRCodeSVG } from 'qrcode.react'

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false)
  const [showQRCode, setShowQRCode] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)



  useEffect(() => {
    loadProfile()
  }, [username])

  useEffect(() => {
    // Müzik varsa otomatik çal
    if (profile?.backgroundMusic && audioRef.current) {
      console.log('Müzik bulundu, çalmaya çalışılıyor...')
      console.log('Müzik uzunluğu:', profile.backgroundMusic.length)
      
      // Küçük bir gecikme ekle
      const timer = setTimeout(() => {
        audioRef.current?.play()
          .then(() => {
            console.log('Müzik başarıyla çalıyor')
            setIsMusicPlaying(true)
          })
          .catch((error) => {
            console.log('Otomatik çalma engellendi:', error)
            console.log('Kullanıcı butona tıklayarak müziği başlatabilir')
            // Tarayıcı otomatik çalmayı engelleyebilir
            setIsMusicPlaying(false)
          })
      }, 500)
      
      return () => clearTimeout(timer)
    } else {
      console.log('Müzik bulunamadı')
      console.log('Profile:', profile)
      console.log('backgroundMusic:', profile?.backgroundMusic ? 'var' : 'yok')
    }
  }, [profile?.backgroundMusic])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
        setIsMusicPlaying(false)
        console.log('Müzik durduruldu')
      } else {
        audioRef.current.play()
          .then(() => {
            setIsMusicPlaying(true)
            console.log('Müzik çalıyor')
          })
          .catch((error) => {
            console.error('Müzik çalma hatası:', error)
            alert('Müzik çalınamadı. Lütfen tarayıcı ayarlarınızı kontrol edin.')
          })
      }
    } else {
      console.error('Audio ref bulunamadı')
    }
  }

  const loadProfile = async () => {
    if (!username) {
      setLoading(false)
      return
    }

    // Kullanıcıyı bul
    const users = await getAllUsers()
    const foundUser = users.find(u => u.username === username)

    if (!foundUser) {
      setLoading(false)
      return
    }

    setUser(foundUser)

    // Profil bilgilerini al
    const userProfile = await getProfile(foundUser.id)
    setProfile(userProfile)

    // Aktif linkleri al
    const userLinks = await getUserLinks(foundUser.id)
    setLinks(userLinks.filter(link => link.isActive))
    setLinks(userLinks)

    setLoading(false)
  }

  const handleLinkClick = async (linkId: string) => {
    // Tıklama sayısını artır
    await incrementLinkClicks(linkId)
  }

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/${username}`
    
    // Web Share API destekleniyor mu kontrol et
    if (navigator.share) {
      try {
        await navigator.share({
          title: `@${username} - LinkHub`,
          text: `${profile?.bio || `@${username}'in LinkHub profili`}`,
          url: profileUrl
        })
      } catch (error) {
        // Kullanıcı paylaşımı iptal etti veya hata oluştu
        if ((error as Error).name !== 'AbortError') {
          copyToClipboard(profileUrl)
        }
      }
    } else {
      // Web Share API desteklenmiyor, URL'yi kopyala
      copyToClipboard(profileUrl)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Profil linki kopyalandı!')
      })
      .catch(() => {
        alert('Kopyalama başarısız oldu')
      })
  }

  const downloadQRCode = () => {
    const svg = document.getElementById('qr-code-svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')

      const downloadLink = document.createElement('a')
      downloadLink.download = `${username}-qrcode.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)))
  }

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <AnimatedShaderBackground />
        <p className="text-white/70 relative z-10">Yükleniyor...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen relative flex items-center justify-center p-4">
        <AnimatedShaderBackground />
        <div className="text-center max-w-md relative z-10">
          <FaLink className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Kullanıcı Bulunamadı
          </h1>
          <p className="text-white/70 mb-6">
            @{username} kullanıcı adına sahip bir profil bulunamadı
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Profile customization settings
  const layout = profile?.layout || 'minimal'
  const backgroundType = profile?.backgroundType || 'animated'
  const backgroundColor = profile?.backgroundColor || '#030014'
  const backgroundImage = profile?.backgroundImage || ''
  const backgroundGif = profile?.backgroundGif || ''
  const buttonStyle = profile?.buttonStyle || 'fill'
  const buttonColor = profile?.buttonColor || '#6366f1'
  const buttonTextColor = profile?.buttonTextColor || 'auto'
  const cornerRadius = profile?.cornerRadius || 'medium'
  const fontStyle = profile?.fontStyle || 'sans'
  const theme = profile?.theme || 'dark'

  // Renk parlaklığını hesapla
  const getColorBrightness = (hexColor: string): number => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    return (r * 299 + g * 587 + b * 114) / 1000
  }

  // Otomatik yazı rengi belirleme
  const getAutoTextColor = (bgColor: string): string => {
    const brightness = getColorBrightness(bgColor)
    return brightness > 128 ? '#000000' : '#ffffff'
  }

  // Yazı rengini al
  const getTextColor = (): string => {
    if (buttonTextColor === 'auto') {
      return getAutoTextColor(buttonColor)
    }
    return buttonTextColor
  }

  // Debug: Profil verisini kontrol et
  console.log('RAW Profile Object:', profile)
  console.log('Profile Data:', {
    backgroundType,
    backgroundGif: backgroundGif ? 'GIF var (length: ' + backgroundGif.length + ')' : 'GIF yok',
    hasGif: !!backgroundGif,
    profileBackgroundType: profile?.backgroundType,
    profileBackgroundGif: profile?.backgroundGif ? 'var' : 'yok'
  })

  // Corner radius classes
  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-lg',
    full: 'rounded-full'
  }

  // Font family classes
  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }

  // Theme colors
  const themeColors = {
    light: {
      bg: 'bg-gray-50',
      text: 'text-gray-900',
      textMuted: 'text-gray-600',
      card: 'bg-white border-gray-200',
      cardHover: 'hover:bg-gray-50'
    },
    dark: {
      bg: 'bg-gray-900',
      text: 'text-white',
      textMuted: 'text-white/70',
      card: 'bg-white/5 border-white/10',
      cardHover: 'hover:bg-white/10'
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-900 to-indigo-900',
      text: 'text-white',
      textMuted: 'text-purple-200',
      card: 'bg-white/10 border-purple-500/20',
      cardHover: 'hover:bg-white/15'
    }
  }

  const currentTheme = themeColors[theme]

  // Button style classes
  const getButtonClasses = () => {
    const baseClasses = `w-full transition-all ${radiusClasses[cornerRadius]}`
    
    switch (buttonStyle) {
      case 'fill':
        return `${baseClasses} text-white shadow-lg border-0`
      case 'outline':
        return `${baseClasses} bg-transparent border-2`
      case 'shadow':
        return `${baseClasses} text-white shadow-2xl border-0`
      case 'gradient':
        return `${baseClasses} text-white border-0`
      case 'glass':
        return `${baseClasses} text-white border-2 backdrop-blur-md`
      case 'neon':
        return `${baseClasses} text-white border-0`
      default:
        return baseClasses
    }
  }

  // Button inline styles
  const getButtonStyle = () => {
    const textColor = getTextColor()
    
    switch (buttonStyle) {
      case 'fill':
        return { backgroundColor: buttonColor, borderColor: 'transparent', color: textColor }
      case 'outline':
        return { 
          backgroundColor: 'transparent', 
          borderColor: buttonColor, 
          color: buttonColor 
        }
      case 'shadow':
        return { 
          backgroundColor: buttonColor, 
          borderColor: 'transparent',
          color: textColor,
          boxShadow: `0 20px 25px -5px ${buttonColor}40, 0 10px 10px -5px ${buttonColor}40`
        }
      case 'gradient':
        return {
          background: `linear-gradient(to right, ${buttonColor}, ${buttonColor}dd)`,
          borderColor: 'transparent',
          color: textColor
        }
      case 'glass':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          color: 'white'
        }
      case 'neon':
        return {
          backgroundColor: buttonColor,
          borderColor: 'transparent',
          color: textColor,
          boxShadow: `0 0 20px ${buttonColor}cc, 0 0 40px ${buttonColor}66`
        }
      default:
        return {}
    }
  }

  // Background rendering
  const renderBackground = () => {
    console.log('renderBackground çağrıldı, backgroundType:', backgroundType)
    
    switch (backgroundType) {
      case 'solid':
        console.log('Solid arka plan, renk:', backgroundColor)
        return <div className="fixed inset-0" style={{ backgroundColor }} />
      
      case 'gradient':
        console.log('Gradient arka plan, tema:', theme)
        // Tema bazlı gradyan
        if (theme === 'light') {
          return <div className="fixed inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50" />
        } else if (theme === 'purple') {
          return <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900" />
        } else {
          return <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
        }
      
      case 'image':
        console.log('Image arka plan, var mı:', !!backgroundImage)
        return backgroundImage ? (
          <div className="fixed inset-0">
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : <AnimatedShaderBackground />
      
      case 'gif':
        console.log('GIF arka plan, var mı:', !!backgroundGif, 'uzunluk:', backgroundGif?.length)
        if (backgroundGif) {
          return (
            <div className="fixed inset-0">
              <img 
                src={backgroundGif} 
                alt="Background GIF" 
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          )
        } else {
          console.log('GIF yok, AnimatedShaderBackground gösteriliyor')
          return <AnimatedShaderBackground />
        }
      
      case 'animated':
      default:
        console.log('Animated arka plan')
        // Animasyonlu shader arka plan
        return (
          <div className="fixed inset-0">
            <AnimatedShaderBackground />
            {/* Üzerine hafif bir overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
          </div>
        )
    }
  }

  return (
    <div className={`min-h-screen relative ${fontClasses[fontStyle]}`}>
      {renderBackground()}
      
      {/* Background Music */}
      {profile?.backgroundMusic && (
        <>
          <audio 
            ref={audioRef} 
            src={profile.backgroundMusic} 
            loop 
            preload="auto"
            onError={(e) => console.error('Audio yükleme hatası:', e)}
            onLoadedData={() => console.log('Audio yüklendi')}
            onPlay={() => console.log('Audio play event')}
            onPause={() => console.log('Audio pause event')}
          />
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform backdrop-blur-md border-2 border-white/20"
            aria-label={isMusicPlaying ? 'Müziği durdur' : 'Müziği çal'}
          >
            {isMusicPlaying ? (
              <FaVolumeUp className="w-6 h-6 text-white" />
            ) : (
              <FaVolumeMute className="w-6 h-6 text-white" />
            )}
          </button>
        </>
      )}
      
      {/* Header */}
      <header className={`border-b backdrop-blur-sm sticky top-0 z-50 ${theme === 'light' ? 'bg-white/80 border-gray-200' : 'bg-black/50 border-white/10'}`}>
        <div className="container mx-auto px-6 py-4 max-w-2xl">
          <Link to="/" className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${currentTheme.text}`}>
            <FaLink className="w-5 h-5" />
            <span className="text-lg font-semibold">LinkHub</span>
          </Link>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-6 py-12 max-w-2xl relative z-10">
        {/* Profile Header */}
        <div className={`text-center mb-8 ${layout === 'minimal' ? 'mb-12' : ''}`}>
          {/* Avatar */}
          <div className={`w-32 h-32 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-4 border-white/20 overflow-hidden ${layout === 'minimal' ? 'rounded-full' : radiusClasses[cornerRadius]}`}>
            {profile?.avatar ? (
              <img 
                src={profile.avatar} 
                alt={user.username} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Username */}
          <h1 className={`text-2xl font-bold mb-2 ${currentTheme.text}`}>
            @{user.username}
          </h1>

          {/* Bio */}
          {profile?.bio && (
            <p className={`max-w-md mx-auto ${currentTheme.textMuted}`}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className={`space-y-3 ${layout === 'card' ? 'grid grid-cols-2 gap-3' : layout === 'elite' ? 'grid grid-cols-1 gap-3' : ''}`}>
          {links.length === 0 ? (
            <Card className={`${currentTheme.card} backdrop-blur-xl`}>
              <CardContent className="pt-12 pb-12 text-center">
                <FaLink className="w-12 h-12 mx-auto mb-4 text-white/30" />
                <p className={currentTheme.textMuted}>Henüz link eklenmemiş</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link) => {
              const IconComponent = getPlatformIcon(link.icon)
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  onClick={() => handleLinkClick(link.id)}
                >
                  <div
                    className={`${getButtonClasses()} backdrop-blur-xl p-4 transition-all hover:scale-[1.02] ${layout === 'elite' ? 'relative overflow-hidden' : ''}`}
                    style={getButtonStyle()}
                  >
                    {layout === 'elite' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                    )}
                    <div className={`flex items-center ${layout === 'card' ? 'flex-col text-center' : layout === 'elite' ? 'justify-between' : 'justify-between'} gap-3 ${layout === 'elite' ? 'relative z-10' : ''}`}>
                      <div className={`flex items-center gap-3 ${layout === 'card' ? 'flex-col' : 'flex-1 min-w-0'}`}>
                        <IconComponent 
                          className={`${layout === 'card' ? 'w-8 h-8' : layout === 'elite' ? 'w-6 h-6' : 'w-6 h-6'} flex-shrink-0`}
                          style={{ color: buttonStyle === 'outline' ? buttonColor : getTextColor() }}
                        />
                        <div className={`${layout === 'card' ? 'text-center' : 'flex-1 min-w-0'}`}>
                          <p className={`${layout === 'elite' ? 'text-base font-semibold' : 'font-semibold'} truncate`} style={{ color: buttonStyle === 'outline' ? buttonColor : getTextColor() }}>
                            {link.platformName}
                          </p>
                          {layout !== 'card' && layout !== 'elite' && (
                            <p className={`text-sm truncate`} style={{ color: buttonStyle === 'outline' ? buttonColor : getTextColor(), opacity: buttonStyle === 'outline' ? 0.7 : 0.7 }}>
                              {link.url}
                            </p>
                          )}
                        </div>
                      </div>
                      {layout === 'elite' ? (
                        <div className="text-sm opacity-70" style={{ color: buttonStyle === 'outline' ? buttonColor : getTextColor() }}>
                          →
                        </div>
                      ) : layout !== 'card' && (
                        <FaExternalLinkAlt 
                          className={`w-5 h-5 flex-shrink-0 ml-4 transition-colors group-hover:opacity-100`}
                          style={{ color: buttonStyle === 'outline' ? buttonColor : getTextColor(), opacity: 0.7 }}
                        />
                      )}
                    </div>
                  </div>
                </a>
              )
            })
          )}
        </div>

        {/* Share & QR Code Buttons */}
        <div className="flex gap-3 mt-8 justify-center">
          <Button
            onClick={handleShare}
            className={`${radiusClasses[cornerRadius]} gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white`}
          >
            <FaShare className="w-4 h-4" />
            Profili Paylaş
          </Button>
          <Button
            onClick={() => setShowQRCode(true)}
            className={`${radiusClasses[cornerRadius]} gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white`}
          >
            <FaQrcode className="w-4 h-4" />
            QR Kod
          </Button>
        </div>

        {/* QR Code Modal */}
        {showQRCode && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setShowQRCode(false)}>
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full relative" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setShowQRCode(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="w-6 h-6" />
              </button>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  QR Kod
                </h3>
                <p className="text-gray-600 mb-6">
                  @{username}
                </p>
                
                <div className="bg-white p-6 rounded-xl inline-block mb-6">
                  <QRCodeSVG
                    id="qr-code-svg"
                    value={`${window.location.origin}/${username}`}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <p className="text-sm text-gray-500 mb-4">
                  Bu QR kodu tarayarak profiline ulaşabilirler
                </p>
                
                <Button
                  onClick={downloadQRCode}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  QR Kodu İndir
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className={`text-center mt-12 pt-8 ${theme === 'light' ? 'border-t border-gray-200' : 'border-t border-white/10'}`}>
          <p className={`text-sm mb-2 ${currentTheme.textMuted}`}>
            Kendi link sayfanı oluştur
          </p>
          <Link to="/register">
            <Button className={`${radiusClasses[cornerRadius]} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white`}>
              Ücretsiz Başla
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
