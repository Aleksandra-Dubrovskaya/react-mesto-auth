import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__remove-button ${isOwn ? 'element__remove-button' : 'element__remove-button_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button'}`
  )

  return (
    <article className="element">
      <button aria-label="Удалить" type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={props.link} alt={props.name} className="element__image" onClick={handleClick} />
      <div className="element__description">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__likes-group">
          <button aria-label="Нравится" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="element__likes-counter">{props.likes}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;
