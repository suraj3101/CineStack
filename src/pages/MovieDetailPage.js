import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMovieById, fetchMovieVideos } from "../api/tmdbApi";
import "./MovieDetailPage.css";
import { useWatchlist } from "../context/WatchlistContext";
import Modal from "../components/Modal";
import HeroSkeleton from "../components/HeroSkeleton";

const imageBaseUrl = `https://image.tmdb.org/t/p/original`;
const posterBaseUrl = `https://image.tmdb.org/t/p/w500`;

const MovieDetailPage = () => {
  const { id } = useParams();
  console.log("Movie ID from URL:", id);
  const queryClient = useQueryClient();

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieById(id),
    staleTime: 300000,
  });

  const {
    data: videosData,
    isLoading: isLoadingVideos,
    refetch: fetchVideos,
  } = useQuery({
    queryKey: ["movieVideos", id],
    queryFn: () => fetchMovieVideos(id),
    enabled: false,
  });

  const { addMovie, removeMovie, isMovieInWatchlist } = useWatchlist();

  const isAdded = isMovieInWatchlist(Number(id));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrefetchVideos = () => {
    console.log("Hovered! Prefetching videos...");
    queryClient.prefetchQuery({
      queryKey: ["movieVideos", id],
      queryFn: () => fetchMovieVideos(id),
    });
  };

  const handlePlayTrailerClick = () => {
    console.log("Clicked! Opening modal and fetching videos...");
    fetchVideos();
    setIsModalOpen(true);
  };

  const trailerKey = useMemo(() => {
    if (!videosData || !videosData.results) {
      return null;
    }
    const officialTrailer = videosData.results.find(
      (vid) => vid.official && vid.type === "Trailer" && vid.site === "YouTube"
    );

    const anyTrailer = videosData.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return officialTrailer
      ? officialTrailer.key
      : anyTrailer
      ? anyTrailer.key
      : null;
  }, [videosData]);

  if (isLoading) {
    // Just re-use our existing HeroSkeleton!
    // It's not a *perfect* match, but it has the *right height* // and will 100% prevent the "page jump."
    return <HeroSkeleton />;
  }

  if (isError) {
    return (
      <div className="container">
        <h1>Error: {error.message}</h1>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container">
        <h1>Movie not found.</h1>
      </div>
    );
  }

  const fullBackdropUrl = `${imageBaseUrl}${movie.backdrop_path}`;
  const fullPosterUrl = `${posterBaseUrl}${movie.poster_path}`;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const genres = movie.genres ? movie.genres.map((g) => g.name).join(", ") : "";

  return (
    <div className="movie-detail-page">
      <div
        className="detail-hero-container"
        style={{ backgroundImage: `url(${fullBackdropUrl})` }}
      >
        <div className="detail-hero-overlay"></div>
      </div>

      <div className="container detail-content-area">
        <div className="detail-poster">
          <img src={fullPosterUrl} alt={movie.title} />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          <span className="detail-tagline">{movie.tagline}</span>

          <div className="detail-meta">
            <span>⭐ {rating} / 10</span>
            <span>{year}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="detail-genres">{genres}</div>

          <div className="detail-actions">
            {isAdded ? (
              <button
                className="detail-btn btn-secondary"
                onClick={() => removeMovie(Number(id))}
              >
                Remove from Watchlist
              </button>
            ) : (
              <button
                className="detail-btn btn-primary"
                onClick={() => addMovie(movie)}
              >
                Add to Watchlist
              </button>
            )}
            <button
              className="detail-btn btn-secondary"
              onClick={handlePlayTrailerClick}
              onMouseEnter={handlePrefetchVideos}
              disabled={isLoadingVideos}
            >
              {isLoadingVideos ? "Loading..." : "► Play Trailer"}
            </button>
          </div>

          <div className="detail-overview">
            <h3>Plot Summary</h3>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>

      <div className="container detail-stats-area">
        <h2>Key Details</h2>
        <div className="stats-grid">
          <div>
            <span>Status</span>
            <strong>{movie.status}</strong>
          </div>
          <div>
            <span>Budget</span>
            <strong>
              ${movie.budget ? movie.budget.toLocaleString() : "N/A"}
            </strong>
          </div>
          <div>
            <span>Revenue</span>
            <strong>
              ${movie.revenue ? movie.revenue.toLocaleString() : "N/A"}
            </strong>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {trailerKey ? (
            <iframe
              className="youtube-player"
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="no-trailer">
              <h2>No trailer available.</h2>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
export default MovieDetailPage;
