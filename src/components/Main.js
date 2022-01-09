import React from 'react';
import Card from './Card';

function Main(props) {

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__header">
          <div className="profile__avatar-img" onClick={props.onEditAvatar}>
            <img src={props.currentUser.avatar} alt={props.currentUser.name} className="profile__avatar" />
          </div>
            <div className="profile__info">
              <h1 className="profile__name">{props.currentUser.name}</h1>
              <button aria-label="Редактировать" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
              <p className="profile__job">{props.currentUser.about}</p>
            </div>
        </div>
        <button aria-label="Добавить" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id}
            link={item.link}
            name={item.name}
            likes={item.likes.length}
            card={item}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  )
}

export default Main;
