
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card,Button } from "../Component";
// import { useFetch } from "../hooks/useFetch";

// export const ListMovie = ({ title, apipath ,page }) => {

//     // const [increment , setIncrement] = useState(1)
//     // const [decrement , setDecrement] = useState(0)

   
//     const { data: movie } = useFetch(apipath);
 
  

//     useEffect(() => {
//         document.title = title;
//     }); // Added dependency for title to update document title on change

//     const navigator = useNavigate();

//     return (

        
//         <div className="min-h-screen bg-gray-100">
            
//             <main className="container mx-auto p-4">
              
//                 {title === "Your Guide to Great Movies" ? (
//                     <div className="bg-gray-800 p-6 border mb-6 rounded-lg shadow-lg">
//                         <h3 className="text-primary text-xl font-semibold text-white">Welcome to MovieHunt</h3>
//                         <p className="lead text-lg text-white mt-2">Discover movies you&apos;ll love with personalized suggestions, curated collections, and quick searches your guide to finding great films.</p>
//                         <button
//                             className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
//                             onClick={() => navigator("/explore")} // Assuming "/explore" as the path
//                         >
//                             Explore Now
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="bg-white p-6 border mb-6 rounded-lg shadow-md">
//                         <p className="text-lg text-gray-700">{title}</p>
//                     </div>
//                 )}
//                 <h5 className="text-danger font-extralight text-brandDark text-2xl py-2 border-b-2 border-red-600 mb-6">{title}</h5>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

//                     {movie.map((movie) => {
//                         return <Card key={movie.id} movie={movie} />;
                       
//                     })}
//                 </div>
//                 <div>
//                   return <Button/>
//                 </div>
          
//             </main>
//         </div>
//     );
// };

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch"; // Assuming you have a custom hook for fetching data
import { Card, Button } from "../Component"; // Corrected import path for Card component

export const ListMovie = ({ title, apipath }) => {
  const [page, setPage] = useState(1); // Default page set to 1

  const { data: movie, loading } = useFetch(apipath, page); // Fetching movies based on page

  useEffect(() => {
    document.title = title;
  }, [title]); // Dependency array ensures the document title is updated when the title prop changes

  const navigator = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        {title === "Your Guide to Great Movies" ? (
          <div className="bg-gray-800 p-6 border mb-6 rounded-lg shadow-lg">
            <h3 className="text-primary text-xl font-semibold text-white">Welcome to Movie List</h3>
            <p className="lead text-lg text-white mt-2">
            Movie List is a website where you can easily find and explore movies. Whether you're looking for the latest hits, top-rated films, or upcoming releases, Movie List helps you discover your next favorite movie quickly and easily. It’s simple, fun, and always up-to-date!            </p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
              onClick={() => navigator()} // Assuming "/explore" as the path
            >
              Explore Now
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 border mb-6 rounded-lg shadow-md">
            <p className="text-lg text-black">{title}</p>
          </div>
        )}

        <h5 className="text-danger font-extrabold text-brandDark text-2xl py-2 border-b-2 border-red-600 mb-6 ">{title}</h5>
        
        {loading ? ( // Show loading spinner while data is being fetched
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movie?.map((movieItem) => (
              <Card key={movieItem.id} movie={movieItem} />
            ))}
          </div>
        )}

        {/* Pass `page` and `setPage` as props to Button */}
        <Button page={page} setPage={setPage} />
      </main>
    </div>
  );
};
