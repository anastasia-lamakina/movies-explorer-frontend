import React, { useState } from "react";
import "./MovieCard.css";
import saveIcon from "../../images/saveIcon.svg";
import savedIcon from "../../images/savedIcon.svg";
import deleteIcon from "../../images/deleteIcon.svg";
import { Preloader } from "../Preloader/Preloader";

const ActionButton = ({ actionIcon, onClick }) => (
  <button className="movie-card__action-button" onClick={onClick}>
    <img src={actionIcon} alt="Кнопка" />
  </button>
);

export const MovieCard = ({
  title,
  duration,
  image,
  saved,
  deleteMovie,
  link,
  onActionClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleImageClick = () => {
    window.open(link, "_blank");
  };

  const durationToString = () => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч ${minutes}м`;
  };

  return (
    <li className="movie-card">
      {imageLoaded ? (
        <>
          <h2 className="movie-card__heading">{title}</h2>
          <p className="movie-card__time">{durationToString(duration)}</p>
          <div className="movie-card__action">
            {(() => {
              if (deleteMovie) {
                return (
                  <ActionButton
                    actionIcon={deleteIcon}
                    onClick={() => onActionClick("delete")}
                  />
                );
              } else {
                if (saved) {
                  return (
                    <ActionButton
                      actionIcon={savedIcon}
                      onClick={() => onActionClick("unsave")}
                    />
                  );
                }
                return (
                  <ActionButton
                    actionIcon={saveIcon}
                    onClick={() => onActionClick("save")}
                  />
                );
              }
            })()}
          </div>
        </>
      ) : (
        <Preloader />
      )}
      <img
        className="movie-card__image"
        style={imageLoaded ? {} : { display: "none" }}
        src={image}
        alt="Превью фильма"
        onLoad={() => setImageLoaded(true)}
        onClick={handleImageClick}
      />
    </li>
  );
};
