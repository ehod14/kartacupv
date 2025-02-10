import { Trophy, Calendar, Users } from 'lucide-react'

export default function HomePage() {
  const finalists = [
    {
      image: "https://mocha-cdn.com/0194eb83-7c35-73ba-952d-1c23c2d30592/ca3b7d30-4754-4a0d-aeb9-bb5cb7bb4c8.jpeg",
      title: "Finalis 1"
    },
    {
      image: "https://mocha-cdn.com/0194eb83-7c35-73ba-952d-1c23c2d30592/d96dfd38-4ddc-478d-94af-bbd9782d65d.jpeg",
      title: "Finalis 2"
    },
    {
      image: "https://mocha-cdn.com/0194eb83-7c35-73ba-952d-1c23c2d30592/f0cf41b7-500d-48f9-b1b6-1943153c43a.jpeg",
      title: "Finalis 3"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">KARTA CUP V</h1>
          <p className="text-xl mb-8">Turnamen Sepak Bola Terbesar 2025</p>
          <p className="text-lg max-w-2xl mx-auto">
            Selamat datang di turnamen sepak bola bergengsi KARTA CUP V. 
            Kompetisi ini merupakan ajang unjuk kebolehan tim-tim terbaik 
            untuk meraih gelar juara dan hadiah menarik.
          </p>
        </div>
      </div>

      {/* Quick Info Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Total Hadiah Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-6">
                <Trophy className="h-12 w-12 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Total Hadiah</h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">Rp 10.000.000</p>
                <p className="text-gray-500 mt-2">Juara 1, 2, dan 3</p>
              </div>
            </div>
          </div>

          {/* Periode Turnamen Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <Calendar className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Periode Turnamen</h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">Juli - Agustus</p>
                <p className="text-gray-500 mt-2">2025</p>
              </div>
            </div>
          </div>

          {/* Kuota Tim Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-all duration-300">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <Users className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Kuota Tim</h3>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">30 Tim</p>
                <p className="text-gray-500 mt-2">Pendaftaran Terbatas</p>
              </div>
            </div>
          </div>
        </div>

        {/* Finalis KARTA CUP IV 2024 Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Finalis KARTA CUP IV 2024</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mengenang pertandingan sengit dan semangat sportivitas dari para finalis tahun lalu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {finalists.map((finalist, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={finalist.image}
                    alt={finalist.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{finalist.title}</h3>
                    <p className="text-green-200">KARTA CUP IV 2024</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}
