import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MovieDetails = () => {
  const params = useParams(); // Retrieves the dynamic movie ID from the URL
  const [movie, setMovie] = useState(null); // State to store movie details
  const key = "5bc6f3e00a5718a03b7bec56352790c6"; 
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`; 

  // Fetch movie details when the component mounts or params.id changes
  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setMovie(jsonData); // Set movie data
      } catch (error) {
        console.error("Error fetching data: ", error);
        setMovie(null); // Set movie to null if there is an error
      }
    }

    fetchMovie();
  }, [params.id]); // Dependency array ensures the effect runs only when params.id changes

  // Update the document title based on the movie title
  useEffect(() => {
    if (movie && movie.title) {
      document.title = `${movie.title}`; // Dynamically set the page title
    }
  }, [movie]); // Re-run when movie data changes

  // Loading or error state
  if (movie === null) {
    return <div className="text-center text-xl">Error loading movie details. Please try again later.</div>;
  }

  if (!movie) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  // Return the movie details
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
              alt={movie.title}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3 p-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{movie.title}</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4">{movie.overview}</p>

            <div className="flex flex-wrap gap-4">
              <p className="text-gray-700"><strong>Release Date:</strong> {movie.release_date}</p>
              <p className="text-gray-700"><strong>Rating:</strong> {movie.vote_average} / 10</p>
              <p className="text-gray-700"><strong>Reviews:</strong> {movie.vote_count}</p>
              <p className="text-gray-700"><strong>Genres:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
            </div>

            <div className="mt-6">
              <a
                href={`https://www.themoviedb.org/movie/${movie.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
              >
                View on TMDB
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export const MovieDetails = () => {
//   const params = useParams(); // Retrieves the dynamic movie ID from the URL
//   const [movie, setMovie] = useState(null); // State to store movie details from TMDb
//   const [omdbData, setOmdbData] = useState(null); // State to store OMDb data
//   const tmdbKey = "5bc6f3e00a5718a03b7bec56352790c6"; // TMDb API key
//   const omdbKey = "218ea35a"; // OMDb API key
  
//   // Fetch movie details from TMDb and OMDb
//   useEffect(() => {
//     async function fetchMovie() {
//       try {
//         // Fetch movie details from TMDb
//         const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${tmdbKey}`);
//         if (!tmdbResponse.ok) {
//           throw new Error('Failed to fetch TMDb data');
//         }
//         const tmdbData = await tmdbResponse.json();
//         setMovie(tmdbData); // Set movie data
        
//         // Now fetch OMDB data using the IMDb ID from TMDb
//         const imdbID = tmdbData.imdb_id;
//         if (imdbID) {
//           const omdbResponse = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${omdbKey}`);
//           if (!omdbResponse.ok) {
//             throw new Error('Failed to fetch OMDB data');
//           }
//           const omdbData = await omdbResponse.json();
//           setOmdbData(omdbData); // Set OMDB data
//         }
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setMovie(null); // Set movie to null if there is an error
//         setOmdbData(null); // Set OMDB data to null if there is an error
//       }
//     }

//     fetchMovie();
//   }, [params.id]); // Dependency array ensures the effect runs only when params.id changes

//   // Update the document title based on the movie title
//   useEffect(() => {
//     if (movie && movie.title) {
//       document.title = `${movie.title}`; // Dynamically set the page title
//     }
//   }, [movie]); // Re-run when movie data changes

//   // Loading or error state
//   if (movie === null || omdbData === null) {
//     return <div className="text-center text-xl">Error loading movie details. Please try again later.</div>;
//   }

//   if (!movie || !omdbData) {
//     return <div className="text-center text-xl">Loading...</div>;
//   }

//   // Return the movie details
//   return (
//     <main className="p-6 bg-gray-100 min-h-screen">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           {/* Movie Poster */}
//           <div className="w-full md:w-1/3">
//             <img
//               src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
//               alt={movie.title}
//               className="w-full h-auto rounded-lg shadow-md object-cover"
//             />
//           </div>

//           {/* Movie Details */}
//           <div className="w-full md:w-2/3 p-6">
//             <h1 className="text-3xl font-bold text-gray-800 mb-4">{movie.title}</h1>
//             <p className="text-lg text-gray-600 mb-4">{movie.overview}</p>

//             <div className="flex flex-wrap gap-4">
//               <p className="text-gray-700"><strong>Release Date:</strong> {movie.release_date}</p>
//               <p className="text-gray-700"><strong>Rating:</strong> {movie.vote_average} / 10</p>
//               <p className="text-gray-700"><strong>Reviews:</strong> {movie.vote_count}</p>
//               <p className="text-gray-700"><strong>Genres:</strong> {movie.genres?.map(genre => genre.name).join(', ')}</p>
//             </div>

//             <div className="mt-6">
//               <a
//                 href={`https://www.themoviedb.org/movie/${movie.id}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//               >
//                 View on TMDB
//               </a>
//             </div>

//             <div className="mt-6">
//               <a
//                 href={`http://www.omdbapi.com/?i=${omdbData.imdbID}&apikey=${omdbKey}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-block py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
//               >
//                 View on OMDB
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };
