import React from "react";
import "./MovieGrid.css";

export const MovieGrid = ({ children, centered }) => (
  <ul className={`movie-grid ${centered && "movie-grid_centered"}`}>
    {children}
  </ul>
);
