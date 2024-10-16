import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-4">Welcome to Okuyz</h1>
        <p className="text-xl mb-8">Empowering educators with yz tools</p>
        <div className="space-x-4">
          <Link to="/register" className="bg-white text-purple-600 py-2 px-6 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </Link>
          <Link to="/login" className="bg-purple-700 text-white py-2 px-6 rounded-full font-semibold hover:bg-purple-800 transition duration-300">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;