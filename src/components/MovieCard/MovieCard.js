import React from "react";
import "./MovieCard.css";
import saveIcon from "../../images/saveIcon.svg";
import savedIcon from "../../images/savedIcon.svg";
import deleteIcon from "../../images/deleteIcon.svg";

const ActionButton = ({ actionIcon }) => (
  <button className="movie-card__action-button">
    <img src={actionIcon} />
  </button>
);

export const MovieCard = ({ title, length, image, saved, deleteMovie }) => (
  <li className="movie-card">
    <h2 className="movie-card__heading">{title}</h2>
    <p className="movie-card__time">{length}</p>
    <div className="movie-card__action">
      {(() => {
        if (deleteMovie) {
          return <ActionButton actionIcon={deleteIcon} />;
        } else {
          if (saved) {
            return <ActionButton actionIcon={savedIcon} />;
          }
          return <ActionButton actionIcon={saveIcon} />;
        }
      })()}
    </div>
    <img className="movie-card__image" src={image} />
  </li>
);
