// src/components/Header.jsx
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-white text-2xl font-bold">Neurofy</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white hover:text-gray-300">
              Log in
            </Link>
            <Link to="/register" className="bg-white text-black px-4 py-2 rounded">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;