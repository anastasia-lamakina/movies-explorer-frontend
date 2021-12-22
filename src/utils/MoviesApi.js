import { MOVIES_API_URL } from "./constants";

export const getMovies = async () => {
  try {
    const response = await fetch(MOVIES_API_URL);
    const movies = await response.json();
    return movies;
  } catch (error) {}
};
