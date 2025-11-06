import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton"; // --- ✅ 1. Import the Skeleton ---
import "./MovieCarousel.css";

const baseUrl = process.env.REACT_APP_TMDB_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

const findCategoriesMovies = async (fetchUrl) => {
  const fullApiUrl = `${baseUrl}${fetchUrl}?api_key=${apiKey}&language=en-US&page=1`;
  const output = await axios.get(fullApiUrl);
  return output.data;
};

const MovieCarousel = ({ title, fetchUrl, save_value }) => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [save_value],
    queryFn: () => findCategoriesMovies(fetchUrl),
    select: (data) => data.results,
    staleTime: 5000,
    cacheTime: 300000,
  });

  // --- ✅ 2. THIS IS THE NEW LOADING LOGIC ---
  if (isLoading) {
    // Instead of just <h1>, we render the *full* skeleton UI.
    // This prevents the page from "jumping" (Cumulative Layout Shift).
    return (
      <div className="carousel-container">
        <h2 className="carousel-title">{title}</h2>
        <div className="carousel-scroll">
          {/* Create a "dummy" array of 10 items and map over it
            to render 10 skeleton cards.
          */}
          {Array.from({ length: 10 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }
  // --- END OF NEW LOADING LOGIC ---

  if (isError) {
    // We can make this error more specific, too.
    return (
      <div className="container">
        <h2 className="carousel-title">{title}</h2>
        <p style={{ color: "#a1a1aa" }}>Error in finding {title}.</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    // No need to show a title if there are no movies.
    return null;
  }

  // --- "Happy Path" (This code is the same as before) ---
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-scroll">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
