import { deleteCard, likeCard } from '../components/api.js';

const cardTemplate = document.querySelector('#card-template').content;

const renderCard = (initialCard, userID, handleDeleteCard, handleLikeCard, handleImageClick) => {
  const renderedCardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = renderedCardElement.querySelector('.card__image');
  const cardTitle = renderedCardElement.querySelector('.card__title');
  const removeButton = renderedCardElement.querySelector('.card__delete-button');
  const cardLikeButton = renderedCardElement.querySelector('.card__like-button');
  const likesCounter =  renderedCardElement.querySelector('.card__like-counter');

  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;
  likesCounter.textContent = initialCard.likes.length;

  const isCardLiked = initialCard.likes.find(el => el['_id'] === userID);

  if (userID !== initialCard.owner._id) {
    removeButton.style.display = 'none'
  } else {
    removeButton.addEventListener('click', function() {
    handleDeleteCard(renderedCardElement, initialCard._id);
  });
  }

  if (isCardLiked) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }
  cardLikeButton.addEventListener('click', (evt) => {
    handleLikeCard(cardLikeButton, initialCard._id, likesCounter );
  });

  cardImage.addEventListener('click', function() {   
    handleImageClick(initialCard);
  });

  return renderedCardElement;
}

const removeCard = (cardElement, id) => {
  deleteCard(id).then(data => {
    cardElement.remove();
  })
  .catch((err) => {
    console.log(err);
  });
};

const toggleLikeButton  = (button, id, countElement) => {
  const isLiked = button.classList.contains('card__like-button_is-active')
  likeCard(id, isLiked).then(cardData => {
    button.classList.toggle('card__like-button_is-active');
    countElement.textContent = cardData.likes.length;
  })
  .catch((err) => {
    console.log(err);
  });
}

export { renderCard, removeCard, toggleLikeButton };
