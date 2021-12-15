import React from "react";
import { movies } from "../../utils/constants";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { Footer } from "../Footer/Footer";
import MenuHeader from "../MenuHeader/MenuHeader";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MoviesSearch } from "../MoviesSearch/MoviesSearch";
import "./Movies.css";

export const Movies = () => (
  <AuthLayout
    mainClassName="movies"
    header={<MenuHeader />}
    footer={<Footer />}
  >
    <MoviesSearch />
    <div className="movies__separator" />
    <MovieGrid>
      {movies.map(({ image, length, saved, title }) => (
        <MovieCard
          image={image}
          length={length}
          saved={saved}
          title={title}
          key={image}
        />
      ))}
    </MovieGrid>
    <button className="movies__load-button">Ещё</button>
  </AuthLayout>
);
