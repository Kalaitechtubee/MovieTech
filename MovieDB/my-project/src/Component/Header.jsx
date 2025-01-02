import React, { useState } from "react";
import { FaFilm } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

export const Header = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    const queryTerm = e.target.search.value;
    e.target.reset(); // Clean up any extra spaces
    return navigate(`/search?q=${queryTerm}`);
  };

  return (
    <nav className="relative w-full text-white shadow-md p-4 z-10 bg-gradient-to-r from-purple-800 via-blue-900 to-black dark:bg-gradient-to-r dark:from-purple-800 dark:via-blue-900 dark:to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-xl font-bold flex items-center space-x-2">
            <FaFilm className="text-4xl text-kalai font-extrabold" />
            <a href="/" className="font-Josefin-Sans text-kalai text-2xl">
              Movie List
            </a>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen
                      ? "M6 18L18 6M6 6l12 12" // X icon
                      : "M4 6h16M4 12h16m-7 6h7" // Hamburger icon
                  }
                />
              </svg>
            </button>
          </div>

          {/* Links (Desktop) */}
          <div className="hidden sm:flex space-x-6 text-kalai font-serif text-xl">
            <NavLink to="/" className="hover:text-blue-300">
              Home
            </NavLink>
            <NavLink to="/movie/top" className="hover:text-blue-300">
              Top Rated
            </NavLink>
            <NavLink to="/movie/popular" className="hover:text-blue-300">
              Popular
            </NavLink>
            <NavLink to="/movie/upcoming" className="hover:text-blue-300">
              Upcoming
            </NavLink>
            <NavLink to="/trending/movie" className="hover:text-blue-300">
              Trending
            </NavLink>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden sm:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search..."
                name="search"
                className="text-black px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
              />
              <button type="submit" className="ml-2 text-blue-300">
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Links and Search Bar (Mobile Dropdown) */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="space-y-2 pb-4">
              <NavLink to="/" className="block px-4 py-2 hover:bg-blue-500">
                Home
              </NavLink>
              <NavLink
                to="/movie/top"
                className="block px-4 py-2 hover:bg-blue-500"
              >
                Top Rated
              </NavLink>
              <NavLink
                to="/movie/popular"
                className="block px-4 py-2 hover:bg-blue-500"
              >
                Popular
              </NavLink>
              <NavLink
                to="/movie/upcoming"
                className="block px-4 py-2 hover:bg-blue-500"
              >
                Upcoming
              </NavLink>
              <NavLink
                to="/trending/movie"
                className="block px-4 py-2 hover:bg-blue-500"
              >
                Trending
              </NavLink>
            </div>

            {/* Mobile Search Bar */}
            <div className="px-4 py-2 text-black">
              <form onSubmit={handleSearch} className="w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  name="search"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full mt-2 bg-blue-500 text-black py-2 rounded-md"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
