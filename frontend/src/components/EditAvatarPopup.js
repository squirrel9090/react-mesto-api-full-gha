import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // реф для доступа к инпуту
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="change-avatar-input"
        type="url"
        name="link"
        className="popup__field popup__field_el_link"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
        required
      />
      <span className="popup__form-error change-avatar-input-error"></span>
    </PopupWithForm>
  );
}
