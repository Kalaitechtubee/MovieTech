import { useEffect, useState, useCallback } from "react";

export const useFetch = (apiPath, queryTerm = "", page = 1, fetchAllPages = false) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const API_KEY = "5bc6f3e00a5718a03b7bec56352790c6";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Helper function to add delay between requests
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchAllPagesData = useCallback(async (searchTerm) => {
    setLoading(true);
    setError(null);
    let allResults = [];
    let totalPages = 1;
    const MAX_PAGES = 20; // Limit to 20 pages

    try {
      // First fetch to get total pages
      let url = `${BASE_URL}/${apiPath}?api_key=${API_KEY}&page=1`;
      if (searchTerm) {
        url += `&query=${encodeURIComponent(searchTerm)}`;
      } else {
        url += "&with_original_language=ta";
      }

      const firstResponse = await fetch(url, {
        headers: {
          "Accept": "application/json"
        }
      });

      if (!firstResponse.ok) {
        throw new Error(`HTTP error! Status: ${firstResponse.status}`);
      }

      const firstData = await firstResponse.json();
      totalPages = Math.min(firstData.total_pages, MAX_PAGES); // Limit to MAX_PAGES
      allResults = [...firstData.results];

      // Fetch remaining pages with delay and error handling
      const BATCH_SIZE = 5; // Number of concurrent requests
      const DELAY_BETWEEN_BATCHES = 1000; // 1 second delay between batches

      for (let i = 2; i <= totalPages; i += BATCH_SIZE) {
        const batchPromises = [];
        const endIndex = Math.min(i + BATCH_SIZE - 1, totalPages);

        for (let pageNum = i; pageNum <= endIndex; pageNum++) {
          let pageUrl = `${BASE_URL}/${apiPath}?api_key=${API_KEY}&page=${pageNum}`;
          if (searchTerm) {
            pageUrl += `&query=${encodeURIComponent(searchTerm)}`;
          } else {
            pageUrl += "&with_original_language=ta";
          }

          batchPromises.push(
            fetch(pageUrl, {
              headers: {
                "Accept": "application/json"
              }
            })
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .catch(err => {
              console.error(`Error fetching page ${pageNum}:`, err);
              return { results: [] }; // Return empty results for failed requests
            })
          );
        }

        const batchResults = await Promise.all(batchPromises);
        batchResults.forEach(result => {
          if (result && result.results) {
            allResults = [...allResults, ...result.results];
          }
        });

        // Add delay between batches to avoid rate limiting
        if (endIndex < totalPages) {
          await delay(DELAY_BETWEEN_BATCHES);
        }
      }

      setData(allResults);
      setTotalPages(totalPages);
    } catch (err) {
      setError(err.message);
      setData([]);
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  const fetchData = useCallback(async (searchTerm, pageNum) => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    try {
      let url = `${BASE_URL}/${apiPath}?api_key=${API_KEY}&page=${pageNum}`;
      
      if (searchTerm) {
        url += `&query=${encodeURIComponent(searchTerm)}`;
      } else {
        url += "&with_original_language=ta";
      }

      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          "Accept": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();
      setData(jsonData.results || []);
      setTotalPages(Math.min(jsonData.total_pages, 500)); // TMDB max is 500 pages
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
        setData([]);
        console.error("Fetch error:", err);
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  }, [apiPath]);

  // Debounced version of fetchData
  const debouncedFetch = useCallback(debounce(fetchData, 300), [fetchData]);

  useEffect(() => {
    if (queryTerm.trim() === "" && apiPath.includes("search")) {
      setData([]);
      setLoading(false);
      return;
    }

    if (fetchAllPages) {
      fetchAllPagesData(queryTerm);
    } else {
      debouncedFetch(queryTerm, page);
    }
  }, [queryTerm, page, debouncedFetch, fetchAllPages, fetchAllPagesData]);

  return { data, loading, error, totalPages };
};