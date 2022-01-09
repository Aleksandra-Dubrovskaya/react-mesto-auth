import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const setAvatar = React.useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    props.onUpdateAvatar({
      avatar: setAvatar.current.value
    });

    setAvatar.current.value = '';
  }

  return (
    <PopupWithForm
      name={'update-avatar'}
      title={'Обновить аватар'}
      buttonTitle={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <label htmlFor="avatar-link"/><input type="url" ref={setAvatar} defaultValue='' id="avatar-link" name="avatar_link" placeholder="Ссылка на аватар" className="popup__text popup__text_type_avatar-link" required />
        <span id="avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
