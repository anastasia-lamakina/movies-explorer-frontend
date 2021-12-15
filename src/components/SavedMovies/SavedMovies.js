import React from "react";
import { movies } from "../../utils/constants";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { Footer } from "../Footer/Footer";
import MenuHeader from "../MenuHeader/MenuHeader";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MoviesSearch } from "../MoviesSearch/MoviesSearch";
import "./SavedMovies.css";

export const SavedMovies = () => {
  const savedMovies = movies.filter((movie) => movie.saved);
  return (
    <AuthLayout
      mainClassName="saved-movies"
      header={<MenuHeader />}
      footer={<Footer />}
    >
      <MoviesSearch />
      <div className="saved-movies__separator" />
      <MovieGrid>
        {savedMovies.map(({ image, length, saved, title }) => (
          <MovieCard
            image={image}
            length={length}
            saved={saved}
            title={title}
            key={image}
            deleteMovie
          />
        ))}
      </MovieGrid>
    </AuthLayout>
  );
};
