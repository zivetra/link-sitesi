import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FaArrowLeft, FaSave, FaMoon, FaSun } from 'react-icons/fa'
import { getCurrentUser, getProfile, updateProfile } from '@/utils/storage'
import type { UserWithoutPassword } from '@/types'

interface FormData {
  bio: string;
  theme: 'light' | 'dark';
}

export default function EditProfile() {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserWithoutPassword | null>(null)
  const [formData, setFormData] = useState<FormData>({
    bio: '',
    theme: 'light'
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
    
    // Profil bilgilerini yükle
    const profile = getProfile(currentUser.id)
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        theme: profile.theme || 'light'
      })
    }
  }, [navigate])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    
    setLoading(true)
    setSuccess(false)

    const result = updateProfile(user.id, formData)
    
    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    }
    
    setLoading(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-4xl">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaArrowLeft className="w-5 h-5 text-gray-900" />
            <span className="text-lg font-semibold text-gray-900">Dashboard'a Dön</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Profil Düzenle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                  ✓ Profil başarıyla güncellendi!
                </div>
              )}

              {/* Avatar Preview */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b">
                <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-600">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-900">@{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Açıklama</Label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-gray-500">
                  {formData.bio.length}/200 karakter
                </p>
              </div>

              {/* Theme */}
              <div className="space-y-2">
                <Label>Tema</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, theme: 'light' })}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                      formData.theme === 'light'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaSun className="w-5 h-5" />
                    <span className="font-medium">Açık Tema</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, theme: 'dark' })}
                    className={`p-4 border-2 rounded-lg flex items-center gap-3 transition-all ${
                      formData.theme === 'dark'
                        ? 'border-gray-900 bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <FaMoon className="w-5 h-5" />
                    <span className="font-medium">Koyu Tema</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 gap-2"
                  disabled={loading}
                >
                  <FaSave className="w-4 h-4" />
                  {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  disabled={loading}
                >
                  İptal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
