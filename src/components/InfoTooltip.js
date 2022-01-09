import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container popup__container_type_login-message">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        <img src={props.icon} alt={props.iconTitle} className="popup__icon" />
        <h2 className="popup__title popup__title_type_login-message">{props.title}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;
