import { useState, FormEvent, ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaLink, FaExclamationCircle } from 'react-icons/fa'
import { loginUser } from '@/utils/storage'

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
    const result = loginUser(formData.usernameOrEmail, formData.password)
    
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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity">
            <FaLink className="w-5 h-5 text-gray-900" />
            <span className="text-gray-900">LinkHub</span>
          </Link>
        </div>

        {/* Form Card */}
        <Card className="border shadow-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Giriş Yap</CardTitle>
            <CardDescription className="text-gray-600">
              Hesabınıza giriş yapın ve linklerinizi yönetin
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username or Email */}
              <div className="space-y-2">
                <Label htmlFor="usernameOrEmail" className="text-sm font-medium">Kullanıcı Adı veya Email</Label>
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

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-10 bg-gray-900 hover:bg-gray-800" 
                disabled={loading}
              >
                {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>

            {/* Demo Account Info */}
            <div className="mt-4 p-3 bg-gray-50 border rounded-lg">
              <p className="text-xs text-gray-700 font-medium mb-1">Demo Hesap:</p>
              <p className="text-xs text-gray-600">Kullanıcı: demo</p>
              <p className="text-xs text-gray-600">Şifre: demo123</p>
            </div>

            {/* Register Link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Hesabınız yok mu?{' '}
              <Link to="/register" className="text-gray-900 hover:underline font-medium">
                Hesap Oluşturun
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
