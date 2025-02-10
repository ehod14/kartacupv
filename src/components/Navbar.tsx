import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Trophy, UserPlus, LogOut, House, Info } from 'lucide-react'

export default function Navbar() {
  const { logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const navItems = [
    { path: '/', icon: <House className="h-5 w-5" />, label: 'Beranda' },
    { path: '/tournament', icon: <Trophy className="h-5 w-5" />, label: 'Info Turnamen' },
    { path: '/registration', icon: <UserPlus className="h-5 w-5" />, label: 'Pendaftaran' },
    { path: '/about', icon: <Info className="h-5 w-5" />, label: 'Tentang' },
  ]

  return (
    <nav className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-white"></h1>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                  isActive(item.path)
                    ? 'bg-white text-green-600 shadow-md'
                    : 'hover:bg-green-600 text-white'
                }`}
              >
                {item.icon}
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-red-500 transition-all"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
