import React from "react";
import "./HeroSkeleton.css"; // We'll add styles next
// We can also import our global index.css if the shimmer is there
// but for now, we'll keep it self-contained.

const HeroSkeleton = () => {
  return (
    // 1. The main container. MUST match Hero.js height.
    <div className="hero-skeleton-container">
      <div className="hero-skeleton-overlay">
        {/* 2. Use our global .container class to align the content */}
        <div className="container hero-skeleton-content">
          {/* 3. Fake Title */}
          <div className="skeleton skeleton-title-hero"></div>

          {/* 4. Fake Overview/Tagline */}
          <div className="skeleton skeleton-text-hero"></div>
          <div className="skeleton skeleton-text-hero-short"></div>

          {/* 5. Fake Meta (Rating, Year) */}
          <div className="skeleton skeleton-meta-hero"></div>

          {/* 6. Fake Buttons */}
          <div className="hero-skeleton-actions">
            <div className="skeleton skeleton-button"></div>
            <div className="skeleton skeleton-button"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSkeleton;
