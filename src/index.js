import './pages/index.css';
import { closePopup, openPopup } from './components/modal.js';
import { renderCard, removeCard, toggleLikeButton } from './components/card.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getCards, editUserInfo, addNewCard, editUserAvatar } from './components/api.js';

const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');

const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const formEditAvatar = document.forms['edit-avatar'];

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const popups = document.querySelectorAll('.popup');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupImageEditAvatar = document.querySelector('.popup_type_edit-avatar');

const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__image_edit-button');

const placeNameInput = formNewCard.elements['place-name'];
const editAvatarInput = formEditAvatar.elements.avatar;

const link = formNewCard.elements.link;

const popupImageContent = popupImage.querySelector('.popup__content');
const popupImageCaption = popupImageContent.querySelector('.popup__caption');
const popupImageElement = popupImageContent.querySelector('.popup__image');

let myID = ''

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

function handleImageClick(cardData) {
  openPopup(popupImage);
  popupImageCaption.textContent = cardData.name;
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
};

const promises = [getUserInfo(), getCards()];

Promise.all(promises)
  .then(([userData, cards]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`
    myID = userData._id;

    cards.forEach((card) => {
    const initialCardElement = renderCard(card, myID, removeCard, toggleLikeButton, handleImageClick);
    appendCard(initialCardElement);
  })
});

function fillInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
};

function setButtonLoadingState(button, isLoading, loadingText = 'Сохранение...', defaultText = 'Сохранить') {
  button.textContent = isLoading ? loadingText : defaultText;
}

function handleFormError(err) {
  console.error(err);
}

function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();

  const button = formEditProfile.querySelector('.popup__button');
  setButtonLoadingState(button, true);

  editUserInfo(nameInput.value, jobInput.value)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profileDescription.textContent = jobInput.value;
      closePopup(popupTypeEdit);
    })
    .catch(handleFormError)
    .finally(() => setButtonLoadingState(button, false)); 
};

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();

  const button = formEditAvatar.querySelector('.popup__button');
  setButtonLoadingState(button, true);

  editUserAvatar(editAvatarInput.value).then(userData => {
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    closePopup(popupImageEditAvatar);
    formEditAvatar.reset;
  })
  .catch(handleFormError)
  .finally(() => setButtonLoadingState(button, false));
};

function handleAddNewCardFormSubmit(evt, handleDeleteCard, handleLikeCard, handleImageClick) {
  evt.preventDefault();

  const button = formNewCard.querySelector('.popup__button');
  setButtonLoadingState(button, true);

  addNewCard(placeNameInput.value, link.value)
  .then(newCard => {  
    const newCardElement = renderCard(newCard, myID, handleDeleteCard, handleLikeCard, handleImageClick);
    
    cardContainer.prepend(newCardElement);
    closePopup(popupTypeAddCard);
  })
  .catch(handleFormError)
  .finally(() => setButtonLoadingState(button, false));
};

function appendCard(newCardElement) {
  cardContainer.append(newCardElement);
};

profileEditButton.addEventListener('click', function() {
  clearValidation(popupTypeEdit, validationConfig)
  openPopup(popupTypeEdit);
  fillInputs();
});

addCardButton.addEventListener('click', function() {
  clearValidation(formNewCard, validationConfig);
  openPopup(popupTypeAddCard);
});

avatarEditButton.addEventListener('click', () => {
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupImageEditAvatar);
});

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});


popups.forEach(popup => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    } else if (evt.target === popup) {
      closePopup(popup);
    }
  });
});



formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

formNewCard.addEventListener('submit', function(evt) {
  handleAddNewCardFormSubmit(evt, removeCard, toggleLikeButton, handleImageClick);
  formNewCard.reset();
});

formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

enableValidation(validationConfig);
