import { useForm, useFieldArray } from 'react-hook-form'
import { Info, Plus, Trash2, Squircle, Check, X } from 'lucide-react'
import { ref, push } from 'firebase/database'
import { db } from '../services/firebase'
import { useState } from 'react'

interface RegistrationFormProps {
  onClose: () => void
}

interface PlayerData {
  fullName: string
  address: string
  age: number
  position: string
  jerseyNumber: number
  selfiePhoto: FileList
  idCard: FileList
  familyCard: FileList
  whatsappNumber: string
}

interface FormData {
  teamName: string
  teamAddress: string
  mainJerseyColor: string
  alternateJerseyColor: string
  managerName: string
  managerPhone: string
  managerSelfie: FileList
  managerKtp: FileList
  official1Name: string
  official1Phone: string
  official1Selfie: FileList
  official1Ktp: FileList
  official2Name: string
  official2Phone: string
  official2Selfie: FileList
  official2Ktp: FileList
  players: PlayerData[]
}

const TEAM_NAMES = [
  'ARUMBA FC A', 'ARUMBA FC B', 'ARUMBA FC C',
  'BALLPASS FC A', 'BALLPASS FC B', 'BALLPASS FC C',
  'DL GUNS FC A', 'DL GUNS FC B', 'DL GUNS FC C',
  'GANESA FC A', 'GANESA FC B', 'GANESA FC C',
  'LEMKA FC A', 'LEMKA FC B', 'LEMKA FC C',
  'PALAPA FC A', 'PALAPA FC B', 'PALAPA FC C',
  'PELANA FC A', 'PELANA FC B', 'PELANA FC C',
  'PERKID FC A', 'PERKID FC B', 'PERKID FC C',
  'PERU FC A', 'PERU FC B', 'PERU FC C',
  'PORBA JAYA A', 'PORBA JAYA B', 'PORBA JAYA C',
  'PUTRA MANDIRI FC A', 'PUTRA MANDIRI FC B', 'PUTRA MANDIRI FC C',
  'REMAJA PUTRA FC A', 'REMAJA PUTRA FC B', 'REMAJA PUTRA FC C',
  'TOCXNET FC A', 'TOCXNET FC B', 'TOCXNET FC C'
]

const PLAYER_POSITIONS = [
  'Goalkeeper',
  'Defender',
  'Midfielder',
  'Forward'
]

const validatePhoneNumber = (value: string) => {
  const phoneRegex = /^(\+62|62|0)[2-9][0-9]{8,11}$/
  return phoneRegex.test(value) || 'Nomor telepon harus menggunakan format Indonesia (+62/62/0)'
}

const validateFileSize = (files: FileList) => {
  return files[0]?.size <= 1024 * 1024 || 'Ukuran file maksimal 1 MB'
}

const validateAge = (value: number) => {
  return (value > 0 && value <= 70) || 'Usia maksimal 70 tahun'
}

