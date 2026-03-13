import { useState, useEffect, DragEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getCurrentUser, logoutUser, getUserLinks, addLink, deleteLink, toggleLinkStatus, reorderLinks } from '@/utils/storage'
import { PLATFORMS, getPlatformInfo, getPlatformIcon } from '@/utils/platforms'
import type { UserWithoutPassword, Link as LinkType, Platform } from '@/types'
import { FaLink, FaPlus, FaTrash, FaGripVertical, FaEye, FaSignOutAlt, FaExternalLinkAlt, FaCog } from 'react-icons/fa'

interface NewLink {
  platformName: string;
  url: string;
  icon: string;
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserWithoutPassword | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [showAddForm, setShowAddForm] = useState<boolean>(false)
  const [newLink, setNewLink] = useState<NewLink>({ platformName: '', url: '', icon: '' })
  const [draggedItem, setDraggedItem] = useState<LinkType | null>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
    loadLinks(currentUser.id)
  }, [navigate])

  const loadLinks = (userId: string) => {
    const userLinks = getUserLinks(userId)
    setLinks(userLinks)
  }

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newLink.platformName || !newLink.url || !user) return

    const platformInfo = getPlatformInfo(newLink.platformName)
    const result = addLink(user.id, newLink.platformName, newLink.url, platformInfo.icon)
    if (result.success) {
      loadLinks(user.id)
      setNewLink({ platformName: '', url: '', icon: '' })
      setShowAddForm(false)
    }
  }

  const handlePlatformSelect = (platform: Platform) => {
    setNewLink({
      platformName: platform.name,
      url: '',
      icon: platform.icon
    })
  }

  const handleDragStart = (e: DragEvent<HTMLDivElement>, link: LinkType) => {
    setDraggedItem(link)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>, targetLink: LinkType) => {
    e.preventDefault()
    if (!draggedItem || draggedItem.id === targetLink.id || !user) return

    const newLinks = [...links]
    const draggedIndex = newLinks.findIndex(l => l.id === draggedItem.id)
    const targetIndex = newLinks.findIndex(l => l.id === targetLink.id)

    newLinks.splice(draggedIndex, 1)
    newLinks.splice(targetIndex, 0, draggedItem)

    setLinks(newLinks)
    reorderLinks(user.id, newLinks.map(l => l.id))
    setDraggedItem(null)
  }

  const handleDeleteLink = (linkId: string) => {
    if (!user) return
    if (confirm('Bu linki silmek istediğinize emin misiniz?')) {
      deleteLink(linkId)
      loadLinks(user.id)
    }
  }

  const handleToggleLink = (linkId: string) => {
    if (!user) return
    toggleLinkStatus(linkId)
    loadLinks(user.id)
  }

  const handleLogout = () => {
    logoutUser()
    navigate('/')
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-4xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaLink className="w-5 h-5 text-white" />
            <span className="text-lg font-semibold text-white">LinkHub</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/edit-profile">
              <Button variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10">
                <FaCog className="w-4 h-4" />
                Profil Düzenle
              </Button>
            </Link>
            <Link to={`/${user.username}`}>
              <Button variant="outline" size="sm" className="gap-2 border-white/20 text-white hover:bg-white/10">
                <FaEye className="w-4 h-4" />
                Görüntüle
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-white hover:bg-white/10">
              <FaSignOutAlt className="w-4 h-4" />
              Çıkış
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hoş geldin, {user.username}!
          </h1>
          <p className="text-white/70">
            Linklerini yönet ve profilini özelleştir
          </p>
        </div>

        {/* Profile URL */}
        <Card className="mb-6 bg-white/5 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70 mb-1">Profil URL'in:</p>
                <p className="text-lg font-mono text-white">
                  linkhub.com/{user.username}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
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
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Linklerim ({links.length})</CardTitle>
            <Button
              size="sm"
              onClick={() => setShowAddForm(!showAddForm)}
              className="gap-2 bg-white text-black hover:bg-white/90"
            >
              <FaPlus className="w-4 h-4" />
              Link Ekle
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Link Form */}
            {showAddForm && (
              <div className="p-4 bg-white/10 rounded-lg space-y-4">
                {!newLink.platformName ? (
                  <>
                    <Label className="text-white">Platform Seç</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PLATFORMS.map((platform) => {
                        const IconComponent = getPlatformIcon(platform.icon)
                        return (
                          <button
                            key={platform.name}
                            type="button"
                            onClick={() => handlePlatformSelect(platform)}
                            className="p-3 border-2 border-white/20 rounded-lg hover:border-white/40 transition-colors flex items-center gap-2 text-left bg-white/5"
                          >
                            <IconComponent className="w-5 h-5" style={{ color: platform.color }} />
                            <span className="text-sm font-medium text-white">{platform.name}</span>
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
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      İptal
                    </Button>
                  </>
                ) : (
                  <form onSubmit={handleAddLink} className="space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-white/20">
                      {(() => {
                        const IconComponent = getPlatformIcon(newLink.icon)
                        return <IconComponent className="w-5 h-5 text-white" />
                      })()}
                      <span className="font-medium text-white">{newLink.platformName}</span>
                      <button
                        type="button"
                        onClick={() => setNewLink({ platformName: '', url: '', icon: '' })}
                        className="ml-auto text-sm text-white/70 hover:text-white"
                      >
                        Değiştir
                      </button>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url" className="text-white">URL</Label>
                      <Input
                        id="url"
                        type="url"
                        placeholder={getPlatformInfo(newLink.platformName).placeholder}
                        value={newLink.url}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewLink({ ...newLink, url: e.target.value })}
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="flex-1 bg-white text-black hover:bg-white/90">Ekle</Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowAddForm(false)
                          setNewLink({ platformName: '', url: '', icon: '' })
                        }}
                        className="border-white/20 text-white hover:bg-white/10"
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
                <FaLink className="w-12 h-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 mb-2">Henüz link eklemediniz</p>
                <p className="text-sm text-white/50">
                  "Link Ekle" butonuna tıklayarak ilk linkinizi ekleyin
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {links.map((link) => {
                  const IconComponent = getPlatformIcon(link.icon)
                  const platformInfo = getPlatformInfo(link.platformName)
                  return (
                    <div
                      key={link.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, link)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, link)}
                      className={`flex items-center gap-3 p-4 border rounded-lg transition-all cursor-move ${
                        link.isActive ? 'bg-white/5 border-white/20 hover:bg-white/10' : 'bg-white/5 border-white/10 opacity-60'
                      } ${draggedItem?.id === link.id ? 'opacity-50' : ''}`}
                    >
                      <FaGripVertical className="w-4 h-4 text-white/40" />
                      <IconComponent className="w-5 h-5 flex-shrink-0" style={{ color: platformInfo.color }} />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">
                          {link.platformName}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-white/60 hover:text-white/80 truncate flex items-center gap-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {link.url}
                          <FaExternalLinkAlt className="w-3 h-3" />
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleLink(link.id)}
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          {link.isActive ? 'Gizle' : 'Göster'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteLink(link.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <FaTrash className="w-4 h-4" />
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
