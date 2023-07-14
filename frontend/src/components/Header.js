import React from "react";
import headerLogo from "../images/logo/header-logo.svg";
import { Link, useLocation } from "react-router-dom";
import Info from "./Info";

const Header = ({ email, loggedIn, onClick }) => {
  const location = useLocation();
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип Место" />
      {loggedIn ? (
        <Info email={email} loggedIn={loggedIn} onClick={onClick} />
      ) : (
        <>
          {location.pathname === "/sign-up" ? (
            <Link className="header__link" to="/sign-in">
              Регистрация
            </Link>
          ) : (
            <Link className="header__link" to="/sign-up">
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
