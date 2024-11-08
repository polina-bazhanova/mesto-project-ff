import { closePopup } from './modal.js';

const formEditProfile = document.forms['edit-profile'];

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const popupTypeEdit = document.querySelector('.popup_type_edit');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');  

function fillInputs () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    
    formEditProfile.reset();
    closePopup(popupTypeEdit);
}

formEditProfile.addEventListener('submit', handleFormSubmit);

export { fillInputs }