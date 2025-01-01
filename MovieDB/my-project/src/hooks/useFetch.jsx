import { useEffect, useState } from "react";

export const useFetch = (apiPath, page, queryTerm = "") => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const key = "5bc6f3e00a5718a03b7bec56352790c6"; // Store your API key securely in .env

  const url = `https://api.themoviedb.org/3/${apiPath}?api_key=${key}&page=${page}&with_original_language=ta&query=${queryTerm}`;

  useEffect(() => {
    async function fetchData() {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData.results || []); // Fallback to an empty array if no results
      } catch (error) {
        setData([]); // Set empty array on error
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    }

    fetchData();
  }, [url, page, queryTerm]); // Dependencies: URL, page, and queryTerm

  return { data, loading }; // Return both data and loading state
};
