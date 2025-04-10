import React, { useState, useEffect } from "react";
import { FaFilm, FaSearch, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const queryTerm = searchQuery.trim();
    if (!queryTerm) return;
    navigate(`/search?q=${encodeURIComponent(queryTerm)}`);
    setSearchQuery("");
  };

  return (
    <nav 
      className={`fixed w-full text-white z-50 transition-all duration-300 ${isScrolled ? 'bg-yellow-600 shadow-lg' : 'bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 '}`}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaFilm className="text-3xl text-white sm:text-4xl drop-shadow-lg" />
            <NavLink 
              to="/" 
              className="font-serif text-2xl italic font-bold text-white transition-colors sm:text-3xl drop-shadow-md hover:text-yellow-100"
            >
              Movie<span className="text-yellow-800">HUB</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-1 md:flex lg:space-x-2">
            <NavLink 
              to="/" 
              className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-500 hover:bg-opacity-50'} transition-colors`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/movie/top" 
              className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-500 hover:bg-opacity-50'} transition-colors`}
            >
              Top Rated
            </NavLink>
            <NavLink 
              to="/movie/popular" 
              className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-500 hover:bg-opacity-50'} transition-colors`}
            >
              Popular
            </NavLink>
            <NavLink 
              to="/movie/upcoming" 
              className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-500 hover:bg-opacity-50'} transition-colors`}
            >
              Upcoming
            </NavLink>
            <NavLink 
              to="/trending/movie" 
              className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-500 hover:bg-opacity-50'} transition-colors`}
            >
              Trending
            </NavLink>
            <NavLink 
              to="/tv" 
              className={({isActive}) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-500 hover:bg-opacity-50'} transition-colors`}
            >
              TV Shows
            </NavLink>

            {/* Desktop Search */}
            <div className="relative ml-2">
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies..."
                  className="w-40 px-4 py-2 text-gray-800 border-2 border-yellow-600 rounded-full shadow-sm lg:w-56 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                  aria-label="Search movies"
                />
                <button 
                  type="submit" 
                  className="p-2 ml-2 text-white transition-colors bg-yellow-600 rounded-full hover:bg-yellow-700"
                  aria-label="Submit search"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <FaTimes className="w-6 h-6 text-white" />
              ) : (
                <FaSearch className="w-5 h-5 text-white" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="pb-4 bg-yellow-500 rounded-lg shadow-inner md:hidden animate-slideDown">
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="flex-1 px-4 py-2 text-gray-800 border-2 border-yellow-600 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    aria-label="Search movies"
                  />
                  <button
                    type="submit"
                    className="px-4 text-white transition-colors bg-yellow-600 rounded-r-full hover:bg-yellow-700"
                    aria-label="Submit search"
                  >
                    <FaSearch />
                  </button>
                </div>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col px-2 space-y-1">
              <NavLink 
                to="/" 
                className={({isActive}) => `px-4 py-3 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-600'} transition-colors`}
              >
                Home
              </NavLink>
              <NavLink
                to="/movie/top"
                className={({isActive}) => `px-4 py-3 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-600'} transition-colors`}
              >
                Top Rated
              </NavLink>
              <NavLink
                to="/movie/popular"
                className={({isActive}) => `px-4 py-3 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-600'} transition-colors`}
              >
                Popular
              </NavLink>
              <NavLink
                to="/movie/upcoming"
                className={({isActive}) => `px-4 py-3 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-600'} transition-colors`}
              >
                Upcoming
              </NavLink>
              <NavLink
                to="/trending/movie"
                className={({isActive}) => `px-4 py-3 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-600'} transition-colors`}
              >
                Trending
              </NavLink>
              <NavLink
                to="/tv"
                className={({isActive}) => `px-4 py-3 rounded-md text-sm font-medium ${isActive ? 'bg-white text-yellow-600 shadow-md' : 'text-white hover:bg-yellow-600'} transition-colors`}
              >
                TV Shows
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};