import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link2, Plus, Trash2, GripVertical, Eye, LogOut, ExternalLink, Settings, Instagram, Twitter, Github, Linkedin, Youtube, Music, Facebook, MessageCircle, Globe, Mail } from 'lucide-react'
import { getCurrentUser, logoutUser, getUserLinks, addLink, deleteLink, updateLink, toggleLinkStatus, reorderLinks } from '@/utils/storage'
import { PLATFORMS, getPlatformInfo } from '@/utils/platforms'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [links, setLinks] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLink, setNewLink] = useState({ platformName: '', url: '', icon: '' })
  const [draggedItem, setDraggedItem] = useState(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
    loadLinks(currentUser.id)
  }, [navigate])

  const loadLinks = (userId) => {
    const userLinks = getUserLinks(userId)
    setLinks(userLinks)
  }

  const handleAddLink = (e) => {
    e.preventDefault()
    if (!newLink.platformName || !newLink.url) return

    const platformInfo = getPlatformInfo(newLink.platformName)
    const result = addLink(user.id, newLink.platformName, newLink.url, platformInfo.icon)
    if (result.success) {
      loadLinks(user.id)
      setNewLink({ platformName: '', url: '', icon: '' })
      setShowAddForm(false)
    }
  }

  const handlePlatformSelect = (platform) => {
    setNewLink({
      platformName: platform.name,
      url: '',
      icon: platform.icon
    })
  }

  const handleDragStart = (e, link) => {
    setDraggedItem(link)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetLink) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === targetLink.id) return

    const newLinks = [...links]
    const draggedIndex = newLinks.findIndex(l => l.id === draggedItem.id)
    const targetIndex = newLinks.findIndex(l => l.id === targetLink.id)

    newLinks.splice(draggedIndex, 1)
    newLinks.splice(targetIndex, 0, draggedItem)

    setLinks(newLinks)
    reorderLinks(user.id, newLinks.map(l => l.id))
    setDraggedItem(null)
  }

  const getIconComponent = (iconName) => {
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      github: Github,
      linkedin: Linkedin,
      youtube: Youtube,
      music: Music,
      facebook: Facebook,
      twitch: Music,
      'message-circle': MessageCircle,
      globe: Globe,
      mail: Mail,
      link: Link2
    }
    return icons[iconName] || Link2
  }

  const handleDeleteLink = (linkId) => {
    if (confirm('Bu linki silmek istediğinize emin misiniz?')) {
      deleteLink(linkId)
      loadLinks(user.id)
    }
  }

  const handleToggleLink = (linkId) => {
    toggleLinkStatus(linkId)
    loadLinks(user.id)
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-4xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Link2 className="w-5 h-5 text-gray-900" />
            <span className="text-lg font-semibold text-gray-900">LinkHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/edit-profile">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings className="w-4 h-4" />
                Profil Düzenle
              </Button>
            </Link>
            <Link to={`/${user.username}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <Eye className="w-4 h-4" />
                Görüntüle
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hoş geldin, {user.username}!
          </h1>
          <p className="text-gray-600">
            Linklerini yönet ve profilini özelleştir
          </p>
        </div>

        {/* Profile URL */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Profil URL'in:</p>
                <p className="text-lg font-mono text-gray-900">
                  linkhub.com/{user.username}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(`linkhub.com/${user.username}`)
                  alert('URL kopyalandı!')
                }}
              >
                Kopyala
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Links Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Linklerim ({links.length})</CardTitle>
            <Button
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              Link Ekle
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Link Form */}
            {showAddForm && (
              <div className="p-4 bg-gray-50 rounded-lg space-y-4">
                {!newLink.platformName ? (
                  <>
                    <Label>Platform Seç</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PLATFORMS.map((platform) => {
                        const IconComponent = getIconComponent(platform.icon)
                        return (
                          <button
                            key={platform.name}
                            type="button"
                            onClick={() => handlePlatformSelect(platform)}
                            className="p-3 border-2 border-gray-200 rounded-lg hover:border-gray-900 transition-colors flex items-center gap-2 text-left"
                          >
                            <IconComponent className="w-5 h-5" style={{ color: platform.color }} />
                            <span className="text-sm font-medium">{platform.name}</span>
                          </button>
                        )
                      })}
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowAddForm(false)
                        setNewLink({ platformName: '', url: '', icon: '' })
                      }}
                      className="w-full"
                    >
                      İptal
                    </Button>
                  </>
                ) : (
                  <form onSubmit={handleAddLink} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b">
                      {(() => {
                        const IconComponent = getIconComponent(newLink.icon)
                        return <IconComponent className="w-5 h-5" />
                      })()}
                      <span className="font-medium">{newLink.platformName}</span>
                      <button
                        type="button"
                        onClick={() => setNewLink({ platformName: '', url: '', icon: '' })}
                        className="ml-auto text-sm text-gray-600 hover:text-gray-900"
                      >
                        Değiştir
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder={getPlatformInfo(newLink.platformName).placeholder}
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="flex-1">Ekle</Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowAddForm(false)
                          setNewLink({ platformName: '', url: '', icon: '' })
                        }}
                      >
                        İptal
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Links List */}
            {links.length === 0 ? (
              <div className="text-center py-12">
                <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Henüz link eklemediniz</p>
                <p className="text-sm text-gray-500">
                  "Link Ekle" butonuna tıklayarak ilk linkinizi ekleyin
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {links.map((link) => {
                  const IconComponent = getIconComponent(link.icon)
                  const platformInfo = getPlatformInfo(link.platformName)
                  return (
                    <div
                      key={link.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, link)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, link)}
                      className={`flex items-center gap-3 p-4 border rounded-lg transition-all cursor-move ${
                        link.isActive ? 'bg-white hover:shadow-md' : 'bg-gray-50 opacity-60'
                      } ${draggedItem?.id === link.id ? 'opacity-50' : ''}`}
                    >
                      <GripVertical className="w-4 h-4 text-gray-400" />
                      <IconComponent className="w-5 h-5 flex-shrink-0" style={{ color: platformInfo.color }} />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {link.platformName}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-gray-700 truncate flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleLink(link.id)}
                        >
                          {link.isActive ? 'Gizle' : 'Göster'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
