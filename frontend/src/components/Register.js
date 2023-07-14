import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({ registerUser }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleOnChange = (evt) => {
    const input = evt.target;
    setForm({ ...form, [input.name]: input.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(form);
    registerUser(form);
  };
  return (
    <div className="authorization">
      <form
        onSubmit={handleSubmit}
        className="authorization__wrapper"
        noValidate
        name="register"
      >
        <h2 className="authorization__title">Регистрация</h2>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          className="authorization__input"
          onChange={handleOnChange}
          autoComplete="off"
        />

        <input
          id="password"
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          className="authorization__input"
          onChange={handleOnChange}
          autoComplete="off"
        />
        <div className="authorization__container">
          <button type="submit" className="authorization__button pointer">
            Зарегистрироваться
          </button>
          <Link to="/sign-in" className="authorization__login-text">
            Уже зарегистрированы? Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
