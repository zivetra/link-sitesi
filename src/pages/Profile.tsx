import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaLink, FaExternalLinkAlt } from 'react-icons/fa'
import { getAllUsers, getUserLinks, getProfile } from '@/utils/storage'
import { getPlatformInfo, getPlatformIcon } from '@/utils/platforms'
import type { User, Profile as ProfileType, Link as LinkType } from '@/types'

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Yükleniyor...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <FaLink className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Kullanıcı Bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            @{username} kullanıcı adına sahip bir profil bulunamadı
          </p>
          <Link to="/">
            <Button>Ana Sayfaya Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isDark = profile?.theme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
      {/* Header */}
      <header className={`border-b backdrop-blur-sm sticky top-0 z-50 ${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80'}`}>
        <div className="container mx-auto px-6 py-4 max-w-2xl">
          <Link to="/" className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <FaLink className="w-5 h-5" />
            <span className="text-lg font-semibold">LinkHub</span>
          </Link>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
            isDark ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-gray-200 to-gray-300'
          }`}>
            <span className={`text-3xl font-bold ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Username */}
          <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            @{user.username}
          </h1>

          {/* Bio */}
          {profile?.bio && (
            <p className={`max-w-md mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <Card className={isDark ? 'bg-gray-800 border-gray-700' : ''}>
              <CardContent className="pt-12 pb-12 text-center">
                <FaLink className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Henüz link eklenmemiş</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link) => {
              const IconComponent = getPlatformIcon(link.platformName)
              const platformInfo = getPlatformInfo(link.platformName)
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className={`transition-all cursor-pointer ${
                    isDark 
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600' 
                      : 'hover:shadow-md border-2 hover:border-gray-300'
                  }`}>
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <IconComponent 
                            className="w-6 h-6 flex-shrink-0" 
                            style={{ color: platformInfo.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className={`font-semibold truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              {link.platformName}
                            </p>
                            <p className={`text-sm truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <FaExternalLinkAlt className={`w-5 h-5 flex-shrink-0 ml-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                      </div>
                    </CardContent>
                  </Card>
                </a>
              )
            })
          )}
        </div>

        {/* Footer */}
        <div className={`text-center mt-12 pt-8 border-t ${isDark ? 'border-gray-700' : ''}`}>
          <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Kendi link sayfanı oluştur
          </p>
          <Link to="/register">
            <Button variant={isDark ? 'default' : 'outline'} size="sm" className={isDark ? 'bg-white text-gray-900 hover:bg-gray-100' : ''}>
              Ücretsiz Başla
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
