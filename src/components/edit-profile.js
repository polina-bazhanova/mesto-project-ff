import { closePopup } from './modal.js';

function fillInputs () {
  const formEditProfile = document.forms['edit-profile'];

  const nameInput = formEditProfile.elements.name;
  const jobInput = formEditProfile.elements.description;
  
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const formEditProfile = document.forms['edit-profile'];

  const nameInput = formEditProfile.elements.name;
  const jobInput = formEditProfile.elements.description;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const popupTypeEdit = document.querySelector('.popup_type_edit');

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  
  closePopup(popupTypeEdit);
}

export { fillInputs, handleProfileFormSubmit }