import React from "react";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { MOVIES_FILE_URL } from "../../utils/constants";
import { deleteUnsaveMovie, getSavedMovies } from "../../utils/MainApi";
import { getMovies } from "../../utils/MoviesApi";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import { Footer } from "../Footer/Footer";
import MenuHeader from "../MenuHeader/MenuHeader";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MoviesSearch } from "../MoviesSearch/MoviesSearch";
import { Preloader } from "../Preloader/Preloader";
import "./SavedMovies.css";

export const SavedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [additionalMoviesToShow, setAdditionalMoviesToShow] = useState(0);
  const [moviesShown, setMoviesShown] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchString, setSearchString] = useState(null);
  const [screenSize, setScreenSize] = useState("mobile");
  const [filterOnlyShortMovies, setFilterOnlyShortMovies] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    setSearchString(localStorage.getItem("saved-movie-search-string"));
    getMovies().then((movies) => setMovies(movies));
    getSavedMovies().then((movies) => setSavedMovies(movies));

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const moviesShownCount =
      getMovieCountBasedOnScreenSize() + additionalMoviesToShow;

    const filteredMovies = movies
      .filter(
        (movie) =>
          movie.nameRU?.toLowerCase().includes(searchString?.toLowerCase()) ||
          movie.nameEN?.toLowerCase().includes(searchString?.toLowerCase())
      )
      .filter((movie) => (filterOnlyShortMovies ? movie.duration < 40 : true))
      .filter((_, index) => index < moviesShownCount)
      .filter((movie) => isSavedMovie(movie));

    setMoviesShown(filteredMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    movies,
    screenSize,
    additionalMoviesToShow,
    searchString,
    filterOnlyShortMovies,
    savedMovies,
  ]);

  useEffect(() => {
    setAdditionalMoviesToShow(0);
  }, [screenSize]);

  const getMovieCountBasedOnScreenSize = () => {
    if (screenSize === "desktop") {
      return 12;
    }

    if (screenSize === "tablet") {
      return 8;
    }

    return 5;
  };

  const handleWindowResize = () => {
    if (window.innerWidth <= 767) {
      setScreenSize("mobile");
    }

    if (window.innerWidth >= 768 && window.innerWidth <= 1023) {
      setScreenSize("tablet");
    }

    if (window.innerWidth >= 1024) {
      setScreenSize("desktop");
    }
  };

  const handleLoadMoreButtonClick = () => {
    if (screenSize === "desktop") {
      setAdditionalMoviesToShow((v) => v + 3);
    } else if (screenSize === "tablet") {
      setAdditionalMoviesToShow((v) => v + 2);
    } else {
      // mobile
      setAdditionalMoviesToShow((v) => v + 1);
    }
  };

  const handleSearchSubmit = (val) => {
    setSearchString(val);
    localStorage.setItem("saved-movie-search-string", val);
  };

  const handleShowShortMoviesToggle = (val) => {
    setFilterOnlyShortMovies(val);
  };

  const handleMovieAction = async (movieObject, action) => {
    if (action === "delete") {
      deleteUnsaveMovie(getSavedMovieId(movieObject)).then(() => {
        getSavedMovies().then((movies) => setSavedMovies(movies));
      });
    }
  };

  const filterSavedMovies = (movies) =>
    movies.filter((movie) => movie.owner === currentUser.id);

  const isSavedMovie = (movie) => {
    const savedMovieIds = filterSavedMovies(savedMovies).map(
      (movie) => movie.movieId
    );

    return savedMovieIds.includes(movie.id);
  };

  const getSavedMovieId = (movie) => {
    const savedMovie = savedMovies.find(
      (savedMovie) => savedMovie?.movieId === movie.id
    );
    return savedMovie._id;
  };

  return (
    <AuthLayout
      mainClassName="saved-movies"
      header={<MenuHeader />}
      footer={<Footer />}
    >
      <MoviesSearch
        onSearchSubmit={handleSearchSubmit}
        onShowShortMoviesToggle={handleShowShortMoviesToggle}
      />
      <div className="saved-movies__separator" />
      {/* movies not loaded or not found */}
      {moviesShown.length <= 0 ? (
        (() => {
          if (!searchString) {
            return null;
          }

          if (!movies.length) {
            return (
              <MovieGrid centered>
                <Preloader />
              </MovieGrid>
            );
          }

          return (
            <p className="movies__nothing-found-text">Ничего не найдено</p>
          );
        })()
      ) : (
        <>
          <MovieGrid>
            {moviesShown.map((movie, index) => (
              <MovieCard
                onActionClick={(action) => handleMovieAction(movie, action)}
                image={`${MOVIES_FILE_URL}${movie.image.url}`}
                link={movie.trailerLink}
                duration={movie.duration}
                deleteMovie
                title={movie.nameRU}
                key={index}
              />
            ))}
          </MovieGrid>
          {moviesShown.length >=
            additionalMoviesToShow + getMovieCountBasedOnScreenSize() &&
            moviesShown.length > 3 && (
              <button
                className="movies__load-button"
                onClick={handleLoadMoreButtonClick}
              >
                Ещё
              </button>
            )}
        </>
      )}
    </AuthLayout>
  );
};
