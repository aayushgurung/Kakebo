import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-8xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl text-gray-600">Oops! Page Not Found.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
