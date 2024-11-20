import React from 'react';
import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500">Error</h1>
      <p className="text-lg text-gray-500">Something went wrong.</p>
      <Link to={`/`} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => window.location.reload()}>
        Try Again
      </Link>
    </div>
  );
}

export default ErrorPage;