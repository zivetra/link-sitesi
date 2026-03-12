import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-2">
            LinkHub 🔗
          </CardTitle>
          <CardDescription className="text-lg">
            Tüm sosyal medya linklerinizi tek bir yerde toplayın
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Test Butonu */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border">
            <p className="text-center text-sm font-medium text-gray-700 mb-3">
              shadcn/ui + Tailwind CSS Test
            </p>
            <Button 
              onClick={() => setCount(count + 1)}
              className="w-full"
              size="lg"
            >
              Tıklama Sayısı: {count}
            </Button>
          </div>

          {/* Durum Kartları */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-semibold text-blue-900">React</p>
                <p className="text-xs text-blue-700">✓ Çalışıyor</p>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-semibold text-purple-900">Vite</p>
                <p className="text-xs text-purple-700">✓ Çalışıyor</p>
              </CardContent>
            </Card>
            
            <Card className="bg-pink-50 border-pink-200">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-semibold text-pink-900">Tailwind</p>
                <p className="text-xs text-pink-700">✓ Çalışıyor</p>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6 text-center">
                <p className="text-sm font-semibold text-green-900">shadcn/ui</p>
                <p className="text-xs text-green-700">✓ Hazır</p>
              </CardContent>
            </Card>
          </div>

          {/* Başarı Mesajı */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-2xl mb-2">✅</p>
                <p className="font-semibold text-green-900">AŞAMA 1 & 2 Tamamlandı</p>
                <p className="text-sm text-green-700 mt-1">
                  Konsept hazır, şimdi sayfaları kodlayabiliriz
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sonraki Adım */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm text-gray-600">
              Sonraki Adım: <span className="font-semibold text-gray-900">Sayfa Tasarımları</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
