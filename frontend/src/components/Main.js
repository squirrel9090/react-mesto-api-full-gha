import React from 'react'
import Card from './Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main({
  onEditAvatarPopupOpen,
  onEditProfilePopupOpen,
  onAddPlacePopupOpen,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
}) {
  //подписываемся на контекст
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main className='main'>
      <section className='profile'>
        <button
          type='button'
          className='profile__avatar-button'
          onClick={onEditAvatarPopupOpen}
        ></button>
        <img
          src={`${currentUser.avatar}`}
          alt='аватар профиля'
          className='profile__avatar'
        />
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser.name}</h1>
          <button
            type='button'
            className='profile__edit-button'
            onClick={onEditProfilePopupOpen}
          ></button>
        </div>
        <p className='profile__activity'>{currentUser.about}</p>
        <button
          type='button'
          className='profile__add-button'
          onClick={onAddPlacePopupOpen}
        ></button>
      </section>
      <section className='elements' aria-label='Фотогалерея'>
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  )
}

export default Main
