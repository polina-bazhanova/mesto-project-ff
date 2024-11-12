import { closePopup } from './modal.js';

const formNewCard = document.forms['new-place'];
const placeNameInput = formNewCard.elements['place-name'];
const link = formNewCard.elements.link;
const cardContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const popupTypeAddCard = document.querySelector('.popup_type_new-card');

function addNewCard(evt, handleDeleteCard, handleLikeCard, handleImageClick) {
  evt.preventDefault();

  const cardData = {
    name: placeNameInput.value,
    link: link.value,
  };

  const newCardElement = renderCard(cardData, handleDeleteCard, handleLikeCard, handleImageClick);

  cardContainer.prepend(newCardElement);
  closePopup(popupTypeAddCard);
}

function renderCard(initialCard, handleDeleteCard, handleLikeCard, handleImageClick) {
  const renderedCardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = renderedCardElement.querySelector('.card__image');
  const cardTitle = renderedCardElement.querySelector('.card__title');
  const removeButton = renderedCardElement.querySelector('.card__delete-button');
  const cardLikeButton = renderedCardElement.querySelector('.card__like-button');

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  removeButton.addEventListener('click', function() {
    handleDeleteCard(renderedCardElement);
  });

  cardLikeButton.addEventListener('click', function(evt) {
    handleLikeCard(evt);
  });

  cardImage.addEventListener('click', function() {   
    handleImageClick(initialCard);
  });

  return renderedCardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export { addNewCard, renderCard, deleteCard, likeCard };
