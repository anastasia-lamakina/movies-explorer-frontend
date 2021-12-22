import React, { useRef } from "react";
import "./MoviesSearch.css";
import searchIcon from "../../images/searchIcon.svg";
import { useEffect, useState } from "react/cjs/react.development";

export const MoviesSearch = ({ onSearchSubmit, onShowShortMoviesToggle }) => {
  const inputRef = useRef();
  const [showShortMovies, setShowShortMovies] = useState(false);

  useEffect(() => {
    const previousSearchString = localStorage.getItem("movie-search-string");
    if (previousSearchString) {
      inputRef.current.value = previousSearchString;
    }
  }, []);

  useEffect(() => {
    onShowShortMoviesToggle(showShortMovies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showShortMovies]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(inputRef.current.value);
  };

  const handleToggle = () => {
    setShowShortMovies(!showShortMovies);
  };

  return (
    <form className="movies-search" onSubmit={handleFormSubmit}>
      <div className="movies-search__search">
        <span className="movies-search__input-container">
          <img src={searchIcon} className="movies-search__icon" alt="Поиск" />
          <input
            className="movies-search__input"
            placeholder="Фильм"
            ref={inputRef}
            required
          />
        </span>
        <input type="submit" className="movies-search__button" value="Найти" />
      </div>
      <div className="movies-search__toggle-container">
        <label className="movies-search__toggle">
          <input
            type="checkbox"
            onChange={handleToggle}
            checked={showShortMovies}
          />
          <span className="movies-search__toggle-round" />
        </label>
        <div className="movies-search__toggle-text">Короткометражки</div>
      </div>
    </form>
  );
};
