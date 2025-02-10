import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Trophy, Calendar, Users, LogOut } from 'lucide-react'
import RegistrationForm from '../components/RegistrationForm'

export default function MainPage() {
  const { logout } = useAuth()
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-green-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">KARTA CUP V</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 hover:text-yellow-300 transition"
          >
            <LogOut className="h-5 w-5" />
            Keluar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">KARTA CUP V</h1>
          <p className="text-xl mb-8">Turnamen Sepak Bola Terbesar 2025</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-yellow-500 text-green-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition"
          >
            Daftar Sekarang
          </button>
        </div>
      </div>

      {/* Tournament Info */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h2 className="text-xl font-bold mb-4">Jadwal Turnamen</h2>
            <p className="text-gray-600">Juli - Agustus 2025</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-bold mb-4">Total Hadiah</h2>
            <p className="text-gray-600">Rp 10.000.000</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-green-600" />
            <h2 className="text-xl font-bold mb-4">Pendaftaran Tim</h2>
            <p className="text-gray-600">Terbuka untuk semua tim</p>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-green-800">Pendaftaran Tim</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <RegistrationForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
