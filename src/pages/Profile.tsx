import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaLink, FaExternalLinkAlt } from 'react-icons/fa'
import { getAllUsers, getUserLinks, getProfile } from '@/utils/storage'
import { getPlatformIcon } from '@/utils/platforms'
import type { User, Profile as ProfileType, Link as LinkType } from '@/types'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<ProfileType | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState<boolean>(true)



  useEffect(() => {
    loadProfile()
  }, [username])

  const loadProfile = () => {
    if (!username) {
      setLoading(false)
      return
    }

    // Kullanıcıyı bul
    const users = getAllUsers()
    const foundUser = users.find(u => u.username === username)

    if (!foundUser) {
      setLoading(false)
      return
    }

    setUser(foundUser)

    // Profil bilgilerini al
    const userProfile = getProfile(foundUser.id)
    setProfile(userProfile)

    // Aktif linkleri al
    const userLinks = getUserLinks(foundUser.id).filter(link => link.isActive)
    setLinks(userLinks)

    setLoading(false)
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
  const buttonStyle = profile?.buttonStyle || 'fill'
  const buttonColor = profile?.buttonColor || '#6366f1'
  const cornerRadius = profile?.cornerRadius || 'medium'
  const fontStyle = profile?.fontStyle || 'sans'
  const theme = profile?.theme || 'dark'

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
        return `${baseClasses} text-white shadow-lg`
      case 'outline':
        return `${baseClasses} bg-transparent border-2`
      case 'shadow':
        return `${baseClasses} text-white shadow-2xl`
      default:
        return baseClasses
    }
  }

  // Background rendering
  const renderBackground = () => {
    switch (backgroundType) {
      case 'solid':
        return <div className="fixed inset-0" style={{ backgroundColor }} />
      case 'gradient':
        return <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
      case 'image':
        return backgroundImage ? (
          <div className="fixed inset-0">
            <img src={backgroundImage} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : <AnimatedShaderBackground />
      case 'animated':
      default:
        return <AnimatedShaderBackground />
    }
  }

  return (
    <div className={`min-h-screen relative ${fontClasses[fontStyle]}`}>
      {renderBackground()}
      
      {/* Header */}
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 bg-black/50 border-white/10">
        <div className="container mx-auto px-6 py-4 max-w-2xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity text-white">
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
          <div className={`w-32 h-32 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-4 border-white/20 overflow-hidden ${radiusClasses[cornerRadius === 'full' ? 'full' : 'medium']}`}>
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
        <div className={`space-y-3 ${layout === 'card' ? 'grid grid-cols-2 gap-3' : ''}`}>
          {links.length === 0 ? (
            <Card className={`${currentTheme.card} backdrop-blur-xl`}>
              <CardContent className="pt-12 pb-12 text-center">
                <FaLink className="w-12 h-12 mx-auto mb-4 text-white/30" />
                <p className={currentTheme.textMuted}>Henüz link eklenmemiş</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link) => {
              const IconComponent = getPlatformIcon(link.platformName)
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div
                    className={`${getButtonClasses()} ${currentTheme.card} ${currentTheme.cardHover} backdrop-blur-xl p-4 border transition-all hover:scale-[1.02]`}
                    style={
                      buttonStyle === 'fill' || buttonStyle === 'shadow'
                        ? { backgroundColor: buttonColor }
                        : { borderColor: buttonColor, color: buttonColor }
                    }
                  >
                    <div className={`flex items-center ${layout === 'card' ? 'flex-col text-center' : 'justify-between'} gap-3`}>
                      <div className={`flex items-center gap-3 ${layout === 'card' ? 'flex-col' : 'flex-1 min-w-0'}`}>
                        <IconComponent 
                          className={`${layout === 'card' ? 'w-8 h-8' : 'w-6 h-6'} flex-shrink-0`}
                          style={buttonStyle === 'outline' ? { color: buttonColor } : { color: 'white' }}
                        />
                        <div className={`${layout === 'card' ? 'text-center' : 'flex-1 min-w-0'}`}>
                          <p className={`font-semibold truncate ${buttonStyle === 'outline' ? '' : 'text-white'}`}>
                            {link.platformName}
                          </p>
                          {layout !== 'card' && (
                            <p className={`text-sm truncate ${buttonStyle === 'outline' ? 'opacity-70' : 'text-white/70'}`}>
                              {link.url}
                            </p>
                          )}
                        </div>
                      </div>
                      {layout !== 'card' && (
                        <FaExternalLinkAlt 
                          className={`w-5 h-5 flex-shrink-0 ml-4 transition-colors ${
                            buttonStyle === 'outline' ? 'opacity-70' : 'text-white/70'
                          } group-hover:opacity-100`}
                        />
                      )}
                    </div>
                  </div>
                </a>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/10">
          <p className={`text-sm mb-2 ${currentTheme.textMuted}`}>
            Kendi link sayfanı oluştur
          </p>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              Ücretsiz Başla
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
