import React, { createContext, useContext, useEffect, useState } from "react";

const WatchlistContext = createContext(undefined);

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    console.log("Reading from localStorage...");
    try {
      const savedData = localStorage.getItem("cineStack-watchlist");
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (error) {
      console.error("Failed to parse watchlist from localStorage", error);
    }
    return [];
  });

  useEffect(() => {
    console.log("Writing to localStorage...");
    localStorage.setItem("cineStack-watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const isMovieInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  const addMovie = (movie) => {
    if (!isMovieInWatchlist(movie.id)) {
      setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
    } else {
      console.log("This movie is already in the watchlist!");
    }
  };

  const removeMovie = (movieId) => {
    if (isMovieInWatchlist(movieId)) {
      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((movie) => movie.id !== movieId)
      );
    } else {
      console.log("Tried to remove a movie that isn't in the list.");
    }
  };

  const value = {
    watchlist,
    addMovie,
    removeMovie,
    isMovieInWatchlist,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
