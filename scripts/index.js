const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');

function renderCards(initialCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = initialCard.link;
  cardElement.querySelector('.card__title').textContent = initialCard.name;  
  const removeButton = cardElement.querySelector('.card__delete-button')
  removeButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });
  cardContainer.append(cardElement);
}

initialCards.forEach(cardData => {
  renderCards(cardData, deleteCards);
});

function deleteCards(cardElement) {
  cardElement.remove();
}