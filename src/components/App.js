import React from 'react';
import '../index.css';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';
import rejectIcon from '../images/reject-icon.svg';
import successIcon from '../images/success-icon.svg';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState(null);
  const [infoToolTip, setInfoToolTip] = React.useState(false);
  const [infoToolTipIcon, setInfoToolTipIcon] = React.useState('');
  const [infoToolTipTitle, setInfoToolTipTitle] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const {pathname} = useLocation();
  const registerPath = "/sign-in" === pathname;
  const loginPath = "/sign-up" === pathname;
  const mainPath = "/" === pathname;
  const navigate = useNavigate();

  function openEditProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function openAddPlacePopup() {
    setIsAddPlacePopupOpen(true)
  }

  function openEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function openInfoToolTipPopup() {
    setInfoToolTip(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setInfoToolTip(false)
    setSelectedCard(null)
  }

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData)
      setCards(cardsData)
    }).catch((err) => {
      console.log(`Ошибка при получении данных: ${err}`)
    })
  }, [])

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true)
            setHeaderEmail(res.data.email)
          }
        })
        .catch((err) => {
          console.log(`Ошибка при получении токена: ${err}`)
        })
    }
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.setLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(`Ошибка при постановке лайка: ${err}`)
      })
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch((err) => {
        console.log(`Ошибка при удалении лайка: ${err}`)
      })
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() =>
      setCards((list) => list.filter((c) => c._id !== card._id))
    ).catch((err) => {
      console.log(`Ошибка при удалении карточки: ${err}`)
    })
  }

  function handleUpdateUser(data) {
    Promise.resolve(api.setUserData(data)).then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    }).catch((err) => {
      console.log(`Ошибка при загрузке данных: ${err}`)
    })
  }

  function handleUpdateAvatar(data) {
    Promise.resolve(api.setUserAvatar(data)).then((avatar) => {
      setCurrentUser(avatar)
      closeAllPopups()
    }).catch((err) => {
      console.log(`Ошибка при загрузке аватара: ${err}`)
    })
  }

  function handleAddPlaceSubmit(data) {
    Promise.resolve(api.addNewCard(data)).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups()
    }).catch((err) => {
      console.log(`Ошибка при добавлении карточки: ${err}`)
    })
  }

  function onRegister(email, password) {
    auth.register(email, password)
      .then(() => {
        setInfoToolTipIcon(successIcon)
        setInfoToolTipTitle("Вы успешно зарегистрировались!")
        navigate("/sign-in")
      })
      .catch(() => {
        setInfoToolTipIcon(rejectIcon)
        setInfoToolTipTitle("Что-то пошло нет так! Попробуйте ещё раз.")
      })
      .finally(openInfoToolTipPopup)
  }

  function onLogin(email, password) {
    auth.login(email, password)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        setHeaderEmail(email)
        navigate("/")
      })
      .catch(() => {
        setInfoToolTipIcon(rejectIcon)
        setInfoToolTipTitle("Что-то пошло нет так! Попробуйте ещё раз.")
        openInfoToolTipPopup()
      })
  }

  function onSignOut() {
    setIsLoggedIn(false)
    setHeaderEmail(null)
    navigate("/sign-in")
    localStorage.removeItem("jwt")
  }

  function headerLinkTextChange() {
    if (registerPath) {
      return <Link to="/sign-up" className="header__link">Регистрация</Link>
    } else if (loginPath) {
      return <Link to="/sign-in" className="header__link">Войти</Link>
    } else if (mainPath) {
      return <Link to="/sign-in" className="header__link" onClick={onSignOut}>Выйти</Link>
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
      <div className="main">
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            headerEmail={headerEmail}
            headerLinkTextChange={headerLinkTextChange}
          />
          <Routes>
            <Route path="/sign-in" element={
              <Login
                title="Вход"
                buttonText="Войти"
                onLogin={onLogin}
              />} />
            <Route path="/sign-up" element={
              <Register
                title="Регистрация"
                buttonText="Зарегистрироваться"
                onRegister={onRegister}
              />} />
            <Route path="/" element={
              <ProtectedRoute
                onEditAvatar={openEditAvatarPopup}
                onEditProfile={openEditProfilePopup}
                onAddPlace={openAddPlacePopup}
                onCardClick={handleCardClick}
                currentUser={currentUser}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                component={Main}
                isLoggedIn={isLoggedIn}
              /> } />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/sign-in"}/>} />
          </Routes>
          {isLoggedIn ? <Footer /> : ''}

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          <InfoTooltip
            isOpen={infoToolTip}
            onClose={closeAllPopups}
            icon={infoToolTipIcon}
            title={infoToolTipTitle}
          />
        </div>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
