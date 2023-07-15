import '../index.css'
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import ImagePopup from './ImagePopup'
import EditAvatarPopup from './EditAvatarPopup'
import PopupWithForm from './PopupWithForm'
import EditProfilePopup from './EditProfilePopup'
import AddPlacePopup from './AddPlacePopup'
import api from '../utils/api.js'
import { useState, useEffect } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import InfoTooltip from './InfoTooltip'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom'
import * as authApi from '../utils/authApi'
import Register from './Register'
import ProtectedRouteElement from './ProtectedRoute'
import Login from './Login'

function App() {
  //Стейт для карточек
  const [cards, setCards] = useState([])

  //Стейт для данных пользователя
  const [currentUser, setCurrentUser] = useState({})

  //Стейты для поп-апов (состояние - открыт / не открыт)
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setIsProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)

  //стейт для модального окна регистрации
  const [isTooltipOpened, setIsTooltipOpened] = useState(false)
  //статус ок/не ок
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false)

  const [headerEmail, setHeaderEmail] = useState('')

  //стейт залогинин пользователь или нет
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [userData, setUserData] = useState({ email: '', password: '' })

  const [token, setToken] = useState('')

  const navigate = useNavigate()

  //Стейт для выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null)
  //Получаем информацию о пользователе и карточке
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getCurrentUser(), api.getCard()])
        .then(([userData, cards]) => {
          setCurrentUser(userData)
          setCards(cards)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true)
  }

  //Обработчик кнопки редактирования инф-ии профиля
  function handleEditProfileClick() {
    setIsProfilePopupOpen(true)
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  //Обработчик клика по изображению карточки
  function handleCardClick(props) {
    setSelectedCard(props)
  }

  //Обработчик закрытия поп-апов
  function closeAllPopups() {
    setIsAddPlacePopupOpen(false)
    setIsAvatarPopupOpen(false)
    setIsProfilePopupOpen(false)
    setIsSuccessPopupOpen(false)
    setSelectedCard(null)
  }
  //функция лайка карточки
  function handleLikeClick(card) {
    //Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id)
    if (isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .deleteLikeFromCard(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        })
        .catch((err) => console.log(err))
    } else {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .putLikeToCard(card._id)
        .then((newCard) => {
          // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          )
        })
        .catch((err) => console.log(err))
    }
  }

  //функция удаления карточки
  function handleDeleteCard(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id))
      })
      .catch((err) => console.log(err))
  }

  //функция добавления карточки
  function handleCardAdd(card) {
    return api
      .postCardToServer(card.name, card.link)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  //функция изменения информации профиля
  function handleUserInfo(userData) {
    return api
      .patchUserData(userData.name, userData.about)
      .then((userDataServer) => {
        setCurrentUser({ ...currentUser, ...userDataServer })
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }

  //функция изменения аватара
  function handleUpdateAvatar(newAvatar) {
    return api
      .changeAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
  }
  //обновить страницу и остаться авторизованным

  /* useEffect(() => {
    const jwt = localStorage.getItem('token')
    setToken(jwt)
  }, [])*/

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token')
      authApi
        .getUserData(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
            setHeaderEmail(res.email)
            navigate('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [navigate])

  const registerUser = ({ email, password }) => {
    authApi
      .register(email, password)
      .then(() => {
        setIsTooltipOpened(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        console.log(err)
        setIsTooltipOpened(false)
      })
      .finally(() => setIsSuccessPopupOpen(true))
  }

  const loginUser = ({ email, password }) => {
    authApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem('token', res._id)
        setIsLoggedIn(true)
        setHeaderEmail(email)
        navigate('/')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        setIsTooltipOpened(false)
        setIsSuccessPopupOpen(true)
      })
  }

  const logOut = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('token')
    navigate('/sign-in')
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Header email={headerEmail} onClick={logOut} loggedIn={isLoggedIn} />
          <Routes>
            <Route
              path='/'
              element={
                <>
                  <ProtectedRouteElement
                    element={Main}
                    onEditAvatarPopupOpen={handleEditAvatarClick}
                    onEditProfilePopupOpen={handleEditProfileClick}
                    onAddPlacePopupOpen={handleAddPlaceClick}
                    LoggedIn={isLoggedIn}
                    onCardLike={handleLikeClick}
                    onCardDelete={handleDeleteCard}
                    onCardClick={handleCardClick}
                    cards={cards}
                    userData={userData}
                  />
                </>
              }
            />
            <Route
              path='/sign-up'
              element={
                <>
                  <Register registerUser={registerUser} />
                </>
              }
            ></Route>
            <Route
              path='/sign-in'
              element={
                <>
                  <Login loginUser={loginUser} />
                </>
              }
            ></Route>

            <Route
              path='/'
              element={
                isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
              }
            />
          </Routes>
          <Footer />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm
            onClose={closeAllPopups}
            name='confirm-delete'
            title='Вы уверены?'
          ></PopupWithForm>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUserInfo}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleCardAdd}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            name={'success'}
            isSuccess={isTooltipOpened}
            isOpen={isSuccessPopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
