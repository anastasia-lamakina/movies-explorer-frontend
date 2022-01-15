import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  BREAKPOINT_DESKTOP,
  BREAKPOINT_TABLET,
  MOVIES_FILE_URL,
  MOVIES_TO_ADD_DESKTOP,
  MOVIES_TO_ADD_MOBILE,
  MOVIES_TO_ADD_TABLET,
  MOVIES_TO_SHOW_DESKTOP,
  MOVIES_TO_SHOW_MOBILE,
  MOVIES_TO_SHOW_TABLET,
  SHORT_MOVIE_DURATION,
} from "../../utils/constants";
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
  const [searchString, setSearchString] = useState("");
  const [screenSize, setScreenSize] = useState("mobile");
  const [filterOnlyShortMovies, setFilterOnlyShortMovies] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    const localStorageMovies = JSON.parse(localStorage.getItem("movies"));

    if (!localStorageMovies) {
      getMovies().then((movies) => setMovies(movies));
    } else {
      setMovies(localStorageMovies);
    }

    getSavedMovies().then((movies) => setSavedMovies(movies));

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const moviesShownCount =
      getMovieCountBasedOnScreenSize() + additionalMoviesToShow;

    const filteredMovies = movies
      .filter((movie) => isSavedMovie(movie))
      .filter(
        (movie) =>
          movie.nameRU?.toLowerCase().includes(searchString?.toLowerCase()) ||
          movie.nameEN?.toLowerCase().includes(searchString?.toLowerCase())
      )
      .filter((movie) =>
        filterOnlyShortMovies ? movie.duration < SHORT_MOVIE_DURATION : true
      )
      .filter((_, index) => index < moviesShownCount);
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
      return MOVIES_TO_SHOW_DESKTOP;
    }

    if (screenSize === "tablet") {
      return MOVIES_TO_SHOW_TABLET;
    }

    return MOVIES_TO_SHOW_MOBILE;
  };

  const handleWindowResize = () => {
    if (window.innerWidth < BREAKPOINT_TABLET) {
      setScreenSize("mobile");
    }

    if (
      window.innerWidth >= BREAKPOINT_TABLET &&
      window.innerWidth < BREAKPOINT_DESKTOP
    ) {
      setScreenSize("tablet");
    }

    if (window.innerWidth >= BREAKPOINT_DESKTOP) {
      setScreenSize("desktop");
    }
  };

  const handleLoadMoreButtonClick = () => {
    if (screenSize === "desktop") {
      setAdditionalMoviesToShow((v) => v + MOVIES_TO_ADD_DESKTOP);
    } else if (screenSize === "tablet") {
      setAdditionalMoviesToShow((v) => v + MOVIES_TO_ADD_TABLET);
    } else {
      // mobile
      setAdditionalMoviesToShow((v) => v + MOVIES_TO_ADD_MOBILE);
    }
  };

  const handleSearchSubmit = (val) => {
    setSearchString(val);
  };

  const handleShowShortMoviesToggle = (val) => {
    setFilterOnlyShortMovies(val);
  };

  const handleMovieAction = async (movieObject, action) => {
    if (action === "delete") {
      const movieId = getSavedMovieId(movieObject);
      deleteUnsaveMovie(movieId).then(() => {
        setSavedMovies(savedMovies.filter((movie) => movie._id !== movieId));
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
