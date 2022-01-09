export default function renderLoading(popup, isLoading, title = 'Сохранить', loadingTitle = 'Сохранение...') {
  if (isLoading === true) {
    popup.querySelector('.popup__submit-button').textContent === loadingTitle
  } else {
    popup.querySelector('.popup__submit-button').textContent === title
  }
}
