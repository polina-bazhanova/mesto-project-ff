import { closePopup } from './modal.js';

const formNewCard = document.forms['new-place'];

const placeNameInput = formNewCard.elements['place-name'];
const link = formNewCard.elements.link;

const cardContainer = document.querySelector('.places__list');

const cardTemplate = document.querySelector('#card-template').content;
const popupTypeAddCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');


function addNewCard(evt, handleDeleteCard, handleLikeCard, handleOpenImage) {
  evt.preventDefault();
  
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const removeButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardElement.querySelector('.card__title').textContent = placeNameInput.value;
  cardElement.querySelector('.card__image').src = link.value;

  cardContainer.prepend(cardElement);

  removeButton.addEventListener('click', function() {
    handleDeleteCard(cardElement);
  });

  cardLikeButton.addEventListener('click', function(evt) {
    handleLikeCard(evt);
  });

  cardImage.addEventListener('click', function() {    
    handleOpenImage(popupImage);
    const popupContent = popupImage.querySelector('.popup__content');
    popupContent.querySelector('.popup__caption').textContent = cardTitle.textContent;
    popupContent.querySelector('.popup__image').src = cardImage.src;    
  });

  formNewCard.reset();
  closePopup(popupTypeAddCard);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function openCardImage(targetPopup) {
  targetPopup.classList.add('popup_is-opened');
  
}

formNewCard.addEventListener('submit', function(evt) {
  addNewCard(evt, deleteCard, likeCard, openCardImage);
});

function renderCard(initialCard, handleDeleteCard, handleLikeCard, handleOpenImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  const removeButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  removeButton.addEventListener('click', function() {
    handleDeleteCard(cardElement);
  });

  cardLikeButton.addEventListener('click', function(evt) {
    handleLikeCard(evt);
  });  

  cardImage.addEventListener('click', function() {    
    handleOpenImage(popupImage);
    const popupContent = popupImage.querySelector('.popup__content');
    popupContent.querySelector('.popup__caption').textContent = cardTitle.textContent;
    popupContent.querySelector('.popup__image').src = cardImage.src;    
  });
  return cardElement
}

export { renderCard };
export { deleteCard };
export { likeCard };
export { openCardImage }