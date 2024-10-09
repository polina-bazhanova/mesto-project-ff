const cardTemplate = document.querySelector('#card-template').content;
const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');

function renderCard(initialCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image')
  const cardTitle = cardElement.querySelector('.card__title')
  const removeButton = cardElement.querySelector('.card__delete-button')
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;    
  removeButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });
  return cardElement
}

function deleteCards(cardElement) {
  cardElement.remove();
}

initialCards.forEach(cardData => {
  const cardElement = renderCard(cardData, deleteCards);
  addCard(cardElement);
});


function addCard(cardElement) {
  cardContainer.append(cardElement);
}
