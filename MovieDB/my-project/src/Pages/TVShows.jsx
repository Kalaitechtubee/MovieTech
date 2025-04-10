import React from "react";
import { ListMovie } from "./ListMovie";

export const TVShows = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Popular TV Shows */}
      <ListMovie 
        title="Popular TV Shows" 
        apipath="tv/popular" 
      />

      {/* Top Rated TV Shows */}
      <ListMovie 
        title="Top Rated TV Shows" 
        apipath="tv/top_rated" 
      />

      {/* Airing Today */}
      <ListMovie 
        title="Airing Today" 
        apipath="tv/airing_today" 
      />

      {/* On The Air */}
      <ListMovie 
        title="On The Air" 
        apipath="tv/on_the_air" 
      />
    </div>
  );
}; 