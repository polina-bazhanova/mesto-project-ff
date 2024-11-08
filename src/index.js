import './pages/index.css';
import './components/modal.js';
import './components/edit-profile.js';
import './components/card.js';
import { initialCards } from './components/cards.js';
import { renderCard } from './components/card.js';
import { deleteCard } from './components/card.js';
import { likeCard } from './components/card.js';
import { openCardImage } from './components/card.js';



const container = document.querySelector('.places');
const cardContainer = container.querySelector('.places__list');

initialCards.forEach(cardData => {
  const cardElement = renderCard(cardData, deleteCard, likeCard, openCardImage);
  addCard(cardElement);
})

function addCard(cardElement) {
  cardContainer.append(cardElement);
}