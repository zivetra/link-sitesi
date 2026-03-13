import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaLink, FaExclamationCircle } from 'react-icons/fa'
import { registerUser } from '@/utils/storage'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validasyon
    if (!formData.username || !formData.email || !formData.password) {
      setError('Lütfen tüm alanları doldurun')
      setLoading(false)
      return
    }

    if (formData.username.length < 3) {
      setError('Kullanıcı adı en az 3 karakter olmalı')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalı')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    // Email validasyonu
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Geçerli bir email adresi girin')
      setLoading(false)
      return
    }

    // Kayıt işlemi
    const result = registerUser(formData.username, formData.email, formData.password)
    
    if (result.success) {
      // Otomatik giriş yap
      setTimeout(() => {
        navigate('/dashboard')
      }, 500)
    } else {
      setError(result.message)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedShaderBackground />
      <div className="w-full max-w-md space-y-8 relative z-10">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity">
            <FaLink className="w-5 h-5 text-white" />
            <span className="text-white">LinkHub</span>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="border border-white/10 shadow-sm bg-white/5 backdrop-blur-md">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-white">Hesap Oluştur</CardTitle>
            <CardDescription className="text-white/70">
              Ücretsiz hesabınızı oluşturun ve linklerinizi paylaşmaya başlayın
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-white">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="kullaniciadi"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-10"
                />
                <p className="text-xs text-white/60">
                  Profiliniz: linkhub.com/{formData.username || 'kullaniciadi'}
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-white">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-10"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-white">Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-10"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-white">Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  className="h-10"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-10 bg-white text-black hover:bg-white/90" 
                disabled={loading}
              >
                {loading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-white/70">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-white hover:underline font-medium">
                Giriş Yapın
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-white/70 hover:text-white transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
