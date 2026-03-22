import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaLink, FaExclamationCircle } from 'react-icons/fa'
import { loginUser } from '@/utils/storage'
import AnimatedShaderBackground from '@/components/ui/animated-shader-background'

interface FormData {
  usernameOrEmail: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    usernameOrEmail: '',
    password: ''
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validasyon
    if (!formData.usernameOrEmail || !formData.password) {
      setError('Lütfen tüm alanları doldurun')
      setLoading(false)
      return
    }

    // Giriş işlemi
    const result = await loginUser(formData.usernameOrEmail, formData.password)
    
    if (result.success) {
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
            <CardTitle className="text-2xl font-bold text-white">Giriş Yap</CardTitle>
            <CardDescription className="text-white/70">
              Hesabınıza giriş yapın ve linklerinizi yönetin
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

              {/* Username or Email */}
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail" className="text-sm font-medium text-white">Kullanıcı Adı veya Email</Label>
                <Input
                  id="usernameOrEmail"
                  name="usernameOrEmail"
                  type="text"
                  placeholder="kullaniciadi veya email"
                  value={formData.usernameOrEmail}
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-10 bg-white text-black hover:bg-white/90" 
                disabled={loading}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>

            {/* Demo Account Info */}
            <div className="mt-4 p-3 bg-white/10 border border-white/20 rounded-lg">
              <p className="text-xs text-white font-medium mb-1">Demo Hesap:</p>
              <p className="text-xs text-white/70">Kullanıcı: demo</p>
              <p className="text-xs text-white/70">Şifre: demo123</p>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm text-white/70">
              Hesabınız yok mu?{' '}
              <Link to="/register" className="text-white hover:underline font-medium">
                Hesap Oluşturun
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
