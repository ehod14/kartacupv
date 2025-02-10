import { useState } from 'react'
import RegistrationForm from '../components/RegistrationForm'
import { ClipboardList, UsersRound, Sparkles, Squircle } from 'lucide-react'

export default function RegistrationPage() {
  const [showForm, setShowForm] = useState(false)
  const registrations = JSON.parse(localStorage.getItem('registrations') || '[]')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Header Section */}
      <div className="text-center mb-12 max-w-4xl mx-auto">
        <div className="inline-flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-8 w-8 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Pendaftaran Tim
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Bergabunglah dalam kompetisi KARTA CUP V dan jadilah bagian dari sejarah turnamen sepak bola bergengsi ini.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Registration Card */}
        <div className="bg-white backdrop-blur-lg bg-opacity-90 rounded-2xl shadow-xl p-8 border border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Form Pendaftaran
                </h2>
                <p className="text-gray-500">Periode Juli - Agustus 2025</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Daftar Sekarang
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Informasi Biaya</h3>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100">
                <p className="text-2xl font-bold text-purple-600">Rp 1.000.000</p>
                <p className="text-gray-600">per tim</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Persyaratan</h3>
              <ul className="space-y-3">
                {['Daftar nama pemain', 'Foto pemain', 'Bukti pembayaran'].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Registered Teams */}
        {registrations.length > 0 && (
          <div className="bg-white backdrop-blur-lg bg-opacity-90 rounded-2xl shadow-xl p-8 border border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <UsersRound className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Tim Terdaftar</h2>
                <p className="text-gray-500">{registrations.length} tim sudah mendaftar</p>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {registrations.map((reg: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100"
                >
                  <p className="font-bold text-lg text-gray-800">{reg.teamName}</p>
                  <p className="text-gray-600">Manager: {reg.managerName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Notice */}
        <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
          <div className="flex items-start gap-3">
            <Squircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">Penting!</h3>
              <p className="text-yellow-700">
                Pastikan semua data yang diisi adalah benar dan valid. Tim panitia akan melakukan verifikasi 
                terhadap setiap pendaftaran yang masuk.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                  Pendaftaran Tim
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
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
