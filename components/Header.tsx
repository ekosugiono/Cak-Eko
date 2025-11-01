
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="text-center my-8 md:my-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 pb-2">
        Analisis Karir & Kepribadian
      </h1>
      <p className="mt-2 text-lg text-gray-600">
        Temukan potensimu lewat cerita dari AI.
      </p>
    </header>
  );
};
