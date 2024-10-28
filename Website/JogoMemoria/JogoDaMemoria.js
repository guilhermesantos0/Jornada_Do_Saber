function startGame(difficulty) {
    // Redireciona para uma página específica de acordo com o nível
    window.alert(difficulty)
    if (difficulty === 2) {
        window.location.href = "facil.html";
    } else if (difficulty === 3) {
        window.location.href = "medio.html";
    } else if (difficulty === 4) {
        window.location.href = "dificil.html";
    }
}

const cardImages = [
    '🐶', '🐱', '🐭', '🐹', // Use emojis como substitutos para as imagens
];

let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;

function startGame(pairs) {
    totalPairs = pairs;
    matchedPairs = 0;
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Limpa o tabuleiro
    const cards = generateCards(pairs);
    cards.forEach(card => gameBoard.appendChild(card));
    gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(pairs * 2)}, 1fr)`;
}

function generateCards(pairs) {
    const cardIndices = [...Array(pairs).keys()];
    const cardPairs = cardIndices.concat(cardIndices);
    cardPairs.sort(() => Math.random() - 0.5);

    return cardPairs.map(index => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${cardImages[index]}</div>
        `;
        card.addEventListener('click', () => flipCard(card, index));
        return card;
    });
}

function flipCard(card, index) {
    if (flippedCards.length === 2 || card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');
    flippedCards.push({ card, index });

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flippedCards;

    if (first.index === second.index) {
        matchedPairs++;
        if (matchedPairs === totalPairs) {
            setTimeout(showWinMessage, 500);
        }
    } else {
        setTimeout(() => {
            first.card.classList.remove('flipped');
            second.card.classList.remove('flipped');
        }, 1000);
    }

    flippedCards = [];
}

function showWinMessage() {
    document.getElementById('win-message').classList.remove('hidden');
}

function resetGame() {
    document.getElementById('win-message').classList.add('hidden');
    startGame(totalPairs);
}
