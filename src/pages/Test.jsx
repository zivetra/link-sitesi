import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createDemoData, clearAllData, getAllUsers, getUserLinks, getProfile } from '@/utils/storage'
import { RefreshCw, Trash2 } from 'lucide-react'

export default function Test() {
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])
  const [links, setLinks] = useState([])
  const [profiles, setProfiles] = useState([])

  const handleCreateDemo = () => {
    createDemoData()
    setStatus('✅ Demo veri oluşturuldu! Kullanıcı: demo, Şifre: demo123')
    loadData()
  }

  const handleClearData = () => {
    if (confirm('Tüm verileri silmek istediğinize emin misiniz?')) {
      clearAllData()
      setStatus('🗑️ Tüm veriler temizlendi!')
      setUsers([])
      setLinks([])
      setProfiles([])
    }
  }

  const loadData = () => {
    const allUsers = getAllUsers()
    setUsers(allUsers)
    
    if (allUsers.length > 0) {
      const userId = allUsers[0].id
      setLinks(getUserLinks(userId))
      const profile = getProfile(userId)
      setProfiles(profile ? [profile] : [])
    }
  }

  const testFeatures = [
    { name: 'Kullanıcı Kaydı', path: '/register', status: '✅' },
    { name: 'Kullanıcı Girişi', path: '/login', status: '✅' },
    { name: 'Dashboard', path: '/dashboard', status: '✅' },
    { name: 'Profil Düzenleme', path: '/edit-profile', status: '✅' },
    { name: 'Profil Görüntüleme', path: '/demo', status: '✅' },
    { name: 'Link Ekleme', path: '/dashboard', status: '✅' },
    { name: 'Link Silme', path: '/dashboard', status: '✅' },
    { name: 'Link Sıralama (Drag&Drop)', path: '/dashboard', status: '✅' },
    { name: 'Platform İkonları', path: '/dashboard', status: '✅' },
    { name: 'Tema Sistemi', path: '/edit-profile', status: '✅' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LinkHub Test Sayfası
          </h1>
          <p className="text-gray-600">
            Tüm özellikleri test edin ve veri yönetimi yapın
          </p>
        </div>

        {/* Status */}
        {status && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <p className="text-green-800">{status}</p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Veri Yönetimi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button onClick={handleCreateDemo} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Demo Veri Oluştur
              </Button>
              <Button onClick={loadData} variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Verileri Yükle
              </Button>
              <Button onClick={handleClearData} variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Tüm Verileri Temizle
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                <p className="text-sm text-gray-600">Kullanıcı</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{links.length}</p>
                <p className="text-sm text-gray-600">Link</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{profiles.length}</p>
                <p className="text-sm text-gray-600">Profil</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle>Özellik Listesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {testFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{feature.status}</span>
                    <span className="font-medium text-gray-900">{feature.name}</span>
                  </div>
                  <Link to={feature.path}>
                    <Button variant="outline" size="sm">
                      Test Et
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <Card>
          <CardHeader>
            <CardTitle>Hızlı Erişim</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/">
                <Button variant="outline" className="w-full">Ana Sayfa</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="w-full">Kayıt Ol</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">Giriş Yap</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>
              <Link to="/edit-profile">
                <Button variant="outline" className="w-full">Profil Düzenle</Button>
              </Link>
              <Link to="/demo">
                <Button variant="outline" className="w-full">Demo Profil</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Users Data */}
        {users.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Kullanıcılar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {users.map((user) => (
                  <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">@{user.username}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
