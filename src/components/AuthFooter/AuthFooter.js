import React from "react";
import { Link } from "react-router-dom";
import "./AuthFooter.css";

export const AuthFooter = ({
  buttonText,
  onButtonClick,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}) => (
  <footer className="auth-footer">
    <button className="auth-footer__button" onClick={onButtonClick}>
      {buttonText}
    </button>
    <div className="auth-footer__bottom-container">
      <p className="auth-footer__bottom-text">{bottomText}</p>
      <Link className="auth-footer__bottom-link" to={bottomLinkTo}>
        {bottomLinkText}
      </Link>
    </div>
  </footer>
);
