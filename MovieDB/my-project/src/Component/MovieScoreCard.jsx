import React, { useRef, useEffect, useState } from 'react';
import { FaStar, FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export const MovieScoreCard = () => {
  const scrollRef = useRef(null);
  const { data: movies, loading, error } = useFetch('movie/popular', '', 1);
  const [isScrolling, setIsScrolling] = useState(true);
  const [showControls, setShowControls] = useState(false);

  // Auto-scroll effect with pause on hover
  useEffect(() => {
    if (!isScrolling || !movies || movies.length === 0) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const cardWidth = 320; // Adjusted card width
    const gap = 32; // Gap between cards
    const scrollSpeed = 1; // Slower scroll speed
    let animationFrameId;

    const autoScroll = () => {
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0; // Reset to start when reaching the end
      } else {
        scrollAmount += scrollSpeed;
      }
      
      scrollContainer.scrollLeft = scrollAmount;
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling, movies]);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  };

  if (loading) return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex justify-center">
        <div className="flex space-x-4 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="container px-4 py-12 mx-auto text-center">
      <div className="max-w-2xl p-4 mx-auto text-red-700 bg-red-100 border-l-4 border-red-500">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    </div>
  );

  if (!movies || movies.length === 0) return (
    <div className="container px-4 py-12 mx-auto text-center">
      <div className="max-w-2xl p-4 mx-auto text-blue-700 bg-blue-100 border-l-4 border-blue-500">
        <p>No movies available at the moment.</p>
      </div>
    </div>
  );

  return (
    <div className="container relative px-4 py-12 mx-auto"
      onMouseEnter={() => {
        setIsScrolling(false);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsScrolling(true);
        setShowControls(false);
      }}
    >
      <div className="flex items-center justify-between mt-20 mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          <span className="text-transparent bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text">
            Featured Movies
          </span>
        </h2>
        
        <div className="flex space-x-2">
          <button 
            onClick={handleScrollLeft}
            className={`p-2 rounded-full bg-yellow-500 shadow-md text-white hover:bg-yellow-600 transition-all ${showControls ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
          <button 
            onClick={handleScrollRight}
            className={`p-2 rounded-full bg-yellow-500 shadow-md text-white hover:bg-yellow-600 transition-all ${showControls ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div 
        className="relative py-2 overflow-x-hidden sm:py-4"
        ref={scrollRef}
      >
        <div className="flex pb-4 space-x-2 sm:space-x-8 sm:pb-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0 w-48 transition-all duration-500 sm:w-80 hover:scale-105"
            >
              <div className="relative group overflow-hidden rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl h-[320px] sm:h-[480px]">
                {/* Poster Image */}
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Poster'
                  }
                  alt={movie.title}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                
                {/* Rating Badge */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-sm font-bold flex items-center shadow-md sm:shadow-lg">
                  <FaStar className="mr-0.5 sm:mr-1 text-yellow-100" />
                  {movie.vote_average?.toFixed(1) || 'NA'}
                </div>
                
                {/* Movie Info */}
                <div className="absolute bottom-0 left-0 right-0 p-2 text-white transition-all duration-500 transform translate-y-0 sm:p-6 group-hover:translate-y-0">
                  <div className="p-2 bg-gradient-to-t from-black/90 to-transparent sm:p-4 rounded-b-xl sm:rounded-b-2xl">
                    <h2 className="mb-1 text-base font-bold sm:text-2xl sm:mb-2 line-clamp-1">{movie.title}</h2>
                    
                    <div className="flex items-center mb-1 sm:mb-3">
                      <span className="text-yellow-400 text-[10px] sm:text-sm font-medium">
                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                      </span>
                    </div>
                    
                    <p className="text-gray-300 text-[10px] sm:text-sm mb-2 sm:mb-4 line-clamp-2">
                      {movie.overview || 'No description available.'}
                    </p>
                    
                    <Link
                      to={`/movie/${movie.id}`}
                      className="inline-flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-3 sm:px-6 py-1 sm:py-2 rounded-full transition-all duration-300 shadow-md sm:shadow-lg hover:shadow-xl text-[10px] sm:text-sm"
                    >
                      <FaPlay className="mr-1 sm:mr-2" />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};