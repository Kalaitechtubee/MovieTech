
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ListMovie } from '../../Pages/ListMovie'; // Ensure proper export (either default or named)
import { PageNotFound } from '../../Pages/PageNotFound'; // Ensure export
import { MovieDetails } from '../../Pages/MovieDetails'; 
import { Search } from '../../Pages/Search'; 


const AllRouters = () => {
  return (
    <Routes>
      {/* Home Route - List of now playing movies */}
      <Route 
        path="/" 
        element={<ListMovie title="Your Guide to Great Movies" apipath="movie/now_playing" />} 
      />
      
      {/* Top Rated Movies */}
      <Route 
        path="movie/top" 
        element={<ListMovie title="Top Rated Movies" apipath="movie/top_rated" />} 
      />
      
      {/* Popular Movies */}
      <Route 
        path="movie/popular" 
        element={<ListMovie title="Popular Movies" apipath="discover/movie"/>} 
      />
      
      {/* Upcoming Movies */}
      <Route 
        path="movie/upcoming" 
        element={<ListMovie title="Upcoming Movies" apipath="movie/upcoming" />} 
      />
        <Route 
        path="Trending/movie" 
        element={<ListMovie title="Trending Movie" apipath="trending/movie/day"/>} 
      />
      
      {/* Search page */}
      <Route 
        path="search" 
        element={<Search apipath="search/movie"/>} 
      />
    
      
      <Route 
        path="movie/:id" 
        element={<MovieDetails />} 
      />
      
      {/* Page Not Found Route */}
      <Route 
        path="*" 
        element={<PageNotFound />} 
      />
    
    </Routes>
  );
};

export default AllRouters;

