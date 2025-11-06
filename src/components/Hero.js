import "./Hero.css";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useWatchlist } from "../context/WatchlistContext";
import { fetchGenres } from "../api/tmdbApi";
import HeroSkeleton from "./HeroSkeleton"; // --- ✅ 1. Import the Skeleton ---

// ... (constants and findHeroMovies function are perfect)
const baseUrl = process.env.REACT_APP_TMDB_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const endpointPath = "/movie/now_playing";
const queryParams = `?api_key=${apiKey}&language=en-US&page=1`;
const fullApiUrl = `${baseUrl}${endpointPath}${queryParams}`;
const imageBaseUrl = `https://image.tmdb.org/t/p/original`;

const findHeroMovies = async () => {
  const result = await axios.get(fullApiUrl);
  return result.data;
};

function Hero() {
  // --- (All your hooks are perfect) ---
  const {
    data: movie,
    isLoading: isLoadingMovie,
    isError: isErrorMovie,
  } = useQuery({
    queryKey: ["heromovie"],
    queryFn: findHeroMovies,
    select: (data) => data.results[0],
    // ... (other options)
  });

  const {
    data: genres,
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    // ... (other options)
  });

  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlist();

  const genreNames = useMemo(() => {
    if (!genres || !movie || !movie.genre_ids) return "";
    return movie.genre_ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .join(", ");
  }, [genres, movie]);
  // --- (End of hooks) ---

  // --- ✅ 2. THIS IS THE NEW LOADING LOGIC ---
  if (isLoadingMovie || isLoadingGenres) {
    // Instead of just <h1>, we render our new skeleton component!
    return <HeroSkeleton />;
  }
  // --- END OF NEW LOADING LOGIC ---

  // --- (Error and Empty checks are perfect) ---
  if (isErrorMovie || isErrorGenres) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <h1>Some Error occured while fetching the featured movie.</h1>
      </div>
    );
  }

  if (!movie || !genres) {
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <h1>No featured movie or genre data found.</h1>
      </div>
    );
  }

  // --- "Happy Path" (This code is the same as before) ---
  const fullBackdropUrl = `${imageBaseUrl}${movie.backdrop_path}`;
  const isAdded = isMovieInWatchlist(movie.id);

  return (
    <div
      className="hero-container"
      style={{ backgroundImage: `url(${fullBackdropUrl})` }}
    >
      <div className="hero-overlay">
        <div className="container hero-content ">
          <h1>{movie.title}</h1>
          {/* <p className="hero-overview">{movie.overview.substring(0, 150)}...</p> */}
          {/* <p className="hero-tagline">{movie.tagline}</p> */}
          <p className="hero-overview">{movie.overview}</p>
          <div className="hero-meta">
            <span>⭐ {movie.vote_average.toFixed(1)} / 10</span>
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>{genreNames}</span>
          </div>
          <div className="hero-actions">
            <Link to={`/movie/${movie.id}`} className="hero-btn btn-primary">
              View Details
            </Link>
            {isAdded ? (
              <button
                className="hero-btn btn-secondary"
                onClick={() => removeMovie(movie.id)}
              >
                Remove from Watchlist
              </button>
            ) : (
              <button
                className="hero-btn btn-secondary"
                onClick={() => addMovie(movie)}
              >
                Add to Watchlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
