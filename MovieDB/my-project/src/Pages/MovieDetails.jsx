// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export const MovieDetails = () => {
//   const params = useParams(); // Retrieves the dynamic movie ID from the URL
//   const [movie, setMovie] = useState(null); // State to store movie details
//   const key = "5bc6f3e00a5718a03b7bec56352790c6"; 
//   const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}`; 

//   // Fetch movie details when the component mounts or params.id changes
//   useEffect(() => {
//     async function fetchMovie() {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const jsonData = await response.json();
//         setMovie(jsonData); // Set movie data
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//         setMovie(null); // Set movie to null if there is an error
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
//   if (movie === null) {
//     return <div className="text-center text-xl">Error loading movie details. Please try again later.</div>;
//   }

//   if (!movie) {
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
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">{movie.title}</h1>
//             <p className="text-base sm:text-lg text-gray-600 mb-4">{movie.overview}</p>

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
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  StarIcon, 
  ClockIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  FilmIcon, 
  UsersIcon,
  LinkIcon,
  PlayIcon,
  TicketIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

export const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = "5bc6f3e00a5718a03b7bec56352790c6";
  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${key}&append_to_response=credits,release_dates,videos`;

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setMovie(jsonData);

        const trailerVideo = jsonData.videos?.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerVideo ? `https://www.youtube.com/watch?v=${trailerVideo.key}` : null);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [params.id]);

  useEffect(() => {
    if (movie && movie.title) {
      document.title = `${movie.title} - Movie Details`;
    }
  }, [movie]);

  // Simulated OTT platforms with links and icons
  const ottPlatforms = [
    { name: "Netflix", link: "https://www.netflix.com", icon: "netflix" },
    { name: "Amazon Prime", link: "https://www.primevideo.com", icon: "prime" },
    { name: "Disney+", link: "https://www.disneyplus.com", icon: "disney" },
    { name: "HBO Max", link: "https://www.hbomax.com", icon: "hbo" },
    { name: "Hulu", link: "https://www.hulu.com", icon: "hulu" },
  ].filter(() => Math.random() > 0.5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="text-yellow-400 text-lg font-medium">Loading movie details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center p-6 max-w-md bg-gray-800 rounded-xl shadow-lg">
          <div className="text-yellow-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-white text-xl font-bold mb-2">Error loading movie</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Backdrop Image with Gradient Overlay */}
      <div className="relative h-96 w-full overflow-hidden">
        {movie.backdrop_path && (
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={`${movie.title} backdrop`}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster Column */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white/10 hover:border-yellow-400/30 transition-all duration-300">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"}
                alt={movie.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Quick Facts */}
            <div className="mt-6 bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
              <h3 className="text-yellow-400 font-bold text-lg mb-3 flex items-center">
                <TicketIcon className="w-5 h-5 mr-2" />
                Quick Facts
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="font-medium">{movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-400">Runtime</p>
                    <p className="font-medium">
                      {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  <div>
                    <p className="text-xs text-gray-400">Release Date</p>
                    <p className="font-medium">
                      {new Date(movie.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {movie.budget > 0 && (
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                    <div>
                      <p className="text-xs text-gray-400">Budget</p>
                      <p className="font-medium">${movie.budget.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1">
            {/* Title and Tagline */}
            <div className="mb-6">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">{movie.title}</h1>
              {movie.tagline && (
                <p className="text-xl text-yellow-400 italic">"{movie.tagline}"</p>
              )}
            </div>

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white mb-3 flex items-center">
                <FilmIcon className="w-6 h-6 text-yellow-400 mr-2" />
                Overview
              </h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Genres */}
            {movie.genres?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre.id} 
                      className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm border border-yellow-400/30"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Cast */}
            {movie.credits?.cast?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <UsersIcon className="w-6 h-6 text-yellow-400 mr-2" />
                  Top Cast
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {movie.credits.cast.slice(0, 5).map((actor) => (
                    <div key={actor.id} className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 border-2 border-yellow-400">
                        {actor.profile_path ? (
                          <img 
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                            <UsersIcon className="w-8 h-8 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <p className="text-white font-medium text-center">{actor.name}</p>
                      <p className="text-yellow-400 text-sm text-center">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Production Companies */}
            {movie.production_companies?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-3">Production Companies</h3>
                <div className="flex flex-wrap gap-4">
                  {movie.production_companies.map((company) => (
                    company.logo_path ? (
                      <div key={company.id} className="bg-white p-2 rounded-lg flex items-center justify-center h-16 w-32">
                        <img 
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} 
                          alt={company.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div key={company.id} className="bg-gray-800 p-2 rounded-lg flex items-center justify-center h-16 w-32 border border-gray-700">
                        <span className="text-gray-300 text-sm text-center">{company.name}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {/* Trailer Button */}
              {trailer && (
                <a
                  href={trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Watch Trailer
                </a>
              )}

              {/* IMDb Button */}
              {movie.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-yellow-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <span className="text-yellow-400 font-bold mr-2">IMDb</span>
                  View Details
                </a>
              )}

              {/* Official Website */}
              {movie.homepage && (
                <a
                  href={movie.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 border border-gray-600"
                >
                  <GlobeAltIcon className="w-5 h-5 mr-2 text-yellow-400" />
                  Official Website
                </a>
              )}
            </div>

            {/* OTT Platforms */}
            {ottPlatforms.length > 0 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <LinkIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  Available On
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {ottPlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center bg-gray-700 hover:bg-gray-600 p-4 rounded-lg transition-colors duration-300 border border-gray-600"
                    >
                      <div className="w-12 h-12 mb-2 flex items-center justify-center">
                        {platform.icon === "netflix" && (
                          <span className="text-red-500 text-2xl font-bold">N</span>
                        )}
                        {platform.icon === "prime" && (
                          <span className="text-blue-400 text-2xl font-bold">P</span>
                        )}
                        {platform.icon === "disney" && (
                          <span className="text-blue-500 text-2xl font-bold">D</span>
                        )}
                        {platform.icon === "hbo" && (
                          <span className="text-purple-500 text-2xl font-bold">H</span>
                        )}
                        {platform.icon === "hulu" && (
                          <span className="text-green-500 text-2xl font-bold">H</span>
                        )}
                      </div>
                      <span className="text-white font-medium text-sm text-center">{platform.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};