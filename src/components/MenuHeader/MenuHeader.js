import React, { useState } from "react";
import "./MenuHeader.css";
import headerLogo from "../../images/headerLogo.svg";
import hamburgerIcon from "../../images/hamburgerIcon.svg";
import closeIcon from "../../images/closeIcon.svg";
import accountIcon from "../../images/accountIcon.svg";
import { Link, NavLink } from "react-router-dom";

const MenuHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="menu-header">
      <Link to="/" className="menu-header__logo">
        <img src={headerLogo} alt="Логотип" />
      </Link>
      <button
        className="menu-header__hamburger"
        onClick={() => setMenuOpen(true)}
      >
        <img src={hamburgerIcon} alt="Гамбургер" />
      </button>
      <div
        className={`menu-header__menu ${
          menuOpen ? "menu-header__menu_open" : ""
        }`}
      >
        <button
          className="menu-header__hamburger-close"
          onClick={() => setMenuOpen(false)}
        >
          <img src={closeIcon} alt="Закрытие меню" />
        </button>
        <div
          className="menu-header__menu-transparency"
          onClick={() => setMenuOpen(false)}
        />
        <nav className="menu-header__menu-nav">
          <ul className="menu-header__menu-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `menu-header__menu-link ${
                    isActive ? "menu-header__menu-link_active" : ""
                  }`
                }
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies"
                className={({ isActive }) =>
                  `menu-header__menu-link ${
                    isActive ? "menu-header__menu-link_active" : ""
                  }`
                }
              >
                Фильмы
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-movies"
                className={({ isActive }) =>
                  `menu-header__menu-link ${
                    isActive ? "menu-header__menu-link_active" : ""
                  }`
                }
              >
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/profile"
            className="menu-header__account menu-header__account_menu"
          >
            <p>Аккаунт</p>
            <img
              src={accountIcon}
              alt="Аккаунт"
              className="menu-header__account-logo"
            />
          </NavLink>
        </nav>
      </div>
      <nav className="menu-header__nav">
        <ul className="menu-header__menu-list">
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) =>
                `menu-header__menu-link ${
                  isActive ? "menu-header__menu-link_active" : ""
                }`
              }
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/saved-movies"
              className={({ isActive }) =>
                `menu-header__menu-link ${
                  isActive ? "menu-header__menu-link_active" : ""
                }`
              }
            >
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <NavLink to="/profile" className="menu-header__account">
          <p>Аккаунт</p>
          <img
            src={accountIcon}
            alt="Аккаунт"
            className="menu-header__account-logo"
          />
        </NavLink>
      </nav>
    </header>
  );
};

export default MenuHeader;
