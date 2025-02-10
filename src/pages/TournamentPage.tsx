import { Trophy, Calendar, Users, Medal, MapPin, Clock, Target, DollarSign } from 'lucide-react'

export default function TournamentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-400 to-yellow-400 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Info Turnamen KARTA CUP V
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Turnamen sepak bola bergengsi dengan total hadiah jutaan rupiah
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Main Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <h2 className="text-xl font-bold mb-2 text-center text-green-800">Jadwal</h2>
            <div className="text-center text-gray-600">
              <p className="font-semibold">Juli - Agustus</p>
              <p>2025</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
            <h2 className="text-xl font-bold mb-2 text-center text-green-800">Hadiah</h2>
            <div className="text-center text-gray-600">
              <p className="font-semibold">Total Hadiah</p>
              <p>Rp 10.000.000</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-500" />
            <h2 className="text-xl font-bold mb-2 text-center text-green-800">Kuota</h2>
            <div className="text-center text-gray-600">
              <p className="font-semibold">Maksimal</p>
              <p>30 Tim</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Target className="h-12 w-12 mx-auto mb-4 text-purple-500" />
            <h2 className="text-xl font-bold mb-2 text-center text-green-800">Kategori</h2>
            <div className="text-center text-gray-600">
              <p className="font-semibold">Open</p>
              <p>Tournament</p>
            </div>
          </div>
        </div>

        {/* Detailed Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Prize Details */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="h-8 w-8 text-yellow-500" />
              <h2 className="text-2xl font-bold text-green-800">Detail Hadiah</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-yellow-50 p-4 rounded-lg">
                <Medal className="h-8 w-8 text-yellow-500" />
                <div>
                  <p className="font-bold text-lg text-green-800">Juara 1</p>
                  <p className="text-gray-600">Rp 5.000.000 + Trofi</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                <Medal className="h-8 w-8 text-gray-400" />
                <div>
                  <p className="font-bold text-lg text-green-800">Juara 2</p>
                  <p className="text-gray-600">Rp 3.000.000 + Trofi</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg">
                <Medal className="h-8 w-8 text-orange-500" />
                <div>
                  <p className="font-bold text-lg text-green-800">Juara 3</p>
                  <p className="text-gray-600">Rp 2.000.000 + Trofi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Venue Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-bold text-green-800">Info Lokasi & Waktu</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-bold text-lg text-green-800">Lokasi Pertandingan</p>
                    <p className="text-gray-600">Lapangan Sepakbola Gelora Babakan Girihieum</p>
                    <p className="text-sm text-gray-500 mt-1">Kp Girihieum Desa Pangauban</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="font-bold text-lg text-green-800">Jadwal Pertandingan</p>
                    <p className="text-gray-600">Setiap hari: 13.00 - 17.15 WIB</p>
                    <p className="text-sm text-gray-500 mt-1">Technical Meeting: 1 Juli 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Informasi Lebih Lanjut</h2>
            <p className="text-gray-600 mb-6">
              Untuk informasi lebih detail, silakan hubungi panitia turnamen:
            </p>
            <div className="inline-block bg-green-50 px-6 py-3 rounded-full">
              <p className="font-bold text-green-800">WhatsApp: +62 852-1234-0232</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
