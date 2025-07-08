import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext'; // Adjust the path if needed

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlantTypesOpen, setIsPlantTypesOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const togglePlantTypes = () => setIsPlantTypesOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="flex items-center justify-between px-5 py-10">
        <div className="flex items-center">
          <img src="/g4.png" alt="Logo" className="w-[100px] h-[100px] -mt-12" />
          <span className="text-xl font-bold text-white/75 -ml-5">Planto.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 text-white/75 font-medium">
            <li className="hover:text-green-300 cursor-pointer">
              <Link to={'/'}>Home</Link>
            </li>
            <li className="relative cursor-pointer" onClick={togglePlantTypes}>
              <span className="hover:text-green-300">Plant Types</span>
              {isPlantTypesOpen && (
                <ul className="absolute top-8 left-0 bg-white text-gray-700 border shadow-md w-40 z-10">
                  <li className="px-4 py-2 hover:bg-green-50">
                    <Link to="/indoor">Indoor</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-green-50">
                    <Link to="/outdoor">Outdoor</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-green-50">
                    <Link to="/succulents">Succulents</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="hover:text-green-300 cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Right Icons and Auth Buttons */}
        <div className="flex items-center gap-4 text-white">
          <img src="/search.png" alt="Search" className="hidden sm:block w-6 h-6 cursor-pointer hover:opacity-80" />
          <img src="/bag.png" alt="Bag" className="hidden sm:block w-6 h-6 cursor-pointer hover:opacity-80" />
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3 ml-2">
            {isAuthenticated ? (
              <button 
                onClick={handleLogout}
                className="bg-transparent border border-[#c7c9c6] hover:bg-[#c7c9c6] hover:text-[#1c261a] text-white px-4 py-1.5 rounded-md transition-all duration-300 text-sm"
              >
                Log Out
              </button>
            ) : (
              <>
                <Link 
                  to="/login"
                  className="bg-transparent border border-[#c7c9c6] hover:bg-[#c7c9c6] hover:text-[#1c261a] text-white px-4 py-1.5 rounded-md transition-all duration-300 text-sm"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-[#2c352b] border border-[#c7c9c6] hover:bg-[#c7c9c6] hover:text-[#1c261a] text-white px-4 py-1.5 rounded-md transition-all duration-300 text-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <img
            src="/hamburger.png"
            alt="Menu"
            className="md:hidden w-6 h-4 cursor-pointer hover:opacity-80"
            onClick={toggleMenu}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1e2619] text-white/75 px-5 py-4 space-y-3 transition-all duration-300 ease-in-out">
          <div className="flex flex-col gap-2 font-medium">
            <Link 
              to="/" 
              className="cursor-pointer hover:text-green-300"
              onClick={closeMenu}
            >
              Home
            </Link>

            <div>
              <span
                className="block hover:text-green-300 cursor-pointer"
                onClick={togglePlantTypes}
              >
                Plant Types
              </span>
              {isPlantTypesOpen && (
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <Link to="/indoor" onClick={closeMenu} className="block hover:text-green-300">Indoor</Link>
                  <Link to="/outdoor" onClick={closeMenu} className="block hover:text-green-300">Outdoor</Link>
                  <Link to="/succulents" onClick={closeMenu} className="block hover:text-green-300">Succulents</Link>
                </div>
              )}
            </div>

            <Link to="/contact" onClick={closeMenu} className="cursor-pointer hover:text-green-300">
              Contact
            </Link>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="bg-transparent border border-[#c7c9c6] hover:bg-[#c7c9c6] hover:text-[#1c261a] text-white px-4 py-1.5 rounded-md transition-all duration-300 text-sm text-left"
                >
                  Log Out
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenu} className="bg-transparent border border-[#c7c9c6] hover:bg-[#c7c9c6] hover:text-[#1c261a] text-white px-4 py-1.5 rounded-md transition-all duration-300 text-sm">
                    Login
                  </Link>
                  <Link to="/register" onClick={closeMenu} className="bg-[#2c352b] border border-[#c7c9c6] hover:bg-[#c7c9c6] hover:text-[#1c261a] text-white px-4 py-1.5 rounded-md transition-all duration-300 text-sm">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
