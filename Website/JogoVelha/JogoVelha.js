document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("game-board");
    let board = Array(9).fill(null);
    let isPlayerTurn = true;
    const difficulty = parseInt(document.querySelector('script[data-difficulty]').getAttribute('data-difficulty'));

    // Função para inicializar o tabuleiro
    function initializeBoard() {
        boardElement.innerHTML = ""; // Limpa o tabuleiro existente
        board = Array(9).fill(null); // Reinicia o estado do tabuleiro

        // Cria os quadrantes 3x3
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.innerHTML = `
                <div class="front"></div>
                <div class="back"></div>
            `;
            cell.addEventListener("click", () => handlePlayerMove(i, cell));
            boardElement.appendChild(cell);
        }
    }

    // Manipula a jogada do jogador
    function handlePlayerMove(index, cell) {
        if (board[index] || !isPlayerTurn) return; // Impede cliques em células ocupadas

        // Marca o movimento do jogador
        board[index] = "X";
        cell.classList.add("flipped");
        cell.querySelector(".back").textContent = "X";

        // Verifica se o jogador venceu
        if (checkWinner("X")) {
            setTimeout(showWinMessage, 500);
            return;
        }

        // Verifica se deu velha (empate)
        if (isBoardFull()) {
            setTimeout(showTieMessage, 500);
            return;
        }

        isPlayerTurn = false;
        setTimeout(aiMove, 700); // Chama o movimento da IA após 700 ms
    }

    // Movimento da IA
    function aiMove() {
        let move;
        if (difficulty === 1) {
            move = easyMove();
        } else if (difficulty === 2) {
            move = mediumMove();
        } else {
            move = minimax(board, "O").index;
        }

        if (move !== null && move !== undefined) {
            board[move] = "O";
            const cell = boardElement.children[move];
            cell.classList.add("flipped");
            cell.querySelector(".back").textContent = "O";

            if (checkWinner("O")) {
                setTimeout(showLoseMessage, 500);
                return;
            }
        }

        // Verifica se deu velha (empate) após a jogada da IA
        if (isBoardFull()) {
            setTimeout(showTieMessage, 500);
            return;
        }

        isPlayerTurn = true;
    }

    // Nível Fácil - Movimento aleatório
    function easyMove() {
        const availableMoves = board.map((v, i) => v === null ? i : null).filter(v => v !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Nível Médio - Bloqueia o jogador se ele estiver prestes a ganhar
    function mediumMove() {
        const blockingMove = findBestMove(board, "X");
        if (blockingMove !== null && blockingMove !== undefined) {
            return blockingMove; // Bloqueia o jogador
        }
        return easyMove(); // Caso não precise bloquear, faz uma jogada aleatória
    }

    // Nível Difícil - Algoritmo Minimax para a melhor jogada
    function minimax(newBoard, player) {
        const availableSpots = newBoard.map((cell, i) => cell === null ? i : null).filter(i => i !== null);

        if (checkWinner("X", newBoard)) return { score: -10 };
        if (checkWinner("O", newBoard)) return { score: 10 };
        if (availableSpots.length === 0) return { score: 0 };

        const moves = [];
        for (const spot of availableSpots) {
            newBoard[spot] = player;
            const score = minimax(newBoard, player === "O" ? "X" : "O").score;
            moves.push({ index: spot, score });
            newBoard[spot] = null;
        }

        return moves.reduce((best, move) => {
            if ((player === "O" && move.score > best.score) || (player === "X" && move.score < best.score)) return move;
            return best;
        });
    }

    // Função para verificar se o tabuleiro está completo (empate)
    function isBoardFull() {
        return board.every(cell => cell !== null);
    }

    // Função para encontrar a melhor jogada para bloquear o jogador
    function findBestMove(board, player) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const [a, b, c] of winPatterns) {
            if (board[a] === player && board[b] === player && board[c] === null) return c;
            if (board[a] === player && board[c] === player && board[b] === null) return b;
            if (board[b] === player && board[c] === player && board[a] === null) return a;
        }

        return null;
    }

    // Verifica se há um vencedor
    function checkWinner(player, boardToCheck = board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => 
            pattern.every(index => boardToCheck[index] === player)
        );
    }

    // Exibe a mensagem de vitória do jogador
    function showWinMessage() {
        document.getElementById("win-message").classList.remove("hidden");
    }

    // Exibe a mensagem de derrota do jogador
    function showLoseMessage() {
        const winMessage = document.getElementById("win-message");
        winMessage.querySelector("h2").textContent = "VOCÊ PERDEU!";
        winMessage.querySelector(".congratulations-text").textContent = "TENTE NOVAMENTE!";
        winMessage.classList.remove("hidden");
    }

    // Exibe a mensagem de empate (Velha)
    function showTieMessage() {
        const winMessage = document.getElementById("win-message");
        winMessage.querySelector("h2").textContent = "DEU VELHA!";
        winMessage.querySelector(".congratulations-text").textContent = "O JOGO TERMINOU EMPATADO!";
        winMessage.classList.remove("hidden");
    }

    initializeBoard(); // Inicia o tabuleiro
});
