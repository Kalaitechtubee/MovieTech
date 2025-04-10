// // import { Link } from "react-router-dom";
// // import backup from "../assets/Movie.jpg"; // Ensure you have a fallback image in this path
// // import { CiStar } from "react-icons/ci";

// // export const Card = ({ movie }) => {
// //   const { id, title, backdrop_path, vote_average, vote_count, overview, poster_path } = movie;
// //   const image = poster_path ? `https://image.tmdb.org/t/p/original${poster_path}` : backup;

// //   return (
// //     <div className="rounded-lg shadow-lg bg-white overflow-hidden">
// //       {/* Movie Image */}
// //       <div className="relative" title={title}>
// //         <img src={image} alt={title} className="card-img-top w-full h-96 object-cover" />
// //       </div>
      
// //       <div className="p-4">
// //         {/* Movie Title */}
// //         <h5 className="text-xl font-bold mb-2 ">{title}</h5>

// //         {/* Movie Overview */}
// //         <p className="text-sm text-gray-600 line-clamp-3">{overview}</p>

// //         {/* Footer with "Read more" and Rating */}
// //         <div className="flex justify-between items-center mt-4">
// //           <Link
// //             to={`/movie/${id}`}
// //             className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
// //           >
// //             Read more
// //           </Link>

// //           <div className="flex items-center space-x-2 text-sm text-gray-700">
// //             <CiStar className="text-yellow-400" size={16} />
// //             <span>{vote_average} | {vote_count} Reviews</span>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// import { Link } from "react-router-dom";
// import backup from "../assets/Movie.jpg"; // Ensure fallback image exists
// import { CiStar } from "react-icons/ci";

// export const Card = ({ movie }) => {
//   const { id, title, backdrop_path, vote_average, vote_count, overview, poster_path } = movie;
//   const image = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : backup; // Changed to w500 for better resolution control

//   return (
//     <div className="group rounded-xl shadow-xl bg-white overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
//       {/* Movie Image */}
//       <div className="relative" title={title}>
//         <img
//           src={image}
//           alt={title}
//           className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-80"
//         />
//         {/* Overlay on Hover */}
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <Link
//             to={`/movie/${id}`}
//             className="text-white font-semibold text-sm bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>

//       {/* Card Content */}
//       <div className="p-4 flex flex-col justify-between h-48">
//         {/* Movie Title */}
//         <h5 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{title}</h5>

//         {/* Movie Overview */}
//         <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{overview}</p>

//         {/* Footer with Rating and Read More */}
//         <div className="flex justify-between items-center mt-3">
//           <div className="flex items-center space-x-1 text-sm text-gray-700">
//             <CiStar className="text-yellow-400" size={18} />
//             <span className="font-medium">
//               {vote_average.toFixed(1)} <span className="text-gray-500">({vote_count})</span>
//             </span>
//           </div>
//           <Link
//             to={`/movie/${id}`}
//             className="py-1.5 px-3 bg-indigo-600 text-white font-semibold text-sm rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-300"
//           >
//             Read More
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Link } from "react-router-dom";
import backup from "../assets/Movie.jpg"; // Ensure fallback image exists
import { CiStar } from "react-icons/ci";

export const Card = ({ movie }) => {
  const { id, title, vote_average, vote_count, overview, poster_path } = movie;
  const image = poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : backup;

  return (
    <div className="group rounded-xl shadow-lg bg-white overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1">
      {/* Movie Image */}
      <div className="relative" title={title}>
        <img
          src={image}
          alt={`${title} poster`}
          className="w-full h-72 object-cover transition-opacity duration-300 group-hover:opacity-90"
          loading="lazy"
        />
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/movie/${id}`}
            className="inline-flex items-center px-5 py-2 bg-yellow-400 text-black text-sm font-semibold rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-all duration-300"
            aria-label={`View details for ${title}`}
          >
            <span>View Details</span>
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col justify-between h-44 bg-white">
        {/* Movie Title */}
        <h5 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-yellow-500 transition-colors duration-200">
          <Link to={`/movie/${id}`} title={title}>
            {title}
          </Link>
        </h5>

        {/* Movie Overview */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{overview}</p>

        {/* Footer with Rating and Read More */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center space-x-1 text-sm text-gray-700">
            <CiStar className="text-yellow-400" size={20} aria-hidden="true" />
            <span className="font-medium">
              {vote_average.toFixed(1)} <span className="text-gray-400 text-xs">({vote_count.toLocaleString()})</span>
            </span>
          </div>
          <Link
            to={`/movie/${id}`}
            className="py-1 px-3 bg-yellow-400 text-black text-sm font-medium rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 transition-all duration-300"
            aria-label={`Read more about ${title}`}
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};