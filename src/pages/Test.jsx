export default function Test() {
  return (
    <div className="min-h-screen bg-red-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tailwind Test
        </h1>
        <p className="text-gray-600 mb-4">
          Eğer bu metin düzgün görünüyorsa Tailwind çalışıyor
        </p>
        <div className="flex gap-4">
          <div className="w-20 h-20 bg-blue-500 rounded"></div>
          <div className="w-20 h-20 bg-green-500 rounded"></div>
          <div className="w-20 h-20 bg-purple-500 rounded"></div>
        </div>
      </div>
    </div>
  )
}
