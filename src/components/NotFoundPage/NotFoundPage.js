import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

export const NotFound = () => {
  let navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__heading">404</h1>
        <h2 className="not-found__subheading">Страница не найдена</h2>
      </div>
      <button className="not-found__link" onClick={handleBackClick}>
        Назад
      </button>
    </div>
  );
};
