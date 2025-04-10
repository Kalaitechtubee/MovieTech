// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { Card } from "../Component";
// import { useFetch } from "../hooks/useFetch";

// export const Search = () => {
//   const [searchParams] = useSearchParams();
//   const queryTerm = searchParams.get("q"); // Get query from URL

//   const { data, loading } = useFetch("search/movie", 1, queryTerm);

//   return (
//     <div className="p-4 sm:p-6">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
//         Search Results for "{queryTerm}"
//       </h1>

//       {loading ? ( // Show loading spinner while data is being fetched
//         <p className="text-center text-lg">Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {data.length > 0 ? (
//             data.map((movie) => (
//               <Card key={movie.id} movie={movie} />
//             ))
//           ) : (
//             <p className="text-center text-lg">No movies found for "{queryTerm}"</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
// Search.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../Component";
import { useFetch } from "../hooks/useFetch";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTerm = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const { data, loading, error, totalPages } = useFetch("search/movie", queryTerm, page);

  const handlePageChange = (newPage) => {
    setSearchParams({ q: queryTerm, page: newPage });
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Search Results for "{queryTerm}"
      </h1>

      {loading && (
        <p className="text-center text-lg">Loading...</p>
      )}

      {error && (
        <p className="text-center text-lg text-red-500">Error: {error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.length > 0 ? (
              data.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))
            ) : (
              <p className="text-center text-lg">No movies found for "{queryTerm}"</p>
            )}
          </div>

          {/* Pagination */}
          {data.length > 0 && totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};