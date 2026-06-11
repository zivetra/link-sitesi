import { useState, useEffect, FormEvent, ChangeEvent, useRef, ReactNode } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  FaArrowLeft, FaSave, FaCamera, FaUser, FaDownload, FaUpload,
  FaExclamationTriangle, FaCheckCircle, FaCheck, FaTrashAlt,
  FaPalette, FaThLarge, FaImage, FaMusic, FaPaintBrush,
  FaBorderAll, FaUserCircle
} from 'react-icons/fa'
import { getCurrentUser, updateProfile, loadProfileWithMedia } from '@/utils/storage'
import { downloadProfileData, loadProfileDataFromFile } from '@/utils/fileStorage'
import type { UserWithoutPassword } from '@/types'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

interface FormData {
  bio: string;
  theme: 'light' | 'dark';
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

// Tutarlı bölüm başlığı + panel kabuğu
function Section({ icon, title, description, children }: { icon: ReactNode; title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/20">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/25 to-fuchsia-500/20 text-indigo-200">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-wide text-white">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-white/45">{description}</p>}
        </div>
      </div>
      {children}
    </section>
  )
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
      // Sayfada kal, başarı mesajını göster ve bir süre sonra gizle
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
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

  if (!user) return null

  // Önizleme için render fonksiyonları
  const renderPreviewBackground = () => {
    switch (formData.backgroundType) {
      case 'solid':
        return <div className="absolute inset-0" style={{ backgroundColor: formData.backgroundColor }} />
      case 'gradient':
        if (formData.theme === 'light') {
          return <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 via-purple-200 to-rose-200" />
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
        // Önizlemede gerçek WebGL shader yerine telefonla sınırlı CSS animasyonlu
        // gradyan kullanıyoruz (shader 'fixed inset-0' olduğu için önizlemede
        // taşıp tüm sayfayı kaplıyordu). Bu, animasyonlu arka planı temsil eder.
        return (
          <div className="absolute inset-0 overflow-hidden bg-[#05010f]">
            <div
              className="absolute -inset-1/4 animate-pulse"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 30% 25%, rgba(99,102,241,0.55), transparent 55%), radial-gradient(circle at 75% 55%, rgba(236,72,153,0.45), transparent 55%), radial-gradient(circle at 45% 85%, rgba(56,189,248,0.45), transparent 55%)'
              }}
            />
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

  // --- Yeniden tasarım yardımcıları ---
  const optionBtn = (active: boolean) =>
    `relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all duration-200 ${
      active
        ? 'border-indigo-400/50 bg-indigo-500/10 ring-1 ring-indigo-400/30 shadow-[0_0_24px_-8px_rgba(99,102,241,0.85)]'
        : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
    }`

  const activeDot = (show: boolean) =>
    show ? (
      <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.9)]">
        <FaCheck className="h-2.5 w-2.5" />
      </span>
    ) : null

  const fileInputClass =
    'block w-full cursor-pointer rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-sm text-white/60 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.04] file:mr-4 file:cursor-pointer file:border-0 file:bg-indigo-500/15 file:px-4 file:py-3 file:font-medium file:text-indigo-200 hover:file:bg-indigo-500/25'

  const colorPickerRow = (value: string, onChange: (v: string) => void, placeholder: string) => (
    <div className="flex gap-2">
      <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl border border-white/15">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] cursor-pointer"
        />
      </div>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 border-white/15 bg-white/[0.03] text-white"
        placeholder={placeholder}
      />
    </div>
  )

  // Önizleme metni doğrudan arka planın üzerinde durduğu için rengini, temaya
  // değil arka plan yüzeyinin parlaklığına göre seçiyoruz (her zaman okunabilir).
  // Görsel/GIF/animasyon arka planlarında koyu overlay olduğundan açık metin kullanılır.
  const isLightPreviewSurface =
    (formData.backgroundType === 'solid' && getColorBrightness(formData.backgroundColor) > 150) ||
    (formData.backgroundType === 'gradient' && formData.theme === 'light')
  const previewText = isLightPreviewSurface ? 'text-gray-900' : 'text-white'
  const previewTextMuted = isLightPreviewSurface ? 'text-gray-700' : 'text-white/70'
  const previewBadge = isLightPreviewSurface
    ? 'border-black/10 bg-black/5 text-gray-700'
    : 'border-white/20 bg-white/10 text-white/80'

  return (
    <div className="relative min-h-screen text-white">
      <AnimatedShaderBackground />
      <div className="pointer-events-none fixed inset-0 bg-[#06010f]/70" />

      {/* Toast bildirimleri */}
      {(success || error) && (
        <div className="fixed left-1/2 top-20 z-[70] w-[min(92vw,440px)] -translate-x-1/2">
          {success && (
            <div className="flex items-center gap-3 rounded-xl border border-emerald-400/25 bg-emerald-500/15 px-4 py-3 text-emerald-200 shadow-2xl backdrop-blur-xl">
              <FaCheckCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">Profil başarıyla güncellendi!</p>
            </div>
          )}
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-400/25 bg-red-500/15 px-4 py-3 text-red-200 shadow-2xl backdrop-blur-xl">
              <FaExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">Kaydetme başarısız</p>
                <p className="mt-0.5 text-xs text-red-200/80">{error}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          <Link to="/dashboard" className="group inline-flex items-center gap-2.5 text-white/70 transition-colors hover:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:bg-white/10">
              <FaArrowLeft className="h-3.5 w-3.5" />
            </span>
            <span className="text-sm font-medium">Dashboard'a Dön</span>
          </Link>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="hidden sm:inline">@{user.username}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Başlık */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-indigo-300/70">Profil Stüdyosu</p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Profilini Tasarla</h1>
          <p className="mt-2 max-w-md text-sm text-white/50">Görünümü özelleştir, değişiklikleri sağdaki canlı önizlemede anında gör.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-8">
          {/* SOL: Form */}
          <form onSubmit={handleSubmit} className="order-2 space-y-5 lg:order-1">
            {/* İçe / Dışa Aktar */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={handleExportProfile}
                variant="outline"
                size="sm"
                className="gap-2 border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FaDownload className="h-3 w-3" /> Dışa Aktar
              </Button>
              <Button
                type="button"
                onClick={() => profileImportRef.current?.click()}
                variant="outline"
                size="sm"
                className="gap-2 border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <FaUpload className="h-3 w-3" /> İçe Aktar
              </Button>
              <input
                ref={profileImportRef}
                type="file"
                accept=".json"
                onChange={handleImportProfile}
                className="hidden"
              />
            </div>

            {/* Profil */}
            <Section icon={<FaUserCircle className="h-4 w-4" />} title="Profil" description="Avatar ve biyografi">
              <div className="flex items-center gap-5">
                <div className="group relative shrink-0">
                  <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                    {formData.avatar ? (
                      <img src={formData.avatar} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <FaUser className="h-9 w-9 text-white/50" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-2xl bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <FaCamera className="h-5 w-5 text-white" />
                    <span className="text-[10px] font-medium text-white">Değiştir</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <div className="min-w-0 space-y-1">
                  <p className="truncate font-semibold text-white">@{user.username}</p>
                  <p className="truncate text-sm text-white/50">{user.email}</p>
                  <div className="flex items-center gap-3 pt-1">
                    {formData.avatar && (
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        className="inline-flex items-center gap-1.5 text-xs text-red-400 transition-colors hover:text-red-300"
                      >
                        <FaTrashAlt className="h-3 w-3" /> Kaldır
                      </button>
                    )}
                    <span className="text-[11px] text-white/35">Max 2MB · JPG, PNG, GIF</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Label htmlFor="bio" className="text-xs font-medium text-white/70">Bio / Açıklama</Label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  value={formData.bio}
                  onChange={handleChange}
                  disabled={loading}
                  maxLength={200}
                  className="w-full resize-none rounded-xl border border-white/15 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 transition-colors focus:border-indigo-400/50 focus:outline-none focus:ring-2 focus:ring-indigo-400/20"
                />
                <p className="text-right text-xs text-white/40">{formData.bio.length}/200</p>
              </div>
            </Section>

            {/* Tema */}
            <Section icon={<FaPalette className="h-4 w-4" />} title="Tema" description="Açık veya koyu görünüm">
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, theme: 'light' }))} className={optionBtn(formData.theme === 'light')}>
                  {activeDot(formData.theme === 'light')}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                    <span className="text-xl font-bold text-gray-900">Aa</span>
                  </div>
                  <span className="text-xs font-medium text-white">Light</span>
                </button>
                <button type="button" onClick={() => setFormData(prev => ({ ...prev, theme: 'dark' }))} className={optionBtn(formData.theme === 'dark')}>
                  {activeDot(formData.theme === 'dark')}
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-gray-900">
                    <span className="text-xl font-bold text-white">Aa</span>
                  </div>
                  <span className="text-xs font-medium text-white">Dark</span>
                </button>
              </div>
            </Section>

            {/* Düzen */}
            <Section icon={<FaThLarge className="h-4 w-4" />} title="Düzen" description="Linklerin diziliş şekli">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                <button type="button" onClick={() => setFormData({ ...formData, layout: 'classic' })} className={optionBtn(formData.layout === 'classic')}>
                  {activeDot(formData.layout === 'classic')}
                  <div className="w-full space-y-1 rounded-lg bg-white/10 p-2">
                    <div className="h-2 w-full rounded bg-white/30" />
                    <div className="h-2 w-3/4 rounded bg-white/20" />
                    <div className="h-2 w-full rounded bg-white/30" />
                  </div>
                  <span className="text-xs font-medium text-white">Klasik</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, layout: 'minimal' })} className={optionBtn(formData.layout === 'minimal')}>
                  {activeDot(formData.layout === 'minimal')}
                  <div className="flex h-[42px] w-full items-center justify-center rounded-lg bg-white/10">
                    <div className="h-7 w-7 rounded-full bg-white/30" />
                  </div>
                  <span className="text-xs font-medium text-white">Minimal</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, layout: 'card' })} className={optionBtn(formData.layout === 'card')}>
                  {activeDot(formData.layout === 'card')}
                  <div className="grid h-[42px] w-full grid-cols-2 gap-1 rounded-lg bg-white/10 p-2">
                    <div className="rounded bg-white/30" />
                    <div className="rounded bg-white/30" />
                    <div className="rounded bg-white/30" />
                    <div className="rounded bg-white/30" />
                  </div>
                  <span className="text-xs font-medium text-white">Kart</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, layout: 'elite' })} className={optionBtn(formData.layout === 'elite')}>
                  {activeDot(formData.layout === 'elite')}
                  <div className="flex h-[42px] w-full flex-col gap-1 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-2">
                    <div className="h-3 w-full rounded bg-gradient-to-r from-purple-400/40 to-pink-400/40" />
                    <div className="flex gap-1">
                      <div className="h-2 flex-1 rounded bg-purple-400/30" />
                      <div className="h-2 flex-1 rounded bg-pink-400/30" />
                    </div>
                  </div>
                  <span className="text-xs font-medium text-white">Elite</span>
                </button>
              </div>
            </Section>

            {/* Arka Plan */}
            <Section icon={<FaImage className="h-4 w-4" />} title="Arka Plan" description="Profil arka plan stili">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                <button type="button" onClick={() => setFormData({ ...formData, backgroundType: 'solid' })} className={optionBtn(formData.backgroundType === 'solid')}>
                  {activeDot(formData.backgroundType === 'solid')}
                  <div className="h-10 w-10 rounded-lg border border-white/10 bg-gray-900" />
                  <span className="text-[11px] font-medium text-white">Düz</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, backgroundType: 'gradient' })} className={optionBtn(formData.backgroundType === 'gradient')}>
                  {activeDot(formData.backgroundType === 'gradient')}
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-gray-900 to-gray-500" />
                  <span className="text-[11px] font-medium text-white">Gradyan</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, backgroundType: 'image' })} className={optionBtn(formData.backgroundType === 'image')}>
                  {activeDot(formData.backgroundType === 'image')}
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500" />
                  <span className="text-[11px] font-medium text-white">Görsel</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, backgroundType: 'gif' })} className={optionBtn(formData.backgroundType === 'gif')}>
                  {activeDot(formData.backgroundType === 'gif')}
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-gradient-to-br from-green-500 to-blue-500" />
                  <span className="text-[11px] font-medium text-white">GIF</span>
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, backgroundType: 'animated' })} className={optionBtn(formData.backgroundType === 'animated')}>
                  {activeDot(formData.backgroundType === 'animated')}
                  <div className="h-10 w-10 animate-pulse rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500" />
                  <span className="text-[11px] font-medium text-white">Animasyon</span>
                </button>
              </div>

              {formData.backgroundType === 'solid' && (
                <div className="mt-4 space-y-2">
                  <Label className="text-xs font-medium text-white/70">Arka Plan Rengi</Label>
                  {colorPickerRow(formData.backgroundColor, (v) => setFormData({ ...formData, backgroundColor: v }), '#030014')}
                </div>
              )}

              {formData.backgroundType === 'image' && (
                <div className="mt-4 space-y-2">
                  <Label className="text-xs font-medium text-white/70">Arka Plan Görseli</Label>
                  <input type="file" accept="image/*" onChange={handleBackgroundImageChange} className={fileInputClass} />
                  {formData.backgroundImage && (
                    <div className="relative mt-2 h-32 w-full overflow-hidden rounded-xl">
                      <img src={formData.backgroundImage} alt="Background" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, backgroundImage: '' })}
                        className="absolute right-2 top-2 rounded-lg bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
                      >
                        Kaldır
                      </button>
                    </div>
                  )}
                </div>
              )}

              {formData.backgroundType === 'gif' && (
                <div className="mt-4 space-y-2">
                  <Label className="text-xs font-medium text-white/70">Arka Plan GIF</Label>
                  <input type="file" accept="image/gif" onChange={handleBackgroundGifChange} className={fileInputClass} />
                  <p className="text-[11px] text-white/35">GIF formatı · Profilin arka planı olarak kullanılır</p>
                  {formData.backgroundGif && (
                    <div className="relative mt-2 h-32 w-full overflow-hidden rounded-xl">
                      <img src={formData.backgroundGif} alt="Background GIF" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, backgroundGif: '' })}
                        className="absolute right-2 top-2 rounded-lg bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur"
                      >
                        Kaldır
                      </button>
                    </div>
                  )}
                </div>
              )}
            </Section>

            {/* Arka Plan Müziği */}
            <Section icon={<FaMusic className="h-4 w-4" />} title="Arka Plan Müziği" description="Profil açılınca otomatik çalar">
              <input type="file" accept="audio/*" onChange={handleBackgroundMusicChange} className={fileInputClass} />
              <p className="mt-2 text-[11px] text-white/35">MP3, WAV, OGG · Profil açıldığında otomatik çalar</p>
              {formData.backgroundMusic && (
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                    <FaMusic className="h-4 w-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-white">Müzik yüklendi</p>
                    <p className="text-xs text-white/50">Profil açıldığında otomatik çalacak</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, backgroundMusic: '' })}
                    className="rounded-lg bg-red-500/90 px-2.5 py-1 text-xs font-medium text-white"
                  >
                    Kaldır
                  </button>
                </div>
              )}
            </Section>

            {/* Buton Stili */}
            <Section icon={<FaPaintBrush className="h-4 w-4" />} title="Buton Stili" description="Link butonlarının görünümü">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {([
                  { key: 'fill', node: <div className="flex h-9 w-full items-center justify-center rounded-lg bg-indigo-600 text-xs font-medium text-white">Fill</div> },
                  { key: 'outline', node: <div className="flex h-9 w-full items-center justify-center rounded-lg border-2 border-indigo-500 text-xs font-medium text-indigo-300">Outline</div> },
                  { key: 'shadow', node: <div className="flex h-9 w-full items-center justify-center rounded-lg bg-indigo-600 text-xs font-medium text-white shadow-lg shadow-indigo-500/50">Shadow</div> },
                  { key: 'gradient', node: <div className="flex h-9 w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-xs font-medium text-white">Gradient</div> },
                  { key: 'glass', node: <div className="flex h-9 w-full items-center justify-center rounded-lg border border-white/20 bg-white/10 text-xs font-medium text-white backdrop-blur">Glass</div> },
                  { key: 'neon', node: <div className="flex h-9 w-full items-center justify-center rounded-lg bg-indigo-600 text-xs font-medium text-white shadow-[0_0_18px_rgba(99,102,241,0.9)]">Neon</div> },
                ] as const).map((s) => (
                  <button key={s.key} type="button" onClick={() => setFormData({ ...formData, buttonStyle: s.key })} className={optionBtn(formData.buttonStyle === s.key)}>
                    {activeDot(formData.buttonStyle === s.key)}
                    {s.node}
                  </button>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <Label className="text-xs font-medium text-white/70">Buton Rengi</Label>
                {colorPickerRow(formData.buttonColor, (v) => setFormData({ ...formData, buttonColor: v }), '#6366f1')}
              </div>

              <div className="mt-4 space-y-2">
                <Label className="text-xs font-medium text-white/70">Yazı Rengi</Label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, buttonTextColor: 'auto' })}
                    className={`shrink-0 rounded-xl border px-4 text-sm font-medium transition-all ${
                      formData.buttonTextColor === 'auto'
                        ? 'border-indigo-400/50 bg-indigo-500/10 text-white ring-1 ring-indigo-400/30'
                        : 'border-white/15 text-white/60 hover:border-white/30'
                    }`}
                  >
                    Otomatik
                  </button>
                  <div className="relative h-11 w-12 shrink-0 overflow-hidden rounded-xl border border-white/15">
                    <input
                      type="color"
                      value={formData.buttonTextColor === 'auto' ? '#ffffff' : formData.buttonTextColor}
                      onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                      className="absolute -inset-2 h-[calc(100%+1rem)] w-[calc(100%+1rem)] cursor-pointer"
                    />
                  </div>
                  <Input
                    type="text"
                    value={formData.buttonTextColor === 'auto' ? 'Otomatik' : formData.buttonTextColor}
                    onChange={(e) => setFormData({ ...formData, buttonTextColor: e.target.value })}
                    className="flex-1 border-white/15 bg-white/[0.03] text-white"
                    placeholder="Otomatik"
                  />
                </div>
                <p className="text-[11px] text-white/35">Otomatik: parlak renklerde siyah, koyu renklerde beyaz</p>
              </div>
            </Section>

            {/* Köşe & Yazı Tipi */}
            <Section icon={<FaBorderAll className="h-4 w-4" />} title="Köşe & Yazı Tipi" description="Köşe yuvarlaklığı ve font">
              <Label className="text-xs font-medium text-white/70">Köşe Yuvarlaklığı</Label>
              <div className="mt-2 grid grid-cols-4 gap-3">
                {([
                  { key: 'none', label: 'Yok', cls: 'rounded-none' },
                  { key: 'small', label: 'Küçük', cls: 'rounded' },
                  { key: 'medium', label: 'Orta', cls: 'rounded-lg' },
                  { key: 'full', label: 'Tam', cls: 'rounded-full' },
                ] as const).map((r) => (
                  <button key={r.key} type="button" onClick={() => setFormData({ ...formData, cornerRadius: r.key })} className={optionBtn(formData.cornerRadius === r.key)}>
                    {activeDot(formData.cornerRadius === r.key)}
                    <div className={`h-8 w-full bg-white/20 ${r.cls}`} />
                    <span className="text-[11px] font-medium text-white">{r.label}</span>
                  </button>
                ))}
              </div>

              <Label className="mt-5 block text-xs font-medium text-white/70">Yazı Tipi</Label>
              <div className="mt-2 grid grid-cols-3 gap-3">
                {([
                  { key: 'sans', label: 'Sans Serif', cls: 'font-sans' },
                  { key: 'serif', label: 'Serif', cls: 'font-serif' },
                  { key: 'mono', label: 'Mono', cls: 'font-mono' },
                ] as const).map((f) => (
                  <button key={f.key} type="button" onClick={() => setFormData({ ...formData, fontStyle: f.key })} className={optionBtn(formData.fontStyle === f.key)}>
                    {activeDot(formData.fontStyle === f.key)}
                    <span className={`text-sm text-white ${f.cls}`}>{f.label}</span>
                  </button>
                ))}
              </div>
            </Section>

            {/* Yapışkan eylem çubuğu */}
            <div className="sticky bottom-4 z-30 flex gap-3 rounded-2xl border border-white/10 bg-black/60 p-3 shadow-2xl backdrop-blur-xl">
              <Button type="submit" disabled={loading} className="flex-1 gap-2 bg-white text-black hover:bg-white/90">
                <FaSave className="h-4 w-4" />
                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                disabled={loading}
                className="border-white/15 bg-transparent text-white hover:bg-white/10"
              >
                İptal
              </Button>
            </div>
          </form>

          {/* SAĞ: Canlı Önizleme */}
          <div className="order-1 flex justify-center lg:order-2 lg:sticky lg:top-24">
            <div className="relative">
              {/* Telefon çerçevesi */}
              <div className="relative h-[680px] w-[340px] rounded-[3rem] border-[10px] border-slate-950 bg-gradient-to-br from-slate-800 via-slate-900 to-black p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/5 via-transparent to-transparent" />

                {/* Ekran */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-black shadow-inner">
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2.5 z-50 h-7 w-28 -translate-x-1/2 rounded-full border border-gray-900 bg-black" />

                  {/* Durum çubuğu */}
                  <div className={`absolute left-0 right-0 top-0 z-40 flex h-12 items-center justify-between px-8 pt-2 ${previewText}`}>
                    <span className="text-sm font-semibold tracking-tight">9:41</span>
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Önizleme içeriği */}
                  <div className={`relative h-full overflow-hidden ${fontClasses[formData.fontStyle]}`}>
                    {renderPreviewBackground()}

                    <div className="scrollbar-hide relative z-10 h-full overflow-y-auto px-6 pb-10 pt-16">
                      {/* Avatar */}
                      <div className="mb-7 text-center">
                        <div className={`mx-auto mb-4 flex h-24 w-24 items-center justify-center overflow-hidden border-[3px] border-white/20 bg-gradient-to-br from-blue-500/20 to-purple-600/20 shadow-xl backdrop-blur-sm ${formData.layout === 'minimal' ? 'rounded-full' : radiusClasses[formData.cornerRadius]}`}>
                          {formData.avatar ? (
                            <img src={formData.avatar} alt="Avatar" className="h-full w-full object-cover" />
                          ) : (
                            <FaUser className="h-9 w-9 text-white/60" />
                          )}
                        </div>

                        <h2 className={`mb-2 text-xl font-bold tracking-tight ${previewText}`}>@{user.username}</h2>

                        {formData.bio && (
                          <p className={`mx-auto line-clamp-2 max-w-[280px] text-sm leading-relaxed ${previewTextMuted}`}>
                            {formData.bio}
                          </p>
                        )}
                      </div>

                      {/* Örnek linkler */}
                      <div className={`space-y-3 ${
                        formData.layout === 'card' ? 'grid grid-cols-2 gap-3' :
                        formData.layout === 'elite' ? 'grid grid-cols-1 gap-3' : ''
                      }`}>
                        {['Instagram', 'Twitter', 'GitHub'].map((platform, index) => (
                          <div
                            key={index}
                            className={`border-2 p-4 backdrop-blur-xl transition-all ${radiusClasses[formData.cornerRadius]} ${
                              formData.layout === 'elite' ? 'relative overflow-hidden' : ''
                            } cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98]`}
                            style={getPreviewButtonStyle()}
                          >
                            {formData.layout === 'elite' && (
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                            )}
                            <div className={`relative z-10 flex items-center gap-3 ${
                              formData.layout === 'card' ? 'flex-col text-center' : 'justify-between'
                            }`}>
                              <div className={`flex items-center gap-3 ${formData.layout === 'card' ? 'flex-col' : 'flex-1'}`}>
                                <div className={`${formData.layout === 'elite' ? 'h-6 w-6' : 'h-5 w-5'} shrink-0 rounded-full bg-white/30 shadow-sm`} />
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

                      {/* Önizleme rozeti */}
                      <div className="mt-10 text-center">
                        <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 shadow-lg backdrop-blur-md ${previewBadge}`}>
                          <span className="h-2 w-2 animate-pulse rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                          <span className="text-xs font-medium">Canlı Önizleme</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Home indicator */}
                  <div className="absolute bottom-2.5 left-1/2 z-50 h-1.5 w-32 -translate-x-1/2 rounded-full bg-white/40" />
                </div>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 -z-10 animate-pulse rounded-[3rem] bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
