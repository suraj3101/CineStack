import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import "./WatchlistPage.css";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../api/tmdbApi";

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  const { data: allGenres, isLoading: isLoadingGenres } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });

  const [activeGenre, setActiveGenre] = useState("All");

  const filteredMovies = useMemo(() => {
    if (activeGenre === "All") {
      return watchlist;
    }

    return watchlist.filter((movie) => movie.genre_ids.includes(activeGenre));
  }, [watchlist, activeGenre]);

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="container watchlist-empty">
        <h1 className="watchlist-title">My Watchlist is Empty</h1>
        <p>You haven't added any movies yet.</p>
        <Link to="/" className="btn-primary" style={{ marginTop: "2rem" }}>
          Find Movies to Add
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="watchlist-title">My Watchlist</h1>

      <div className="filter-bar">
        {isLoadingGenres ? (
          <div className="filter-pill">Loading filters...</div>
        ) : (
          <>
            <button
              className={`filter-pill ${activeGenre === "All" ? "active" : ""}`}
              onClick={() => setActiveGenre("All")}
            >
              All
            </button>

            {allGenres &&
              allGenres.map((genre) => (
                <button
                  key={genre.id}
                  className={`filter-pill ${
                    activeGenre === genre.id ? "active" : ""
                  }`}
                  onClick={() => setActiveGenre(genre.id)}
                >
                  {genre.name}
                </button>
              ))}
          </>
        )}
      </div>

      <div className="watchlist-results-info">
        Showing {filteredMovies.length}{" "}
        {filteredMovies.length === 1 ? "Movie" : "Movies"}
      </div>

      <div className="watchlist-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistPage;
