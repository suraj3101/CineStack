import React from "react";
import Hero from "../components/Hero";
import MovieCarousel from "../components/MovieCarousel";

const DashboardPage = () => {
  return (
    <div>
      <Hero />
      <div className="container">
        <MovieCarousel
          fetchUrl="/movie/top_rated"
          title="Top Rated"
          save_value="top_rated"
        />
        <MovieCarousel
          fetchUrl="/trending/movie/week"
          title="Trending"
          save_value="trend"
        />
        <MovieCarousel
          fetchUrl="/movie/upcoming"
          title="Upcoming"
          save_value="upcome"
        />
      </div>
    </div>
  );
};
export default DashboardPage;
