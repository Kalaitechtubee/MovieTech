import { Link } from "react-router-dom";
import backup from "../assets/Movie.jpg"; // Ensure you have a fallback image in this path
import { CiStar } from "react-icons/ci";

export const Card = ({ movie }) => {
  const { id, title, backdrop_path, vote_average, vote_count, overview, poster_path } = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : backup;

  return (
    <div className="rounded-lg shadow-lg bg-white overflow-hidden">
      {/* Movie Image */}
      <div className="relative" title={title}>
        <img src={image} alt={title} className="card-img-top w-full h-96 object-cover" />
      </div>
      
      <div className="p-4">
        {/* Movie Title */}
        <h5 className="text-xl font-bold mb-2 ">{title}</h5>

        {/* Movie Overview */}
        <p className="text-sm text-gray-600 line-clamp-3">{overview}</p>

        {/* Footer with "Read more" and Rating */}
        <div className="flex justify-between items-center mt-4">
          <Link
            to={`/movie/${id}`}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Read more
          </Link>

          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <CiStar className="text-yellow-400" size={16} />
            <span>{vote_average} | {vote_count} Reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};
