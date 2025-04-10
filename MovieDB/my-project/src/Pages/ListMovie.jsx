import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { Card, LoadingSpinner, ErrorMessage } from "../Component";
import PropTypes from "prop-types";
import { FaSearch, FaStar, FaPlay } from "react-icons/fa";

export const ListMovie = ({ title = "Movie List", apipath }) => {
  const { data: items, loading, error } = useFetch(apipath, "", 1, true);
  const navigate = useNavigate();
  const isTVShow = apipath.includes('tv/');

  useEffect(() => {
    document.title = `${title} | CineVerse`;
  }, [title]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <ErrorMessage 
          message="Failed to load content" 
          onRetry={() => window.location.reload()}
          className="bg-gray-800 border border-red-500/50"
          textColor="text-white"
          buttonColor="bg-red-600 hover:bg-red-700"
          icon={<FaSearch className="text-2xl text-red-500" />}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      {title === "Your Guide to Great Movies" && (
        <div className="relative overflow-hidden h-96">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070')] bg-cover bg-center opacity-30"></div>
          <div className="container relative z-20 flex flex-col justify-center h-full px-4 mx-auto">
            <h1 className="mb-4 text-5xl font-bold text-white">
              Discover <span className="text-amber-400">Cinematic</span> Magic
            </h1>
            <p className="max-w-2xl mb-8 text-xl text-gray-300">
              Explore a world of films from every genre and era. Your next favorite movie awaits.
            </p>
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 px-8 py-3 font-bold text-gray-900 transition-all rounded-lg bg-amber-500 hover:bg-amber-600"
                onClick={() => navigate("/explore")}
              >
                <FaPlay /> Browse Movies
              </button>
              <button className="px-8 py-3 font-medium text-white transition-all bg-transparent border-2 rounded-lg border-white/20 hover:border-amber-500">
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="container px-4 py-12 mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-2 h-12 rounded-full bg-amber-400"></div>
            <h2 className="text-3xl font-bold text-white">
              {title === "Your Guide to Great Movies" ? "Featured Films" : title}
            </h2>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {items?.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {items.map((item, index) => (
                  <div 
                    key={`${item.id}-${index}`} 
                    className="group relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10"
                    onClick={() => navigate(isTVShow ? `/tv/${item.id}` : `/movie/${item.id}`)}
                  >
                    {/* Poster */}
                    <img
                      src={item.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : '/placeholder-movie.jpg'}
                      alt={isTVShow ? item.name : item.title}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:opacity-100">
                      <div className="transition-transform duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center px-2 py-1 text-xs font-bold text-gray-900 rounded bg-amber-500/90">
                            <FaStar className="mr-1" />
                            {item.vote_average?.toFixed(1) || 'N/A'}
                          </div>
                          <span className="text-sm text-white">
                            {isTVShow 
                              ? item.first_air_date?.substring(0, 4) 
                              : item.release_date?.substring(0, 4) || 'N/A'}
                          </span>
                        </div>
                        <h3 className="font-bold text-white line-clamp-2">
                          {isTVShow ? item.name : item.title}
                        </h3>
                        <button className="flex items-center justify-center w-full gap-2 py-2 mt-3 text-sm font-medium text-gray-900 rounded bg-amber-500 hover:bg-amber-600">
                          <FaPlay /> Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="inline-block p-8 border border-gray-700 bg-gray-800/50 rounded-xl">
                  <FaSearch className="mx-auto mb-4 text-4xl text-gray-500" />
                  <h3 className="mb-2 text-xl text-white">No {isTVShow ? 'TV Shows' : 'Movies'} Found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters</p>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

ListMovie.propTypes = {
  title: PropTypes.string.isRequired,
  apipath: PropTypes.string.isRequired
};