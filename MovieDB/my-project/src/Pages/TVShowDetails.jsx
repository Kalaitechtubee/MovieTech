import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { 
  StarIcon, 
  ClockIcon, 
  CalendarIcon, 
  FilmIcon, 
  UsersIcon,
  LinkIcon,
  PlayIcon,
  TicketIcon,
  GlobeAltIcon,
  VideoCameraIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import backup from "../assets/Movie.jpg";

export const TVShowDetails = () => {
  const params = useParams();
  const [show, setShow] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const key = "5bc6f3e00a5718a03b7bec56352790c6";
  const url = `https://api.themoviedb.org/3/tv/${params.id}?api_key=${key}&append_to_response=credits,videos,external_ids`;

  useEffect(() => {
    async function fetchShow() {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch TV show data");
        }
        const jsonData = await response.json();
        setShow(jsonData);

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

    fetchShow();
  }, [params.id]);

  useEffect(() => {
    if (show?.name) {
      document.title = `${show.name} - TV Show Details`;
    }
  }, [show]);

  const ottPlatforms = [
    { name: "Netflix", link: "https://www.netflix.com", icon: "netflix" },
    { name: "Amazon Prime", link: "https://www.primevideo.com", icon: "prime" },
    { name: "Disney+", link: "https://www.disneyplus.com", icon: "disney" },
    { name: "HBO Max", link: "https://www.hbomax.com", icon: "hbo" },
    { name: "Hulu", link: "https://www.hulu.com", icon: "hulu" },
  ].filter(() => Math.random() > 0.5);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-yellow-400 rounded-full border-t-transparent animate-spin"></div>
          <span className="text-lg font-medium text-yellow-400">Loading TV show details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="max-w-md p-6 text-center bg-gray-800 shadow-lg rounded-xl">
          <div className="mb-4 text-5xl text-yellow-400">⚠️</div>
          <h2 className="mb-2 text-xl font-bold text-white">Error loading TV show</h2>
          <p className="mb-4 text-gray-300">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 font-medium text-gray-900 transition-colors bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!show) return null;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container px-0.5 py-2 mx-auto sm:px-1 sm:py-3 md:px-2 md:py-4 lg:px-4 lg:py-12">
        <div className="flex flex-col gap-1 lg:gap-2 lg:flex-row">
          {/* Poster Column */}
          <div className="w-full lg:w-1/3">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img
                src={show.poster_path 
                  ? `https://image.tmdb.org/t/p/w200${show.poster_path}`
                  : backup}
                alt={show.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Quick Facts */}
            <div className="p-1 mt-2 border border-gray-700 bg-gray-800/80 backdrop-blur-sm rounded-xl sm:p-2 sm:mt-3 md:p-3 md:mt-4 lg:p-4 lg:mt-6">
              <h3 className="flex items-center mb-1 text-xs font-bold text-yellow-400 sm:text-sm md:text-base lg:text-lg lg:mb-4">
                <TicketIcon className="w-2 h-2 mr-0.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                Quick Facts
              </h3>
              
              <div className="space-y-1 sm:space-y-2 md:space-y-3 lg:space-y-4">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 mr-2 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">Rating</p>
                    <p className="font-medium text-white">{show.vote_average.toFixed(1)}/10 <span className="text-sm text-gray-400">({show.vote_count} votes)</span></p>
                  </div>
                </div>

                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">Episode Runtime</p>
                    <p className="font-medium text-white">
                      {show.episode_run_time?.[0] ? `${show.episode_run_time[0]}m` : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">First Air Date</p>
                    <p className="font-medium text-white">
                      {new Date(show.first_air_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2 text-yellow-400" />
                  <div>
                    <p className="text-xs text-gray-400">Last Air Date</p>
                    <p className="font-medium text-white">
                      {show.last_air_date ? new Date(show.last_air_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "Ongoing"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1">
            <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6">
              <h1 className="mb-0.5 text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">{show.name}</h1>
              {show.tagline && (
                <p className="text-xs italic text-yellow-400 sm:text-sm md:text-base lg:text-lg">"{show.tagline}"</p>
              )}
            </div>

            <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              <h2 className="flex items-center mb-0.5 font-semibold text-white text-base sm:text-lg sm:mb-1 md:text-xl md:mb-2 lg:text-2xl lg:mb-3">
                <FilmIcon className="w-3 h-3 mr-0.5 text-yellow-400 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                Overview
              </h2>
              <p className="text-[10px] leading-relaxed text-gray-300 sm:text-xs md:text-sm lg:text-base">{show.overview || "No overview available."}</p>
            </div>

            {show.genres?.length > 0 && (
              <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                <h3 className="mb-0.5 text-sm font-semibold text-white sm:text-base md:text-lg lg:text-xl sm:mb-1 md:mb-2">Genres</h3>
                <div className="flex flex-wrap gap-0.5">
                  {show.genres.map((genre) => (
                    <span 
                      key={genre.id} 
                      className="px-1 py-0.5 text-[10px] text-yellow-400 transition-colors border rounded-full bg-yellow-500/10 border-yellow-400/30 hover:bg-yellow-500/20 sm:text-xs sm:px-1.5 md:px-2 lg:px-3"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {show.seasons?.length > 0 && (
              <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                <h3 className="flex items-center mb-1 text-base font-semibold text-white sm:text-lg sm:mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
                  <FilmIcon className="w-3 h-3 mr-0.5 text-yellow-400 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Seasons
                </h3>
                <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3 sm:gap-1 md:gap-2 lg:gap-4 lg:grid-cols-4">
                  {show.seasons.map((season) => (
                    <div key={season.id} className="overflow-hidden transition-shadow bg-gray-800 rounded-lg hover:shadow-xl">
                      <img
                        src={season.poster_path 
                          ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                          : backup}
                        alt={`${show.name} - Season ${season.season_number}`}
                        className="w-full aspect-[2/3] object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-medium text-white">{season.name}</h4>
                        <p className="text-sm text-gray-400">
                          {season.episode_count} episodes
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {show.credits?.cast?.length > 0 && (
              <div className="mb-3 sm:mb-4 md:mb-6 lg:mb-8">
                <h3 className="flex items-center mb-1 text-base font-semibold text-white sm:text-lg sm:mb-2 md:text-xl md:mb-3 lg:text-2xl lg:mb-4">
                  <UsersIcon className="w-3 h-3 mr-0.5 text-yellow-400 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Top Cast
                </h3>
                <div className="grid grid-cols-3 gap-0.5 sm:grid-cols-4 sm:gap-1 md:gap-2 lg:gap-4 lg:grid-cols-5">
                  {show.credits.cast.slice(0, 5).map((actor) => (
                    <div key={actor.id} className="flex flex-col items-center">
                      <div className="w-10 h-10 mb-0.5 overflow-hidden border-2 border-yellow-400 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 lg:mb-2">
                        {actor.profile_path ? (
                          <img 
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                            alt={actor.name}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-700">
                            <UsersIcon className="w-8 h-8 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-center text-white">{actor.name}</p>
                      <p className="text-sm text-center text-yellow-400 line-clamp-1">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enhanced Action Buttons */}
            <div className="grid grid-cols-1 gap-0.5 mb-3 sm:grid-cols-2 sm:gap-1 md:gap-2 lg:gap-4 lg:grid-cols-3 sm:mb-4 md:mb-6 lg:mb-8">
              {trailer && (
                <a
                  href={trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-gray-900 transition-all duration-300 transform bg-yellow-500 rounded-lg group hover:bg-yellow-600 hover:scale-105 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 lg:text-base"
                >
                  <VideoCameraIcon className="w-3 h-3 mr-0.5 group-hover:animate-pulse sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Watch Trailer
                </a>
              )}

              {show.external_ids?.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${show.external_ids.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-white transition-all duration-300 transform bg-gray-800 border border-yellow-400 rounded-lg group hover:bg-gray-700 hover:scale-105 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 lg:text-base"
                >
                  <InformationCircleIcon className="w-3 h-3 mr-0.5 group-hover:animate-pulse sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  <span>
                    IMDb <span className="text-yellow-400">Details</span>
                  </span>
                </a>
              )}

              {show.homepage && (
                <a
                  href={show.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-1.5 py-0.5 text-xs font-semibold text-white transition-all duration-300 transform bg-gray-800 border border-gray-600 rounded-lg group hover:bg-gray-700 hover:scale-105 sm:px-2 sm:py-1 md:px-4 md:py-2 lg:px-6 lg:py-3 lg:text-base"
                >
                  <GlobeAltIcon className="w-3 h-3 mr-0.5 group-hover:animate-pulse sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                  Official Website
                </a>
              )}
            </div>

            {ottPlatforms.length > 0 && (
              <div className="p-1 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-xl sm:p-2 md:p-3 lg:p-6">
                <h3 className="flex items-center mb-1 text-sm font-semibold text-white sm:text-base sm:mb-2 md:text-lg md:mb-3 lg:text-xl lg:mb-4">
                  <LinkIcon className="w-2 h-2 mr-0.5 text-yellow-400 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  Stream On
                </h3>
                <div className="grid grid-cols-2 gap-0.5 sm:grid-cols-3 sm:gap-1 md:gap-2 lg:gap-4 lg:grid-cols-4">
                  {ottPlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center p-0.5 transition-all duration-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 hover:scale-105 sm:p-1 md:p-2 lg:p-4"
                    >
                      <div className="flex items-center justify-center w-4 h-4 mb-0.5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                        {platform.icon === "netflix" && (
                          <span className="text-2xl font-bold text-red-500">N</span>
                        )}
                        {platform.icon === "prime" && (
                          <span className="text-2xl font-bold text-blue-400">P</span>
                        )}
                        {platform.icon === "disney" && (
                          <span className="text-2xl font-bold text-blue-500">D</span>
                        )}
                        {platform.icon === "hbo" && (
                          <span className="text-2xl font-bold text-purple-500">H</span>
                        )}
                        {platform.icon === "hulu" && (
                          <span className="text-2xl font-bold text-green-500">H</span>
                        )}
                      </div>
                      <span className="text-sm font-medium text-center text-white sm:text-base md:text-lg lg:text-xl">{platform.name}</span>
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