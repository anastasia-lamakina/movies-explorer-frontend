import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import headerLogo from "../../../images/headerLogo.svg";
import landingLogo from "../../../images/landingLogo.svg";

export const Hero = () => (
  <div className="hero">
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={headerLogo} alt="Site logo" />
      </Link>
      <nav className="header__links">
        <Link to="/signup" className="header__register-link">
          Регистрация
        </Link>
        <Link to="/signin" className="header__login-link">
          Войти
        </Link>
      </nav>
    </header>
    <span className="landing__container">
      <h1 className="landing__text">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img className="landing__logo" src={landingLogo} alt="Landing logo" />
    </span>
  </div>
);
