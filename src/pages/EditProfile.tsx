import { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaArrowLeft, FaSave, FaMoon, FaSun, FaCamera, FaUser } from 'react-icons/fa'
import { getCurrentUser, getProfile, updateProfile } from '@/utils/storage'
import type { UserWithoutPassword } from '@/types'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

interface FormData {
  bio: string;
  theme: 'light' | 'dark' | 'purple';
  avatar: string;
  layout: 'classic' | 'minimal' | 'card';
  backgroundType: 'solid' | 'gradient' | 'image' | 'animated';
  backgroundColor: string;
  backgroundImage: string;
  buttonStyle: 'fill' | 'outline' | 'shadow';
  buttonColor: string;
  cornerRadius: 'none' | 'small' | 'medium' | 'full';
  fontStyle: 'sans' | 'serif' | 'mono';
}

export default function EditProfile() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<UserWithoutPassword | null>(null)
  const [formData, setFormData] = useState<FormData>({
    bio: '',
    theme: 'dark',
    avatar: '',
    layout: 'minimal',
    backgroundType: 'solid',
    backgroundColor: '#030014',
    backgroundImage: '',
    buttonStyle: 'fill',
    buttonColor: '#6366f1',
    cornerRadius: 'medium',
    fontStyle: 'sans'
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
        theme: profile.theme || 'dark',
        avatar: profile.avatar || '',
        layout: profile.layout || 'minimal',
        backgroundType: profile.backgroundType || 'solid',
        backgroundColor: profile.backgroundColor || '#030014',
        backgroundImage: profile.backgroundImage || '',
        buttonStyle: profile.buttonStyle || 'fill',
        buttonColor: profile.buttonColor || '#6366f1',
        cornerRadius: profile.cornerRadius || 'medium',
        fontStyle: profile.fontStyle || 'sans'
      })
    }
  }, [navigate])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Dosya boyutu kontrolü (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Dosya boyutu 2MB\'dan küçük olmalıdır')
        return
      }

      // Dosya tipi kontrolü
      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir resim dosyası seçin')
        return
      }

      // Dosyayı base64'e çevir
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = () => {
    setFormData({
      ...formData,
      avatar: ''
    })
  }

  const handleBackgroundImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('Arka plan resmi 8MB\'dan küçük olmalıdır')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({
          ...formData,
          backgroundImage: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
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
    <div className="min-h-screen relative">
      <AnimatedShaderBackground />
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-4xl">
          <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <FaArrowLeft className="w-5 h-5 text-white" />
            <span className="text-lg font-semibold text-white">Dashboard'a Dön</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 max-w-2xl relative z-10">
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Profil Düzenle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-sm">
                  ✓ Profil başarıyla güncellendi!
                </div>
              )}

              {/* Avatar Preview */}
              <div className="flex flex-col items-center gap-4 pb-6 border-b border-white/10">
                <div className="relative group">
                  {/* Avatar */}
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center overflow-hidden border-4 border-white/10">
                    {formData.avatar ? (
                      <img 
                        src={formData.avatar} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="w-12 h-12 text-white/60" />
                    )}
                  </div>
                  
                  {/* Upload Button Overlay */}
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="text-center">
                      <FaCamera className="w-6 h-6 text-white mx-auto mb-1" />
                      <span className="text-xs text-white font-medium">Değiştir</span>
                    </div>
                  </button>
                  
                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <p className="font-semibold text-white">@{user.username}</p>
                  <p className="text-sm text-white/60">{user.email}</p>
                  {formData.avatar && (
                    <button
                      type="button"
                      onClick={handleRemoveAvatar}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Fotoğrafı Kaldır
                    </button>
                  )}
                  <p className="text-xs text-white/40">
                    Max 2MB • JPG, PNG, GIF
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">Bio / Açıklama</Label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={loading}
                  className="w-full px-3 py-2 border border-white/20 bg-white/5 text-white placeholder:text-white/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent resize-none"
                  maxLength={200}
                />
                <p className="text-xs text-white/60">
                  {formData.bio.length}/200 karakter
                </p>
              </div>

              {/* Theme */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Tema</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, theme: 'light' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.theme === 'light'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">Aa</span>
                    </div>
                    <span className="text-sm font-medium text-white">Light</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, theme: 'dark' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.theme === 'dark'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">Aa</span>
                    </div>
                    <span className="text-sm font-medium text-white">Dark</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, theme: 'purple' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.theme === 'purple'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">Aa</span>
                    </div>
                    <span className="text-sm font-medium text-white">Purple</span>
                  </button>
                </div>
              </div>

              {/* Layout */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Düzen</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, layout: 'classic' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.layout === 'classic'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-16 bg-white/10 rounded-lg p-2 space-y-1">
                      <div className="w-full h-2 bg-white/30 rounded" />
                      <div className="w-3/4 h-2 bg-white/20 rounded" />
                      <div className="w-full h-2 bg-white/30 rounded" />
                    </div>
                    <span className="text-xs font-medium text-white">Klasik</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, layout: 'minimal' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.layout === 'minimal'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-16 bg-white/10 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/30 rounded-full" />
                    </div>
                    <span className="text-xs font-medium text-white">Minimal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, layout: 'card' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.layout === 'card'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-16 bg-white/10 rounded-lg p-2 grid grid-cols-2 gap-1">
                      <div className="bg-white/30 rounded" />
                      <div className="bg-white/30 rounded" />
                      <div className="bg-white/30 rounded" />
                      <div className="bg-white/30 rounded" />
                    </div>
                    <span className="text-xs font-medium text-white">Kart</span>
                  </button>
                </div>
              </div>

              {/* Background Type */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Arka Plan</Label>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundType: 'solid' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.backgroundType === 'solid'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gray-900 rounded-lg" />
                    <span className="text-xs font-medium text-white">Düz Renk</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundType: 'gradient' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.backgroundType === 'gradient'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-600 rounded-lg" />
                    <span className="text-xs font-medium text-white">Gradyan</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundType: 'image' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.backgroundType === 'image'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg" />
                    <span className="text-xs font-medium text-white">Görsel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundType: 'animated' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.backgroundType === 'animated'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg animate-pulse" />
                    <span className="text-xs font-medium text-white">Animasyonlu</span>
                  </button>
                </div>

                {/* Background Color Picker */}
                {formData.backgroundType === 'solid' && (
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Arka Plan Rengi</Label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                        className="w-16 h-10 rounded-lg cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={formData.backgroundColor}
                        onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                        className="flex-1 bg-white/5 border-white/20 text-white"
                        placeholder="#030014"
                      />
                    </div>
                  </div>
                )}

                {/* Background Image Upload */}
                {formData.backgroundType === 'image' && (
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Arka Plan Görseli</Label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                      className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                    />
                    {formData.backgroundImage && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        <img src={formData.backgroundImage} alt="Background" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, backgroundImage: '' })}
                          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                        >
                          Kaldır
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Button Style */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Buton Stili</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonStyle: 'fill' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.buttonStyle === 'fill'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Buton
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonStyle: 'outline' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.buttonStyle === 'outline'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 border-2 border-indigo-600 rounded-lg flex items-center justify-center text-indigo-400 text-sm font-medium">
                      Buton
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonStyle: 'shadow' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.buttonStyle === 'shadow'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-lg shadow-indigo-500/50">
                      Buton
                    </div>
                  </button>
                </div>

                {/* Button Color */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Buton Rengi</Label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.buttonColor}
                      onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })}
                      className="w-16 h-10 rounded-lg cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.buttonColor}
                      onChange={(e) => setFormData({ ...formData, buttonColor: e.target.value })}
                      className="flex-1 bg-white/5 border-white/20 text-white"
                      placeholder="#6366f1"
                    />
                  </div>
                </div>
              </div>

              {/* Corner Radius */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Köşe Yuvarlaklığı</Label>
                <div className="grid grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, cornerRadius: 'none' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.cornerRadius === 'none'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-white/20 flex items-center justify-center text-white text-xs">
                      Yok
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, cornerRadius: 'small' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.cornerRadius === 'small'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-white/20 rounded flex items-center justify-center text-white text-xs">
                      Küçük
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, cornerRadius: 'medium' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.cornerRadius === 'medium'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs">
                      Orta
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, cornerRadius: 'full' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.cornerRadius === 'full'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xs">
                      Tam
                    </div>
                  </button>
                </div>
              </div>

              {/* Font Style */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Yazı Tipi</Label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, fontStyle: 'sans' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.fontStyle === 'sans'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-sans">Sans Serif</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, fontStyle: 'serif' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.fontStyle === 'serif'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-serif">Serif</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, fontStyle: 'mono' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.fontStyle === 'mono'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <span className="text-white font-mono">Mono</span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 gap-2 bg-white text-black hover:bg-white/90"
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
                  className="border-white/20 text-white hover:bg-white/10"
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
