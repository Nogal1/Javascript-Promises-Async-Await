let deckId = null;

async function initializeDeck() {
    const deckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
    const deckData = await deckResponse.json();
    deckId = deckData.deck_id;
}

async function drawCard() {
    if (!deckId) return;

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();

    if (data.cards.length === 0) {
        alert('No more cards left in the deck!');
        return;
    }

    const card = data.cards[0];
    displayCard(card);
}

function displayCard(card) {
    const cardsContainer = document.getElementById('cards-container');
    const cardImg = document.createElement('img');
    cardImg.src = card.image;
    cardImg.alt = `${card.value} of ${card.suit}`;
    cardImg.classList.add('card');

    // Random positioning for stacking effect
    const randomX = Math.random() * 80; // max x offset
    const randomY = Math.random() * 80; // max y offset
    const randomRotation = Math.random() * 360; // random rotation

    cardImg.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;

    cardsContainer.appendChild(cardImg);
}

document.getElementById('draw-card').addEventListener('click', drawCard);

initializeDeck();
