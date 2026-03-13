import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FaLink } from 'react-icons/fa'

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-transparent backdrop-blur-xl border-b border-white/10" />
      <div className="relative container mx-auto px-6 py-5 flex items-center justify-between max-w-7xl">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <FaLink className="w-4 h-4 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">LinkHub</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link to="/login">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white/90 hover:text-white hover:bg-white/10 font-medium transition-all"
            >
              Giriş Yap
            </Button>
          </Link>
          <Link to="/register">
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
            >
              Ücretsiz Başla
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
