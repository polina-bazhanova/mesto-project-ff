import { fillInputs } from './edit-profile.js';

const profile = document.querySelector('.profile');
const popups = document.querySelectorAll('.popup');

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

function openPopup(targetPopup) {
  targetPopup.classList.add('popup_is-opened');  
}

profile.addEventListener('click', function(evt) {
  if(evt.target.classList.contains('profile__edit-button')) { 
    openPopup(popupTypeEdit);
    fillInputs();
  } else if (evt.target.classList.contains('profile__add-button')) {
    openPopup(popupTypeAddCard);
  } 
});

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_is-opened');
}

popups.forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    } else if (evt.target === popup) {
      closePopup(popup);
    }
  });
})

popups.forEach(popup => {
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
});
})

export { closePopup };
export { openPopup };