import './pages/index.css';
import { closePopup, openPopup } from './components/modal.js';
import { handleProfileFormSubmit, fillInputs } from './components/edit-profile.js';
import { initialCards } from './components/cards.js';
import { addNewCard, renderCard, deleteCard, likeCard } from './components/card.js';

const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');
const formEditProfile = document.forms['edit-profile'];
const formNewCard = document.forms['new-place'];
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const buttonFormNewCard = formNewCard.querySelector('.popup__button');
const popupImageContent = popupImage.querySelector('.popup__content');
const popupImageCaption = popupImageContent.querySelector('.popup__caption');
const popupImageElement = popupImageContent.querySelector('.popup__image');

function handleImageClick(cardData) {
  openPopup(popupImage);
  popupImageCaption.textContent = cardData.name;
  popupImageElement.src = cardData.link;
  popupImageElement.alt = cardData.name;
}

initialCards.forEach(cardData => {
  const initialCardElement = renderCard(cardData, deleteCard, likeCard, handleImageClick);
  addCard(initialCardElement);
});

function addCard(newCardElement) {
  cardContainer.append(newCardElement);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

profileEditButton.addEventListener('click', function() {
  openPopup(popupTypeEdit);
  fillInputs();
});

addCardButton.addEventListener('click', function() {
  openPopup(popupTypeAddCard);
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

formNewCard.addEventListener('submit', function(evt) {
  addNewCard(evt, deleteCard, likeCard, handleImageClick);
  formNewCard.reset();
});
