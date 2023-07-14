import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext);

  //Cтейты имени и описания профиля
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  //Изменяем имя через поле ввода
  function handleUserName(event) {
    setName(event.target.value);
  }

  //Изменяем описание профиля через поле ввода
  function handleUserDescription(event) {
    setDescription(event.target.value);
  }

  //Сабмит формы
  function hendleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={hendleSubmit}
    >
      <input
        required
        name="name"
        type="text"
        className="popup__field popup__field_el_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        id="name-input"
        onChange={handleUserName}
        value={name ? name : ""}
      />
      <span className="popup__form-error name-input-error"></span>
      <input
        required
        name="description"
        type="text"
        className="popup__field popup__field_el_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        id="job-input"
        onChange={handleUserDescription}
        value={description ? description : ""}
      />
      <span className="popup__form-error job-input-error"></span>
    </PopupWithForm>
  );
}
