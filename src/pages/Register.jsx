import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link2, AlertCircle } from 'lucide-react'
import { registerUser } from '@/utils/storage'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = (e) => {
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity">
            <Link2 className="w-5 h-5 text-gray-900" />
            <span className="text-gray-900">LinkHub</span>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="border shadow-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Hesap Oluştur</CardTitle>
            <CardDescription className="text-gray-600">
              Ücretsiz hesabınızı oluşturun ve linklerinizi paylaşmaya başlayın
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">Kullanıcı Adı</Label>
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
                <p className="text-xs text-gray-500">
                  Profiliniz: linkhub.com/{formData.username || 'kullaniciadi'}
                </p>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email</Label>
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
                <Label htmlFor="password" className="text-sm font-medium">Şifre</Label>
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
                <Label htmlFor="confirmPassword" className="text-sm font-medium">Şifre Tekrar</Label>
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
                className="w-full h-10 bg-gray-900 hover:bg-gray-800" 
                disabled={loading}
              >
                {loading ? 'Hesap Oluşturuluyor...' : 'Hesap Oluştur'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-gray-900 hover:underline font-medium">
                Giriş Yapın
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
