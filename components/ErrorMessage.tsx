
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-8 rounded-r-lg" role="alert">
      <p className="font-bold">Oops!</p>
      <p>{message}</p>
    </div>
  );
};
