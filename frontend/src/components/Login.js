import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ loginUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleOnChange = (evt) => {
    const input = evt.target;
    setForm({ ...form, [input.name]: input.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    /*console.log(form);*/
    loginUser(form);
  };
  return (
    <>
      <div className="authorization">
        <form onSubmit={handleSubmit} className="authorization__wrapper">
          <h2 className="authorization__title">Вход</h2>
          <input
            type="email"
            required
            minLength="2"
            maxLength="200"
            name="email"
            className="authorization__input"
            value={form.email}
            onChange={handleOnChange}
            placeholder="E-mail"
          />
          <input
            type="password"
            required
            minLength="2"
            maxLength="200"
            name="password"
            className="authorization__input"
            value={form.password}
            onChange={handleOnChange}
            placeholder="Password"
          />
          <button className="authorization__button" type="submit">
            Войти
          </button>
          <Link to="/sign-up" className="authorization__login-text">
            Нет учетной записи? Зарегистрироваться
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
