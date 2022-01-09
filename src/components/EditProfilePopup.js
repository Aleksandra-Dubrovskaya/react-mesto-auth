import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      buttonTitle={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit} >
        <label htmlFor="user-name"/><input type="text" value={name || ''} onChange={handleChangeName} id="user-name" name="username" placeholder="Имя" className="popup__text popup__text_type_name" minLength="2" maxLength="40" required />
        <span id="user-name-error" className="popup__error"></span>
        <label htmlFor="user-job"/><input type="text" value={description || ''} onChange={handleChangeDescription} id="user-job" name="userjob" placeholder="О себе" className="popup__text popup__text_type_job" minLength="2" maxLength="200" required />
        <span id="user-job-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
