import React, { useState } from 'react';
import type { UserData } from '../types';
import { SparkleIcon } from './icons/SparkleIcon';

interface PersonalityFormProps {
  onSubmit: (data: UserData) => void;
  isLoading: boolean;
}

export const PersonalityForm: React.FC<PersonalityFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState('');
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dob.trim() || !timeOfBirth.trim() || !placeOfBirth.trim() || !gender || !email.trim()) {
      setError('Semua data wajib diisi ya, biar analisisnya akurat!');
      return;
    }
    setError('');
    onSubmit({ name, dob, timeOfBirth, placeOfBirth, gender, email });
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
           <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
              Nama Kamu
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Cahyono"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              disabled={isLoading}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-1">
                Tanggal Lahir
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="timeOfBirth" className="block text-sm font-semibold text-gray-700 mb-1">
                Jam Lahir
              </label>
              <input
                type="time"
                id="timeOfBirth"
                value={timeOfBirth}
                onChange={(e) => setTimeOfBirth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="placeOfBirth" className="block text-sm font-semibold text-gray-700 mb-1">
                Tempat Lahir
              </label>
              <input
                type="text"
                id="placeOfBirth"
                placeholder="Contoh: Jakarta"
                value={placeOfBirth}
                onChange={(e) => setPlaceOfBirth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-700 mb-1">
                Jenis Kelamin
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition bg-white"
                disabled={isLoading}
              >
                <option value="" disabled>Pilih...</option>
                <option value="Pria">Pria</option>
                <option value="Wanita">Wanita</option>
              </select>
            </div>
          </div>
           <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Kamu
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Contoh: budi@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              disabled={isLoading}
            />
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 active:scale-95 transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Menganalisis...
            </>
          ) : (
            <>
              <SparkleIcon />
              Lihat Analisis Dirimu
            </>
          )}
        </button>
      </form>
    </div>
  );
};
