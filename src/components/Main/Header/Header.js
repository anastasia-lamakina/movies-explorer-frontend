import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import headerLogo from "../../../images/headerLogo.svg";

export const Header = () => (
  <header className="header">
    <Link to="/" className="header__logo">
      <img src={headerLogo} alt="Логотип" />
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
);
