function InfoTooltip({ isOpen, onClose, isSuccess, name }) {
  return (
    <>
      <div className={`popup popup_${name} ${isOpen && "popup__opened"}`}>
        <div className="popup__container">
          <button
            className="popup__close-button"
            type="button"
            onClick={onClose}
          ></button>
          <div
            className={`popup__success ${
              isSuccess ? "popup__success_type_ok" : "popup__success_type_fail"
            }`}
          />
          <h2 className="popup__header">
            {isSuccess
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте еще раз."}
          </h2>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
