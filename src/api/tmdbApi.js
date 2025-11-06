import axios from "axios";

const baseUrl = process.env.REACT_APP_TMDB_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;

export const fetchGenres = async () => {
  const endpointPath = "/genre/movie/list";
  const queryParams = `?api_key=${apiKey}&language=en-US`;
  const fullApiUrl = `${baseUrl}${endpointPath}${queryParams}`;

  try {
    const response = await axios.get(fullApiUrl);
    if (response.data && response.data.genres) {
      return response.data.genres;
    } else {
      throw new Error("Genre list not found in API response");
    }
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};

export const fetchMovieById = async (movieId) => {
  if (!movieId) {
    throw new Error("Movie ID is required");
  }
  const endpointPath = `/movie/${movieId}`;
  const queryParams = `?api_key=${apiKey}&language=en-US`;
  const fullApiUrl = `${baseUrl}${endpointPath}${queryParams}`;

  try {
    const response = await axios.get(fullApiUrl);

    if (response.data) {
      return response.data;
    } else {
      throw new Error("Movie not found in API response");
    }
  } catch (error) {
    console.error(`Error fetching movie with ID ${movieId}:`, error);
    throw error;
  }
};

export const fetchMovieVideos = async (movieId) => {
  if (!movieId) {
    throw new Error("Movie ID is required");
  }
  const endpointPath = `/movie/${movieId}/videos`;
  const queryParams = `?api_key=${apiKey}&language=en-US`;
  const fullApiUrl = `${baseUrl}${endpointPath}${queryParams}`;
  try {
    const response = await axios.get(fullApiUrl);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Videos not found in API response");
    }
  } catch (error) {
    console.error(`Error fetching videos for movie ID ${movieId}:`, error);
    throw error;
  }
};
