import React from "react";
import "./AuthHeader.css";
import headerLogo from "../../images/headerLogo.svg";
import { Link } from "react-router-dom";

export const AuthHeader = ({ children: text }) => (
  <header className="auth-header">
    <Link to="/" className="auth-header__logo">
      <img src={headerLogo} />
    </Link>
    <h1 className="auth-header__heading">{text}</h1>
  </header>
);
