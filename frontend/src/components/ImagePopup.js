import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_open-image popup_background_dark ${
        card && "popup__opened"
      }`}
    >
      <figure className="popup__figure">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <figcaption className="popup__caption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
