import React from "react";
import "./MoviesSearch.css";
import searchIcon from "../../images/searchIcon.svg";

export const MoviesSearch = () => (
  <form className="movies-search">
    <div className="movies-search__search">
      <span className="movies-search__input-container">
        <img src={searchIcon} className="movies-search__icon" alt="Поиск" />
        <input className="movies-search__input" placeholder="Фильм" required />
      </span>
      <input type="submit" className="movies-search__button" value="Найти" />
    </div>
    <div className="movies-search__toggle-container">
      <label class="movies-search__toggle">
        <input type="checkbox" />
        <span class="movies-search__toggle-round" />
      </label>
      <div className="movies-search__toggle-text">Короткометражки</div>
    </div>
  </form>
);
