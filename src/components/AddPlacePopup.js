import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleChangeName(event) {
    setName(event.target.value)
  }

  function handleChangeLink(event) {
    setLink(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('')
      setLink('')
    }
  }, [props.isOpen])

  return (
    <PopupWithForm
      name={'add-card'}
      title={'Новое место'}
      buttonTitle={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
        <label htmlFor="title"/><input type="text" value={name || ''} onChange={handleChangeName} id="title" name="title" placeholder="Название" className="popup__text popup__text_type_title" minLength="1" maxLength="30" required />
        <span id="title-error" className="popup__error"></span>
        <label htmlFor="image-link"/><input type="url" value={link || ''} onChange={handleChangeLink} id="image-link" name="image_link" placeholder="Ссылка на картинку" className="popup__text popup__text_type_image-link" required />
        <span id="image-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
