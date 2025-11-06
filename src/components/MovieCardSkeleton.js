import React from "react";
import "./MovieCardSkeleton.css"; // We'll add the shimmer animation here

const MovieCardSkeleton = () => {
  return (
    <div className="movie-card-skeleton">
      <div className="skeleton skeleton-poster"></div>
      <div className="skeleton-info">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-meta"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
