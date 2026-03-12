import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          LinkHub 🔗
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Tüm sosyal medya linklerinizi tek bir yerde toplayın
        </p>
        
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 mb-6">
          <p className="text-white text-center text-lg font-semibold mb-3">
            Tailwind CSS Test
          </p>
          <button
            onClick={() => setCount(count + 1)}
            className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Tıklama Sayısı: {count}
          </button>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-200">
            ✅ AŞAMA 1 Tamamlandı
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg text-center">
              <p className="text-sm font-semibold">React</p>
              <p className="text-xs">✓ Çalışıyor</p>
            </div>
            <div className="bg-purple-100 text-purple-800 p-3 rounded-lg text-center">
              <p className="text-sm font-semibold">Vite</p>
              <p className="text-xs">✓ Çalışıyor</p>
            </div>
            <div className="bg-pink-100 text-pink-800 p-3 rounded-lg text-center">
              <p className="text-sm font-semibold">Tailwind</p>
              <p className="text-xs">✓ Çalışıyor</p>
            </div>
            <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg text-center">
              <p className="text-sm font-semibold">localStorage</p>
              <p className="text-xs">✓ Hazır</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            Sonraki Adım: <span className="font-semibold text-purple-600">AŞAMA 2 - Konsept ve Tasarım</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
