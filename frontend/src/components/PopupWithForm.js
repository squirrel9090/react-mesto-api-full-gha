import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, children, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen && "popup__opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className="popup__header">{title}</h2>
        <form name={name} className="popup__form" onSubmit={onSubmit}>
          {children}
          <button className="popup__submit-button" type="submit">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
