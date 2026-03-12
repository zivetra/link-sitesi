import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link2, ExternalLink } from 'lucide-react'
import { getAllUsers, getUserLinks, getProfile } from '@/utils/storage'

export default function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [username])

  const loadProfile = () => {
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
          <Link2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 max-w-2xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Link2 className="w-5 h-5 text-gray-900" />
            <span className="text-lg font-semibold text-gray-900">LinkHub</span>
          </Link>
        </div>
      </header>

      {/* Profile Content */}
      <main className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          {/* Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl font-bold text-gray-600">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Username */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            @{user.username}
          </h1>

          {/* Bio */}
          {profile?.bio && (
            <p className="text-gray-600 max-w-md mx-auto">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.length === 0 ? (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Henüz link eklenmemiş</p>
              </CardContent>
            </Card>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-gray-300">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {link.platformName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {link.url}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-2">
            Kendi link sayfanı oluştur
          </p>
          <Link to="/register">
            <Button variant="outline" size="sm">
              Ücretsiz Başla
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
