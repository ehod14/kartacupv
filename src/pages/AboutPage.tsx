import { Trophy, Medal, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            KARTA CUP V
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Turnamen sepak bola tahunan yang telah mencapai edisi ke-5, 
            menjadi wadah bagi talenta-talenta sepak bola untuk berkompetisi.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-12 px-4">
        {/* Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Trophy className="h-10 w-10 text-yellow-500 mb-4" />
            <h3 className="text-lg font-bold text-green-800 mb-2">
              Total Hadiah
            </h3>
            <p className="text-gray-600">
              Rp 10.000.000 untuk para pemenang
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Medal className="h-10 w-10 text-green-500 mb-4" />
            <h3 className="text-lg font-bold text-green-800 mb-2">
              Periode Event
            </h3>
            <p className="text-gray-600">
              Juli - Agustus 2025
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Users className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="text-lg font-bold text-green-800 mb-2">
              Partisipan
            </h3>
            <p className="text-gray-600">
              13 Club Terbaik
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
            <Target className="h-10 w-10 text-purple-500 mb-4" />
            <h3 className="text-lg font-bold text-green-800 mb-2">
              Kategori
            </h3>
            <p className="text-gray-600">
              Open Tournament
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Visi Kami
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi turnamen sepak bola amatir terkemuka yang mendorong 
              perkembangan bakat sepak bola lokal dan mempererat hubungan 
              antar komunitas melalui olahraga.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <p className="text-gray-600">
                  Mendukung pengembangan bakat muda dalam sepak bola
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <p className="text-gray-600">
                  Membangun komunitas sepak bola yang solid
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                <p className="text-gray-600">
                  Menciptakan kompetisi yang profesional dan berkualitas
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Misi Kami
            </h2>
            <div className="space-y-6">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">
                  Kualitas Kompetisi
                </h3>
                <p className="text-gray-600">
                  Menyelenggarakan turnamen dengan standar profesional dan 
                  sistem pertandingan yang fair
                </p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">
                  Pengembangan Bakat
                </h3>
                <p className="text-gray-600">
                  Memberikan platform bagi pemain lokal untuk menunjukkan 
                  kemampuan mereka
                </p>
              </div>

              <div className="p-4 bg-teal-50 rounded-lg">
                <h3 className="font-bold text-green-800 mb-2">
                  Pembinaan Sportivitas
                </h3>
                <p className="text-gray-600">
                  Menanamkan nilai-nilai sportivitas dan fair play dalam 
                  setiap pertandingan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
