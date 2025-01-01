import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "../Component";
import { useFetch } from "../hooks/useFetch";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const queryTerm = searchParams.get("q"); // Get query from URL

  const { data, loading } = useFetch("search/movie", 1, queryTerm);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Search Results for "{queryTerm}"
      </h1>

      {loading ? ( // Show loading spinner while data is being fetched
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.length > 0 ? (
            data.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))
          ) : (
            <p className="text-center text-lg">No movies found for "{queryTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
};
