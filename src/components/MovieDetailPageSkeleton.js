import React from "react";
import "./MovieDetailPageSkeleton.css";

const MovieDetailPageSkeleton = () => {
  return (
    <div className="movie-detail-skeleton">
      {/* 1. FAKE BACKDROP (Matches real height) */}
      <div className="skeleton skeleton-backdrop"></div>

      {/* 2. FAKE MAIN CONTENT (Matches real layout) */}
      <div className="container detail-content-area-skeleton">
        {/* 3. Left Column: Fake Poster (Matches real size) */}
        <div className="skeleton skeleton-poster-detail"></div>

        {/* 4. Right Column: Fake Info (Just one big shimmering block) */}
        <div className="skeleton skeleton-info-detail"></div>
      </div>
    </div>
  );
};

export default MovieDetailPageSkeleton;
