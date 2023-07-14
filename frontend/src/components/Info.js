import { Link } from "react-router-dom";

export default function Info({ email, onClick }) {
  return (
    <div className="header__container">
      <p className="header__email">{email}</p>
      <Link to="sign-up" className="header__link" onClick={onClick}>
        Выйти
      </Link>
    </div>
  );
}
