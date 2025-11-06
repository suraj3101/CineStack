import React, { useMemo } from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../api/tmdbApi";
import LazyImage from "./LazyImage";

function MovieCard({ movie }) {
  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlist();

  const { data: genres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    retry: 2,
    staleTime: 5000,
    cacheTime: 300000,
  });

  const isAdded = isMovieInWatchlist(movie.id);

  const handleWatchlistClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isAdded) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  };

  const genreNames = useMemo(() => {
    if (!genres || !movie.genre_ids) return "";

    return movie.genre_ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter(Boolean)
      .join(", ");
  }, [genres, movie?.genre_ids]);

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";

  return (
    <Link to={`/movie/${movie.id}`} className="movie-card">
      <LazyImage
        src={posterUrl}
        alt={movie.title}
        className="movie-card-poster"
      />

      <div
        className={`movie-card-heart ${isAdded ? "is-added" : ""}`}
        onClick={handleWatchlistClick}
      >
        ♥
      </div>

      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>
        <div className="movie-card-meta">
          <span>{year}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>

        <div className="movie-card-genres">
          {isLoadingGenres ? (
            <span className="loading-text">...</span>
          ) : (
            <span className="genre-text">{genreNames}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
