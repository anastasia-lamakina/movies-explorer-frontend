import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFound = () => (
  <div className="not-found">
    <div className="not-found__container">
      <h1 className="not-found__heading">404</h1>
      <h2 className="not-found__subheading">Страница не найдена</h2>
    </div>
    <Link to="/" className="not-found__link">
      Назад
    </Link>
  </div>
);
