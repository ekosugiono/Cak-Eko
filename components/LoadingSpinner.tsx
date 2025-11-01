
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  const messages = [
    "Meracik cerita tentangmu...",
    "Menghubungkan titik-titik takdir...",
    "Memanggil bintang untuk bertanya...",
    "Membaca alur energimu...",
    "Sedikit lagi, hampir selesai!"
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessage(prevMessage => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="text-center p-8 mt-8 bg-white/50 backdrop-blur-sm rounded-2xl">
      <svg className="animate-spin mx-auto h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="mt-4 text-indigo-800 font-semibold transition-opacity duration-500">{message}</p>
    </div>
  );
};
