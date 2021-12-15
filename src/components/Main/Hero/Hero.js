import React from "react";
import "./Hero.css";
import landingLogo from "../../../images/landingLogo.svg";

export const Hero = () => (
  <div className="hero">
    <span className="landing__container">
      <h1 className="landing__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img
        className="landing__logo"
        src={landingLogo}
        alt="Картинка с кругами"
      />
    </span>
  </div>
);
