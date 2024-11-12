function openPopup(targetPopup) {
  targetPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscape);
}

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscape);
}

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

export { closePopup, openPopup };