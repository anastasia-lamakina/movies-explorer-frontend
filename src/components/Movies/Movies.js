import React, { useEffect, useState, useContext } from "react";
import { getMovies } from "../../utils/MoviesApi";
import { Footer } from "../Footer/Footer";
import { AuthLayout } from "../AuthLayout/AuthLayout";
import MenuHeader from "../MenuHeader/MenuHeader";
import { MovieCard } from "../MovieCard/MovieCard";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import { MoviesSearch } from "../MoviesSearch/MoviesSearch";
import "./Movies.css";
import { Preloader } from "../Preloader/Preloader";
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
import {
  deleteUnsaveMovie,
  getSavedMovies,
  postSaveMovie,
} from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export const Movies = () => {
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

    setSearchString(localStorage.getItem("movie-search-string"));
    setFilterOnlyShortMovies(
      localStorage.getItem("movie-search-filter-short") === "true"
    );

    setMovies(JSON.parse(localStorage.getItem("movies")) || []);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (searchString && !movies.length) {
      getMovies().then((movies) => {
        setMovies(movies);
        localStorage.setItem("movies", JSON.stringify(movies));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useEffect(() => {
    getSavedMovies().then((movies) => setSavedMovies(movies));
  }, [movies]);

  useEffect(() => {
    const moviesShownCount =
      getMovieCountBasedOnScreenSize() + additionalMoviesToShow;

    const filteredMovies = movies
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
    localStorage.setItem("movie-search-string", val);
  };

  const handleShowShortMoviesToggle = (val) => {
    setFilterOnlyShortMovies(val);
    localStorage.setItem("movie-search-filter-short", val);
  };

  const handleMovieAction = async (movieObject, action) => {
    if (action === "save") {
      postSaveMovie(movieObject).then((movie) => {
        setSavedMovies([...savedMovies, movie]);
      });
    } else if (action === "unsave") {
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
    const savedMovie = filterSavedMovies(savedMovies).find(
      (savedMovie) => savedMovie?.movieId === movie.id
    );
    return savedMovie._id;
  };

  return (
    <AuthLayout
      mainClassName="movies"
      header={<MenuHeader />}
      footer={<Footer />}
    >
      <MoviesSearch
        onSearchSubmit={handleSearchSubmit}
        onShowShortMoviesToggle={handleShowShortMoviesToggle}
        searchValue={searchString}
        shortMovieLocalStorageKey={"movie-search-filter-short"}
      />
      <div className="movies__separator" />
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
                saved={isSavedMovie(movie)}
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
