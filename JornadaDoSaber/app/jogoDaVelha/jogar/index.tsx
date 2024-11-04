import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Modal, Dimensions, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import WinImage from '@/assets/images/jogoDaVelha/win.png';
import LoseImage from '@/assets/images/jogoDaVelha/perdeu.png';
import Logo from '@/components/Logo';
import Back from '@/components/Back';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const JogoDaVelhaGame = () => {
  const router = useRouter();
  const { difficulty } = useLocalSearchParams();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(Math.random() < 0.5);
  const [message, setMessage] = useState('');
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(isPlayerTurn ? '#FFF' : '#FFF');
  const [turnMessage, setTurnMessage] = useState(isPlayerTurn ? 'Vez da IA' : 'Sua Vez');

  useEffect(() => {
    const levelMessage = difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Normal' : 'Difícil';
    setMessage(`Modo ${levelMessage} `);
  }, [difficulty]);

  useEffect(() => {
    setTurnMessage(isPlayerTurn ? 'Sua Vez' : 'Vez da IA');
  }, [isPlayerTurn]);

  const checkWinner = (newBoard) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a] === 'X' ? 'Você ganhou!' : 'Você perdeu!';
      }
    }
    return null;
  };

  const handlePlayerMove = (index) => {
    if (!board[index] && isPlayerTurn) {
      const newBoard = [...board];
      newBoard[index] = 'X';
      setBoard(newBoard);
      setIsPlayerTurn(false);
    }
  };

  const aiMoveEasy = (newBoard) => {
    let availableMoves = newBoard.map((_, i) => (newBoard[i] === null ? i : null)).filter((i) => i !== null);
    let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    newBoard[randomMove] = 'O';
    return newBoard;
  };

  const aiMoveIntermediate = (newBoard) => {
    const winningMove = findBestMove(newBoard, 'O');
    if (winningMove !== -1) {
      newBoard[winningMove] = 'O';
    } else {
      const blockingMove = findBestMove(newBoard, 'X');
      newBoard[blockingMove !== -1 ? blockingMove : newBoard.indexOf(null)] = 'O';
    }
    return newBoard;
  };

  const aiMoveAdvanced = (newBoard) => {
    const bestMove = minimax(newBoard, 'O').index;
    newBoard[bestMove] = 'O';
    return newBoard;
  };

  const findBestMove = (newBoard, player) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (newBoard[a] === player && newBoard[b] === player && newBoard[c] === null) return c;
      if (newBoard[a] === player && newBoard[c] === player && newBoard[b] === null) return b;
      if (newBoard[b] === player && newBoard[c] === player && newBoard[a] === null) return a;
    }
    return -1;
  };

  const minimax = (newBoard, player) => {
    const emptySpots = newBoard.filter(s => s === null);

    if (checkWinner(newBoard) === 'Você ganhou!') return { score: -10 };
    if (checkWinner(newBoard) === 'Você perdeu!') return { score: 10 };
    if (emptySpots.length === 0) return { score: 0 };

    const moves = [];
    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === null) {
        const move = { index: i };
        newBoard[i] = player;

        if (player === 'O') {
          const result = minimax(newBoard, 'X');
          move.score = result.score;
        } else {
          const result = minimax(newBoard, 'O');
          move.score = result.score;
        }

        newBoard[i] = null;
        moves.push(move);
      }
    }

    const bestMove = moves.reduce((best, move) => {
      if (
        (player === 'O' && move.score > best.score) ||
        (player === 'X' && move.score < best.score)
      ) return move;
      return best;
    });

    return bestMove;
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setResultMessage(winner);
      setShowResultModal(true);
      setIsPlayerTurn(false);
      setTimeout(() => {
        setShowResultModal(false);
        router.push("home");
      }, 1700);
    } else if (!board.includes(null)) {
      setBoard(Array(9).fill(null));
      setIsPlayerTurn(true);
    } else if (!isPlayerTurn) {
      const responseTime = board.every(cell => cell === null) ? 1300 : 2500;
      setTimeout(() => {
        let newBoard;
        if (difficulty === '1') {
          newBoard = aiMoveEasy([...board]);
        } else if (difficulty === '2') {
          newBoard = aiMoveIntermediate([...board]);
        } else {
          newBoard = aiMoveAdvanced([...board]);
        }
        setBoard(newBoard);
        setIsPlayerTurn(true);
      }, responseTime);
    }
  }, [isPlayerTurn]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Back url="jogoDaVelha" />
      <Logo />
      <Text style={styles.title}>JOGO DA MEMÓRIA</Text>
      <Text style={styles.difficultyText}>{message}</Text>
      <Text style={styles.turnText}>{turnMessage}</Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.cell,
              index % 3 !== 2 && { borderRightWidth: 0 },
              index < 6 && { borderBottomWidth: 0 }, 
            ]}
            onPress={() => handlePlayerMove(index)}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        transparent={true}
        visible={showResultModal}
        animationType="slide"
        onRequestClose={() => setShowResultModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {resultMessage === 'Você ganhou!' ? (
              <Image source={WinImage} style={styles.resultImage} />
            ) : (
              <Image source={LoseImage} style={styles.resultImage} />
            )}
            <Text style={styles.modalText}>{resultMessage}</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  turnText: {
    fontSize: 20,
    marginVertical: 20,
    width: '100%',
    textAlign: 'center', 
  },
  difficultyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  board: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: '#000',
  },
  cellText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth * 0.8,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#4A90E2',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  resultImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default JogoDaVelhaGame;
