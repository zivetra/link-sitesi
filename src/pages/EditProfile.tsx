import { useState, useEffect, FormEvent, ChangeEvent, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaArrowLeft, FaSave, FaMoon, FaSun, FaCamera, FaUser, FaDownload, FaUpload, FaExclamationTriangle } from 'react-icons/fa'
import { getCurrentUser, getProfile, updateProfile, loadProfileWithMedia } from '@/utils/storage'
import { downloadProfileData, loadProfileDataFromFile } from '@/utils/fileStorage'
import type { UserWithoutPassword } from '@/types'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

interface FormData {
  bio: string;
  theme: 'light' | 'dark' | 'purple';
  avatar: string;
  layout: 'classic' | 'minimal' | 'card' | 'elite';
  backgroundType: 'solid' | 'gradient' | 'image' | 'animated' | 'gif';
  backgroundColor: string;
  backgroundImage: string;
  backgroundGif: string;
  backgroundMusic: string;
  buttonStyle: 'fill' | 'outline' | 'shadow' | 'gradient' | 'glass' | 'neon';
  buttonColor: string;
  buttonTextColor: string;
  cornerRadius: 'none' | 'small' | 'medium' | 'full';
  fontStyle: 'sans' | 'serif' | 'mono';
}

export default function EditProfile() {
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const profileImportRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState<UserWithoutPassword | null>(null)
  const [formData, setFormData] = useState<FormData>({
    bio: '',
    theme: 'dark',
    avatar: '',
    layout: 'minimal',
    backgroundType: 'solid',
    backgroundColor: '#030014',
    backgroundImage: '',
    backgroundGif: '',
    backgroundMusic: '',
    buttonStyle: 'fill',
    buttonColor: '#6366f1',
    buttonTextColor: 'auto',
    cornerRadius: 'medium',
    fontStyle: 'sans'
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const loadData = async () => {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        navigate('/login')
        return
      }
      setUser(currentUser)
      
      // Profil bilgilerini yükle (medya ile birlikte)
      const profile = await loadProfileWithMedia(currentUser.id)
      if (profile) {
        setFormData({
          bio: profile.bio || '',
          theme: profile.theme || 'dark',
          avatar: profile.avatar || '',
          layout: profile.layout || 'minimal',
          backgroundType: profile.backgroundType || 'solid',
          backgroundColor: profile.backgroundColor || '#030014',
          backgroundImage: profile.backgroundImage || '',
          backgroundGif: profile.backgroundGif || '',
          backgroundMusic: profile.backgroundMusic || '',
          buttonStyle: profile.buttonStyle || 'fill',
          buttonColor: profile.buttonColor || '#6366f1',
          buttonTextColor: profile.buttonTextColor || 'auto',
          cornerRadius: profile.cornerRadius || 'medium',
          fontStyle: profile.fontStyle || 'sans'
        })
      }
    }
    
    loadData()
  }, [navigate])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Renk parlaklığını hesapla (0-255 arası)
  const getColorBrightness = (hexColor: string): number => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    // Parlaklık formülü: (299*R + 587*G + 114*B) / 1000
    return (r * 299 + g * 587 + b * 114) / 1000
  }

  // Otomatik yazı rengi belirleme
  const getAutoTextColor = (bgColor: string): string => {
    const brightness = getColorBrightness(bgColor)
    // Parlaklık 128'den büyükse siyah, değilse beyaz
    return brightness > 128 ? '#000000' : '#ffffff'
  }

  // Yazı rengini al (auto ise otomatik hesapla)
  const getTextColor = (): string => {
    if (formData.buttonTextColor === 'auto') {
      return getAutoTextColor(formData.buttonColor)
    }
    return formData.buttonTextColor
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
        setFormData(prev => ({
          ...prev,
          avatar: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveAvatar = () => {
    setFormData(prev => ({
      ...prev,
      avatar: ''
    }))
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
        setFormData(prev => ({
          ...prev,
          backgroundImage: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundGifChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('GIF dosyası seçildi:', file.name, file.size, file.type)
      
      if (!file.type.includes('gif')) {
        alert('❌ Lütfen bir GIF dosyası seçin')
        e.target.value = ''
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log('GIF base64\'e çevrildi, uzunluk:', (reader.result as string).length)
        setFormData(prev => ({
          ...prev,
          backgroundGif: reader.result as string,
          backgroundType: 'gif'
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBackgroundMusicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Müzik dosyası seçildi:', file.name, file.size, file.type)
      
      if (!file.type.includes('audio')) {
        alert('❌ Lütfen bir müzik dosyası seçin (MP3, WAV, OGG)')
        e.target.value = ''
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        console.log('Müzik base64\'e çevrildi, uzunluk:', (reader.result as string).length)
        setFormData(prev => ({
          ...prev,
          backgroundMusic: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) return
    
    setLoading(true)
    setSuccess(false)
    setError('')

    // Debug: Kaydedilen veriyi kontrol et
    console.log('Kaydedilen Form Data:', {
      backgroundType: formData.backgroundType,
      backgroundGif: formData.backgroundGif ? 'GIF var (length: ' + formData.backgroundGif.length + ')' : 'GIF yok',
      backgroundMusic: formData.backgroundMusic ? 'Müzik var (length: ' + formData.backgroundMusic.length + ')' : 'Müzik yok',
      hasGif: !!formData.backgroundGif,
      hasMusic: !!formData.backgroundMusic
    })

    const result = await updateProfile(user.id, formData)
    
    if (result.success) {
      setSuccess(true)
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    } else {
      // Hata mesajını göster ama alert kullanma
      setError(result.message || 'Kaydetme hatası')
      // Sayfayı yukarı kaydır ki hata mesajı görünsün
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    
    setLoading(false)
  }

  // Profil verilerini JSON olarak indir
  const handleExportProfile = () => {
    if (!user) return
    console.log('🔄 Export butonu tıklandı, user:', user.id)
    downloadProfileData(user.id, formData)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  // JSON dosyasından profil verilerini yükle
  const handleImportProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    console.log('🔄 Import butonu tıklandı, dosya:', file.name)
    
    try {
      const data = await loadProfileDataFromFile(file)
      console.log('✅ Profil yüklendi, form güncelleniyor...')
      setFormData(data)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('❌ Import hatası:', error)
      setError('Profil dosyası yüklenemedi')
      setTimeout(() => setError(''), 3000)
    }
  }

  // Büyük dosyaları temizle
  const handleClearLargeFiles = () => {
    console.log('🧹 Büyük dosyalar temizleniyor...')
    const before = {
      hasGif: !!formData.backgroundGif,
      hasMusic: !!formData.backgroundMusic,
      gifSize: formData.backgroundGif?.length || 0,
      musicSize: formData.backgroundMusic?.length || 0
    }
    
    setFormData(prev => ({
      ...prev,
      backgroundGif: '',
      backgroundMusic: '',
      backgroundImage: prev.backgroundImage && prev.backgroundImage.length > 100000 ? '' : prev.backgroundImage
    }))
    
    console.log('✅ Büyük dosyalar temizlendi:', before)
    setError('')
  }

  if (!user) return null

  // Önizleme için render fonksiyonları
  const renderPreviewBackground = () => {
    switch (formData.backgroundType) {
      case 'solid':
        return <div className="absolute inset-0" style={{ backgroundColor: formData.backgroundColor }} />
      case 'gradient':
        if (formData.theme === 'light') {
          return <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-blue-50 to-purple-50" />
        } else if (formData.theme === 'purple') {
          return <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900" />
        } else {
          return <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900" />
        }
      case 'image':
        return formData.backgroundImage ? (
          <div className="absolute inset-0">
            <img src={formData.backgroundImage} alt="Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        ) : <div className="absolute inset-0 bg-gray-900" />
      case 'gif':
        return formData.backgroundGif ? (
          <div className="absolute inset-0">
            <img src={formData.backgroundGif} alt="Background GIF" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ) : <div className="absolute inset-0 bg-gray-900" />
      case 'animated':
      default:
        return (
          <div className="absolute inset-0">
            <AnimatedShaderBackground />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
          </div>
        )
    }
  }

  const radiusClasses = {
    none: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-lg',
    full: 'rounded-full'
  }

  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }

  const getPreviewButtonStyle = () => {
    const textColor = getTextColor()
    
    switch (formData.buttonStyle) {
      case 'fill':
        return { backgroundColor: formData.buttonColor, borderColor: 'transparent', color: textColor }
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: formData.buttonColor, color: formData.buttonColor }
      case 'shadow':
        return { 
          backgroundColor: formData.buttonColor, 
          borderColor: 'transparent',
          color: textColor,
          boxShadow: `0 20px 25px -5px ${formData.buttonColor}40, 0 10px 10px -5px ${formData.buttonColor}40`
        }
      case 'gradient':
        return {
          background: `linear-gradient(to right, ${formData.buttonColor}, ${formData.buttonColor}dd)`,
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
          backgroundColor: formData.buttonColor,
          borderColor: 'transparent',
          color: textColor,
          boxShadow: `0 0 20px ${formData.buttonColor}cc, 0 0 40px ${formData.buttonColor}66`
        }
      default:
        return {}
    }
  }

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
      <main className="container mx-auto px-6 py-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol Taraf - Form */}
          <div className="h-full relative z-20">
            <Card className="bg-white/5 border-white/10 h-full backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Profil Düzenle</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success Message */}
              {success && (
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-sm">
                  ✓ Profil başarıyla güncellendi!
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm space-y-3">
                  <div className="flex items-start gap-2">
                    <FaExclamationTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold">Depolama Alanı Doldu!</p>
                      <p className="text-xs mt-1">{error}</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-500/5 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-red-300">Çözüm Seçenekleri:</p>
                    <div className="space-y-1 text-xs">
                      <p>1. Büyük dosyaları kaldırın (GIF, Müzik)</p>
                      <p>2. Profili dışa aktarıp dosya olarak saklayın</p>
                      <p>3. Daha küçük dosyalar kullanın (&lt; 2MB)</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={handleClearLargeFiles}
                      className="flex-1 gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs h-8"
                    >
                      Büyük Dosyaları Temizle
                    </Button>
                    <Button
                      type="button"
                      onClick={handleExportProfile}
                      className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                    >
                      <FaDownload className="w-3 h-3" />
                      Önce Dışa Aktar
                    </Button>
                  </div>
                </div>
              )}

              {/* Import/Export Buttons */}
              <div className="flex gap-2 pb-4 border-b border-white/10">
                <Button
                  type="button"
                  onClick={handleExportProfile}
                  className="flex-1 gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <FaDownload className="w-3 h-3" />
                  Profili Dışa Aktar
                </Button>
                <Button
                  type="button"
                  onClick={() => profileImportRef.current?.click()}
                  className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                  size="sm"
                >
                  <FaUpload className="w-3 h-3" />
                  Profili İçe Aktar
                </Button>
                <input
                  ref={profileImportRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportProfile}
                  className="hidden"
                />
              </div>

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
                    onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))}
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
                    onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))}
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
                    onClick={() => setFormData(prev => ({ ...prev, theme: 'purple' }))}
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
                <div className="grid grid-cols-4 gap-3">
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
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, layout: 'elite' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.layout === 'elite'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-2 flex flex-col gap-1">
                      <div className="w-full h-3 bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded" />
                      <div className="flex gap-1">
                        <div className="flex-1 h-2 bg-purple-400/30 rounded" />
                        <div className="flex-1 h-2 bg-pink-400/30 rounded" />
                      </div>
                      <div className="w-2/3 h-2 bg-purple-400/20 rounded" />
                    </div>
                    <span className="text-xs font-medium text-white">Elite</span>
                  </button>
                </div>
              </div>

              {/* Background Type */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Arka Plan</Label>
                <div className="grid grid-cols-5 gap-3">
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
                    onClick={() => setFormData({ ...formData, backgroundType: 'gif' })}
                    className={`p-4 border-2 rounded-xl flex flex-col items-center gap-2 transition-all ${
                      formData.backgroundType === 'gif'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg animate-pulse" />
                    <span className="text-xs font-medium text-white">GIF</span>
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

                {/* Background GIF Upload */}
                {formData.backgroundType === 'gif' && (
                  <div className="space-y-2">
                    <Label className="text-white text-sm">Arka Plan GIF</Label>
                    <input
                      type="file"
                      accept="image/gif"
                      onChange={handleBackgroundGifChange}
                      className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                    />
                    <p className="text-xs text-white/40">
                      GIF formatı • Boyut sınırı yok!
                      <br />
                      <span className="text-green-400">✅ IndexedDB kullanılıyor - Sınırsız depolama</span>
                    </p>
                    {formData.backgroundGif && (
                      <div className="relative w-full h-32 rounded-lg overflow-hidden">
                        <img src={formData.backgroundGif} alt="Background GIF" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, backgroundGif: '' })}
                          className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                        >
                          Kaldır
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Background Music */}
              <div className="space-y-3">
                <Label className="text-white text-lg font-semibold">Arka Plan Müziği 🎵</Label>
                <div className="space-y-2">
                  <Label className="text-white text-sm">Müzik Dosyası</Label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleBackgroundMusicChange}
                    className="w-full text-sm text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer"
                  />
                  <p className="text-xs text-white/40">
                    MP3, WAV, OGG formatları • Boyut sınırı yok!
                    <br />
                    <span className="text-green-400">✅ IndexedDB kullanılıyor - Sınırsız depolama</span>
                  </p>
                  {formData.backgroundMusic && (
                    <div className="relative w-full p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">Müzik yüklendi</p>
                          <p className="text-xs text-white/60">Profil açıldığında otomatik çalacak</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, backgroundMusic: '' })}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
                      Fill
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
                      Outline
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
                      Shadow
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonStyle: 'gradient' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.buttonStyle === 'gradient'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Gradient
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonStyle: 'glass' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.buttonStyle === 'glass'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Glass
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonStyle: 'neon' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      formData.buttonStyle === 'neon'
                        ? 'border-white bg-white/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="w-full h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-[0_0_20px_rgba(99,102,241,0.8)]">
                      Neon
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

                {/* Button Text Color */}
                <div className="space-y-2">
                  <Label className="text-white text-sm">Yazı Rengi</Label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, buttonTextColor: 'auto' })}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.buttonTextColor === 'auto'
                          ? 'border-white bg-white/10 text-white'
                          : 'border-white/20 text-white/60 hover:border-white/40'
                      }`}
                    >
                      Otomatik
                    </button>
                    <input
                      type="color"
                      value={formData.buttonTextColor === 'auto' ? '#ffffff' : formData.buttonTextColor}
                      onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                      className="w-16 h-10 rounded-lg cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={formData.buttonTextColor === 'auto' ? 'Otomatik' : formData.buttonTextColor}
                      onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                      className="flex-1 bg-white/5 border-white/20 text-white"
                      placeholder="Otomatik"
                    />
                  </div>
                  <p className="text-xs text-white/40">
                    Otomatik: Parlak renklerde siyah, koyu renklerde beyaz
                  </p>
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
      </div>

      {/* Sağ Taraf - Canlı Önizleme */}
      <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] relative z-20">
        <div className="h-full flex items-center justify-center p-2">
          {/* Phone Mockup */}
          <div className="relative scale-110">
            {/* Phone Frame - Daha büyük ve güzel */}
            <div className="relative w-[380px] h-[760px] bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[3.5rem] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[12px] border-slate-950">
              {/* Inner Frame Shine */}
              <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
              
              {/* Screen */}
              <div className="relative w-full h-full bg-black rounded-[3rem] overflow-hidden shadow-inner">
                {/* Dynamic Island (Modern iPhone) */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-black rounded-full z-50 shadow-lg border border-gray-900" />
                
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/60 to-transparent z-40 flex items-center justify-between px-10 pt-3">
                  <span className="text-white text-sm font-semibold tracking-tight">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <div className="flex items-center gap-0.5">
                      <div className="w-6 h-3 border-2 border-white rounded-sm relative">
                        <div className="absolute inset-0.5 bg-white rounded-[1px]" />
                      </div>
                      <div className="w-1 h-2 bg-white rounded-sm" />
                    </div>
                  </div>
                </div>

                {/* Preview Content */}
                <div className={`relative h-full overflow-hidden ${fontClasses[formData.fontStyle]}`}>
                  {/* Arka Plan */}
                  {renderPreviewBackground()}
                  
                  {/* Scrollable Content */}
                  <div className="relative z-10 h-full overflow-y-auto pt-16 pb-10 px-7 scrollbar-hide">
                    {/* Avatar */}
                    <div className="text-center mb-7">
                      <div className={`w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border-[3px] border-white/20 overflow-hidden shadow-xl ${formData.layout === 'minimal' ? 'rounded-full' : radiusClasses[formData.cornerRadius]}`}>
                        {formData.avatar ? (
                          <img 
                            src={formData.avatar} 
                            alt="Avatar" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FaUser className="w-9 h-9 text-white/60" />
                        )}
                      </div>
                      
                      {/* Username */}
                      <h2 className="text-xl font-bold text-white mb-2 tracking-tight">
                        @{user.username}
                      </h2>
                      
                      {/* Bio */}
                      {formData.bio && (
                        <p className="text-sm text-white/70 max-w-[280px] mx-auto line-clamp-2 leading-relaxed">
                          {formData.bio}
                        </p>
                      )}
                    </div>

                    {/* Örnek Linkler */}
                    <div className={`space-y-3 ${
                      formData.layout === 'card' ? 'grid grid-cols-2 gap-3' : 
                      formData.layout === 'elite' ? 'grid grid-cols-1 gap-3' : ''
                    }`}>
                      {['Instagram', 'Twitter', 'GitHub'].map((platform, index) => (
                        <div
                          key={index}
                          className={`backdrop-blur-xl p-4 border-2 transition-all ${radiusClasses[formData.cornerRadius]} ${
                            formData.layout === 'elite' ? 'relative overflow-hidden' : ''
                          } hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-lg`}
                          style={getPreviewButtonStyle()}
                        >
                          {formData.layout === 'elite' && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                          )}
                          <div className={`flex items-center ${
                            formData.layout === 'card' ? 'flex-col text-center' : 
                            formData.layout === 'elite' ? 'justify-between' : 
                            'justify-between'
                          } gap-3 relative z-10`}>
                            <div className={`flex items-center gap-3 ${formData.layout === 'card' ? 'flex-col' : 'flex-1'}`}>
                              <div className={`${formData.layout === 'elite' ? 'w-6 h-6' : 'w-5 h-5'} rounded-full bg-white/30 flex-shrink-0 shadow-sm`} />
                              <span className={`${formData.layout === 'elite' ? 'text-base font-semibold' : 'text-sm font-medium'} truncate`}>
                                {platform}
                              </span>
                            </div>
                            {formData.layout === 'elite' && (
                              <div className="text-sm opacity-70">→</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preview Badge */}
                    <div className="mt-10 text-center">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        <span className="text-xs text-white/80 font-medium">Canlı Önizleme</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-white/40 rounded-full z-50 shadow-lg" />
              </div>
              
              {/* Side Buttons */}
              <div className="absolute -left-[2px] top-24 w-1 h-12 bg-slate-800 rounded-l-lg" />
              <div className="absolute -left-[2px] top-40 w-1 h-16 bg-slate-800 rounded-l-lg" />
              <div className="absolute -left-[2px] top-60 w-1 h-16 bg-slate-800 rounded-l-lg" />
              <div className="absolute -right-[2px] top-32 w-1 h-20 bg-slate-800 rounded-r-lg" />
            </div>

            {/* Enhanced Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-[3.5rem] blur-3xl -z-10 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-fuchsia-500/20 rounded-[3.5rem] blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  </main>
    </div>
  )
}