export default function RegistrationForm({ onClose }: RegistrationFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formDataToConfirm, setFormDataToConfirm] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      players: [{}]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players"
  })

  const handleConfirmSubmit = async () => {
    if (!formDataToConfirm) return

    setIsSubmitting(true)
    try {
      // Convert File objects to base64 strings before storing
      const processFiles = async () => {
        const fileToBase64 = async (file: File): Promise<string> => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = error => reject(error)
          })
        }

        // Process officials' files
        const processedData = {
          ...formDataToConfirm,
          managerSelfie: await fileToBase64(formDataToConfirm.managerSelfie[0]),
          managerKtp: await fileToBase64(formDataToConfirm.managerKtp[0]),
          official1Selfie: await fileToBase64(formDataToConfirm.official1Selfie[0]),
          official1Ktp: await fileToBase64(formDataToConfirm.official1Ktp[0]),
          official2Selfie: await fileToBase64(formDataToConfirm.official2Selfie[0]),
          official2Ktp: await fileToBase64(formDataToConfirm.official2Ktp[0]),
          // Process players' files
          players: await Promise.all(formDataToConfirm.players.map(async (player: any) => ({
            ...player,
            selfiePhoto: await fileToBase64(player.selfiePhoto[0]),
            idCard: await fileToBase64(player.idCard[0]),
            familyCard: await fileToBase64(player.familyCard[0]),
          }))),
          timestamp: new Date().toISOString()
        }

        // Save to Firebase
        const registrationsRef = ref(db, 'registrations')
        await push(registrationsRef, processedData)
        
        alert('Pendaftaran berhasil!')
        onClose()
      }

      await processFiles()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
      setShowConfirmation(false)
    }
  }

  const onSubmit = (data: FormData) => {
    setFormDataToConfirm(data)
    setShowConfirmation(true)
  }

  const renderFileInput = (
    name: keyof FormData,
    label: string,
    accept = "image/*"
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        {...register(name, {
          required: 'File harus diupload',
          validate: validateFileSize
        })}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]?.message}</p>
      )}
    </div>
  )

  const renderPlayerFileInput = (
    index: number,
    fieldName: keyof PlayerData,
    label: string,
    accept = "image/*"
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        {...register(`players.${index}.${fieldName}`, {
          required: 'File harus diupload',
          validate: validateFileSize
        })}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
      />
      {errors.players?.[index]?.[fieldName] && (
        <p className="text-red-500 text-sm mt-1">{errors.players[index][fieldName]?.message}</p>
      )}
    </div>
  )

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Tim
          </label>
          <select
            {...register('teamName', { required: 'Pilih nama tim' })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="">Pilih Tim</option>
            {TEAM_NAMES.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          {errors.teamName && (
            <p className="text-red-500 text-sm mt-1">{errors.teamName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Lengkap Tim
          </label>
          <textarea
            {...register('teamAddress', { required: 'Alamat tim harus diisi' })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            rows={3}
          />
          {errors.teamAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.teamAddress.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Warna Jersey Utama
          </label>
          <input
            {...register('mainJerseyColor', { required: 'Warna jersey utama harus diisi' })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          {errors.mainJerseyColor && (
            <p className="text-red-500 text-sm mt-1">{errors.mainJerseyColor.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Warna Jersey Cadangan
          </label>
          <input
            {...register('alternateJerseyColor', { required: 'Warna jersey cadangan harus diisi' })}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          {errors.alternateJerseyColor && (
            <p className="text-red-500 text-sm mt-1">{errors.alternateJerseyColor.message}</p>
          )}
        </div>

        {/* Manager Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-green-800 font-semibold">
            <Info className="h-5 w-5" />
            <h3>Data Manager</h3>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Manager
            </label>
            <input
              {...register('managerName', { required: 'Nama manager harus diisi' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.managerName && (
              <p className="text-red-500 text-sm mt-1">{errors.managerName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor WhatsApp Manager
            </label>
            <input
              {...register('managerPhone', {
                required: 'Nomor WhatsApp harus diisi',
                validate: validatePhoneNumber
              })}
              placeholder="+628123456789"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.managerPhone && (
              <p className="text-red-500 text-sm mt-1">{errors.managerPhone.message}</p>
            )}
          </div>

          {renderFileInput('managerSelfie', 'Foto Selfie Manager')}
          {renderFileInput('managerKtp', 'Foto KTP Manager')}
        </div>

        {/* Official 1 Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-green-800 font-semibold">
            <Info className="h-5 w-5" />
            <h3>Data Official 1</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Official 1
            </label>
            <input
              {...register('official1Name', { required: 'Nama official 1 harus diisi' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.official1Name && (
              <p className="text-red-500 text-sm mt-1">{errors.official1Name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor WhatsApp Official 1
            </label>
            <input
              {...register('official1Phone', {
                required: 'Nomor WhatsApp harus diisi',
                validate: validatePhoneNumber
              })}
              placeholder="+628123456789"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.official1Phone && (
              <p className="text-red-500 text-sm mt-1">{errors.official1Phone.message}</p>
            )}
          </div>

          {renderFileInput('official1Selfie', 'Foto Selfie Official 1')}
          {renderFileInput('official1Ktp', 'Foto KTP Official 1')}
        </div>

        {/* Official 2 Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center gap-2 text-green-800 font-semibold">
            <Info className="h-5 w-5" />
            <h3>Data Official 2</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Official 2
            </label>
            <input
              {...register('official2Name', { required: 'Nama official 2 harus diisi' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.official2Name && (
              <p className="text-red-500 text-sm mt-1">{errors.official2Name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nomor WhatsApp Official 2
            </label>
            <input
              {...register('official2Phone', {
                required: 'Nomor WhatsApp harus diisi',
                validate: validatePhoneNumber
              })}
              placeholder="+628123456789"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
            {errors.official2Phone && (
              <p className="text-red-500 text-sm mt-1">{errors.official2Phone.message}</p>
            )}
          </div>

          {renderFileInput('official2Selfie', 'Foto Selfie Official 2')}
          {renderFileInput('official2Ktp', 'Foto KTP Official 2')}
        </div>

        {/* Players Section */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-800 font-semibold">
              <Info className="h-5 w-5" />
              <h3>Data Pemain</h3>
            </div>
            {fields.length < 20 && (
              <button
                type="button"
                onClick={() => append({})}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                <Plus className="h-4 w-4" />
                Tambah Pemain
              </button>
            )}
          </div>

          {fields.length === 0 && (
            <div className="flex items-center gap-2 p-4 bg-yellow-50 text-yellow-800 rounded-md">
              <Squircle className="h-5 w-5" />
              <p>Minimal 1 pemain harus didaftarkan</p>
            </div>
          )}

          {fields.map((field, index) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-green-800">Pemain #{index + 1}</h4>
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    {...register(`players.${index}.fullName`, {
                      required: 'Nama lengkap harus diisi'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.players?.[index]?.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.players[index].fullName?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usia
                  </label>
                  <input
                    type="number"
                    {...register(`players.${index}.age`, {
                      required: 'Usia harus diisi',
                      validate: validateAge
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.players?.[index]?.age && (
                    <p className="text-red-500 text-sm mt-1">{errors.players[index].age?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Posisi
                  </label>
                  <select
                    {...register(`players.${index}.position`, {
                      required: 'Posisi harus dipilih'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="">Pilih Posisi</option>
                    {PLAYER_POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>{pos}</option>
                    ))}
                  </select>
                  {errors.players?.[index]?.position && (
                    <p className="text-red-500 text-sm mt-1">{errors.players[index].position?.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nomor Punggung
                  </label>
                  <input
                    type="number"
                    {...register(`players.${index}.jerseyNumber`, {
                      required: 'Nomor punggung harus diisi'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  {errors.players?.[index]?.jerseyNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.players[index].jerseyNumber?.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alamat (sesuai KTP)
                </label>
                <textarea
                  {...register(`players.${index}.address`, {
                    required: 'Alamat harus diisi'
                  })}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  rows={2}
                />
                {errors.players?.[index]?.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.players[index].address?.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomor WhatsApp
                </label>
                <input
                  {...register(`players.${index}.whatsappNumber`, {
                    required: 'Nomor WhatsApp harus diisi',
                    validate: validatePhoneNumber
                  })}
                  placeholder="+628123456789"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                {errors.players?.[index]?.whatsappNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.players[index].whatsappNumber?.message}</p>
                )}
              </div>

              {renderPlayerFileInput(index, 'selfiePhoto', 'Foto Selfie Memakai Jersey')}
              {renderPlayerFileInput(index, 'idCard', 'Foto KTP')}
              {renderPlayerFileInput(index, 'familyCard', 'Foto KK / Dokumen Lainnya')}
            </div>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Daftar
          </button>
        </div>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-green-800">Konfirmasi Pendaftaran</h2>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">Data Tim</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Nama Tim:</span> {formDataToConfirm?.teamName}</p>
                    <p><span className="font-medium">Alamat Tim:</span> {formDataToConfirm?.teamAddress}</p>
                    <p><span className="font-medium">Warna Jersey Utama:</span> {formDataToConfirm?.mainJerseyColor}</p>
                    <p><span className="font-medium">Warna Jersey Cadangan:</span> {formDataToConfirm?.alternateJerseyColor}</p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Data Official</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Manager:</p>
                      <p>{formDataToConfirm?.managerName} - {formDataToConfirm?.managerPhone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Official 1:</p>
                      <p>{formDataToConfirm?.official1Name} - {formDataToConfirm?.official1Phone}</p>
                    </div>
                    <div>
                      <p className="font-medium">Official 2:</p>
                      <p>{formDataToConfirm?.official2Name} - {formDataToConfirm?.official2Phone}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">Data Pemain ({formDataToConfirm?.players.length} orang)</h3>
                  <div className="space-y-4">
                    {formDataToConfirm?.players.map((player: any, index: number) => (
                      <div key={index} className="border-b border-purple-100 pb-2">
                        <p className="font-medium">Pemain #{index + 1}</p>
                        <p>{player.fullName} - {player.position}</p>
                        <p>Nomor: {player.jerseyNumber} | Usia: {player.age}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
                  disabled={isSubmitting}
                >
                  Kembali
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⌛</span>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Check className="h-5 w-5" />
                      Konfirmasi & Kirim
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
