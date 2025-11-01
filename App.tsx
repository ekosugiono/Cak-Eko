
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PersonalityForm } from './components/PersonalityForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { generateAnalysis } from './services/geminiService';
import type { UserData } from './types';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const handleGenerateAnalysis = useCallback(async (userData: UserData) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setUserName(null);

    try {
      setUserName(userData.name);
      const result = await generateAnalysis(userData);
      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(
          'Waduh, ada sedikit kendala nih. Coba refresh halaman dan ulangi lagi ya.'
        );
      } else {
        setError('Terjadi kesalahan yang tidak diketahui.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
       <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-50 via-white to-cyan-50 opacity-50 z-0"></div>
       <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
        <Header />
        
        <div className="w-full max-w-2xl mx-auto">
          <PersonalityForm onSubmit={handleGenerateAnalysis} isLoading={isLoading} />

          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} />}
          {analysis && userName && (
            <div className="mt-8">
              <AnalysisDisplay content={analysis} userName={userName} />
            </div>
          )}
        </div>

        <footer className="w-full text-center p-4 mt-12 text-gray-500 text-sm">
          <p>Dibuat dengan ❤️ oleh AI untuk kamu.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
