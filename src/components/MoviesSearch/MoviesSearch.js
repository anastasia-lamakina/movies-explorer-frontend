import React from "react";
import "./MoviesSearch.css";

export const MoviesSearch = () => (
  <div className="movies-search">
    <div className="movies-search__search">
      <input className="movies-search__input" placeholder="Фильм" />
      <button className="movies-search__button">Найти</button>
    </div>
    <div className="movies-search__toggle-container">
      <label class="movies-search__toggle">
        <input type="checkbox" />
        <span class="movies-search__toggle-round" />
      </label>
      <div className="movies-search__toggle-text">Короткометражки</div>
    </div>
  </div>
);
