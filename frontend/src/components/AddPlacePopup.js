import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  //Стейты имени и ссылки на картинку
  const [cardTitle, setCardTitle] = useState("");
  const [cardLink, setCardLink] = useState("");

  //Функция для установки названия места
  function handleCardTitle(event) {
    setCardTitle(event.target.value);
  }

  //Функция для установки картинки
  function handleCardLink(event) {
    setCardLink(event.target.value);
  }

  //Функция сабмита формы добавления карточки
  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: cardTitle,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardLink("");
    setCardTitle("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Новое место"
      name="new-card"
    >
      <input
        required
        name="name"
        type="text"
        className="popup__field popup__field_el_name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        onChange={handleCardTitle}
        value={cardTitle ? cardTitle : ""}
      />
      <span className="popup__form-error title-input-error"></span>
      <input
        required
        name="link"
        type="url"
        className="popup__field popup__field_el_link"
        placeholder="Ссылка на картинку"
        onChange={handleCardLink}
        value={cardLink ? cardLink : ""}
      />
      <span className="popup__form-error url-input-error"></span>
    </PopupWithForm>
  );
}
