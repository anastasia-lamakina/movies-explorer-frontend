import React from "react";
import "./Footer.css";

export const Footer = () => (
  <footer className="footer">
    <div className="footer__edutext">
      Учебный проект Яндекс.Практикум х BeatFilm.
    </div>
    <div className="footer__separator" />
    <div className="footer__group">
      <ul className="footer__link-list">
        <li className="footer__link-item">
          <a className="footer__link" href="https://practicum.yandex.ru/">
            Яндекс.Практикум
          </a>
        </li>
        <li className="footer__link-item">
          <a
            className="footer__link"
            href="https://github.com/anastasia-lamakina"
          >
            Github
          </a>
        </li>
        <li className="footer__link-item">
          <a
            className="footer__link"
            href="https://www.facebook.com/iclosemyeyes/"
          >
            Facebook
          </a>
        </li>
      </ul>
      <div className="footer__copyright">©2020</div>
    </div>
  </footer>
);
