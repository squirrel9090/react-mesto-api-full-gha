import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext)

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id

  //Обработчик клика по карточке
  function handleCardClick() {
    onCardClick(card)
  }
  //Обработчик лайка по карточке
  function handleLikeClick() {
    onCardLike(card)
  }
  //Обработчик удаления карточки
  function handleDeleteCard() {
    onCardDelete(card)
  }
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id)
  //закрашивание лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_active' : ''
  }`

  return (
    <div className='element'>
      {isOwn && (
        <button
          className='element__delete-button'
          type='button'
          onClick={handleDeleteCard}
        />
      )}
      <img
        src={card.link}
        alt={card.name}
        className='element__image'
        onClick={handleCardClick}
      />
      <div className='element__wrapper'>
        <h2 className='element__name'>{card.name}</h2>
        <div className='element__like-group'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className='element__like-counter'>{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
