import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_open-image ${props.card ? 'popup_opened' : ''}`} >
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
        <p className="popup__image-title">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  )
}

export default ImagePopup;
