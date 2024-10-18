import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, SafeAreaView, Animated, Modal, TouchableOpacity, Image } from 'react-native';
import MemoryCard from '@/components/MemoryCard';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ChildBaloon from '@/components/ChildBaloon';
import Back from '@/components/Back';
import Logo from '@/components/Logo';

// Importa as imagens
const cardImages = [
  require('@/assets/images/memoria/cards/1.jpg'),
  require('@/assets/images/memoria/cards/2.jpg'),
  require('@/assets/images/memoria/cards/3.jpg'),
  require('@/assets/images/memoria/cards/4.jpg'),
  // Adicione mais imagens conforme necessário
];

const { width } = Dimensions.get('window');

const Jogar = () => {
  const router = useRouter();
  const { difficulty } = useLocalSearchParams();
  
  const getCardPairs = () => {
    switch (difficulty) {
      case '1':
        return 2;
      case '2':
        return 3;
      case '3':
        return 4;
      default:
        return 2;
    }
  };

  const [shuffledCards, setShuffledCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [matchedCards, setMatchedCards] = useState<boolean[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const pulseAnim = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    const numberOfPairs = getCardPairs();
    const totalCards = numberOfPairs * 2;

    if (pulseAnim.length === 0) {
      for (let i = 0; i < totalCards; i++) {
        pulseAnim[i] = new Animated.Value(1);
      }
    }

    resetGame(numberOfPairs, totalCards);
  }, [difficulty]);

  const resetGame = (numberOfPairs: number, totalCards: number) => {
    const newShuffledCards = [...Array(numberOfPairs).keys()]
      .flatMap(i => [i, i])
      .sort(() => Math.random() - 0.5);

    setShuffledCards(newShuffledCards);
    setFlippedCards(Array(totalCards).fill(false));
    setMatchedCards(Array(totalCards).fill(false));
    setSelectedCards([]);
  };

  const checkMatch = (firstIndex: number, secondIndex: number) => {
    if (shuffledCards[firstIndex] === shuffledCards[secondIndex]) {
      const newMatchedCards = [...matchedCards];
      newMatchedCards[firstIndex] = true;
      newMatchedCards[secondIndex] = true;
      setMatchedCards(newMatchedCards);

      Animated.sequence([
        Animated.timing(pulseAnim[firstIndex], {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim[firstIndex], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim[secondIndex], {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim[secondIndex], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      setSelectedCards([]);

      if (newMatchedCards.every(Boolean)) {
        setModalVisible(true);
      }
    } else {
      setTimeout(() => {
        const newFlippedCards = [...flippedCards];
        newFlippedCards[firstIndex] = false;
        newFlippedCards[secondIndex] = false;
        setFlippedCards(newFlippedCards);
        setSelectedCards([]);
      }, 1000);
    }
  };

  const handleCardPress = (index: number) => {
    if (flippedCards[index] || matchedCards[index] || selectedCards.length === 2) {
      return;
    }

    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = true;
    setFlippedCards(newFlippedCards);

    if (selectedCards.length === 0) {
      setSelectedCards([index]);
    } else if (selectedCards.length === 1) {
      setSelectedCards([selectedCards[0], index]);
      checkMatch(selectedCards[0], index);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    router.push('/memoria');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Back url="/memoria" />
      <Logo />

      <Text style={styles.title}>JOGO DA MEMÓRIA</Text>
      <Text style={styles.subtitle}>
        Nível {difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil'}
      </Text>
      <Text style={styles.instructions}>
        Encontre as {getCardPairs()} combinações :) !!
      </Text>

      <View style={styles.cardsContainer}>
        {shuffledCards.map((cardIndex, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [{ scale: pulseAnim[index] }],
            }}
          >
            <MemoryCard
              size={difficulty}
              isFlipped={flippedCards[index]}
              cardImage={cardImages[cardIndex]} // Acesse a imagem usando o índice
              onPress={() => handleCardPress(index)}
            />
          </Animated.View>
        ))}
      </View>

      <ChildBaloon label="Será que você consegue achar ?" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>VOCÊ VENCEU !!!</Text>
            <Text style={styles.modalSubtitle}>PARABÉNS</Text>
            <Text style={styles.modalSubtitle}>VOCÊ É DEMAIS !!</Text>
            <Image style={styles.modalImage} source={require('@/assets/images/memoria/win.png')} />
            <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
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
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFA500',
    marginTop: 100,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginVertical: 10,
  },
  instructions: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: width * 0.9,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#333',
  },
  modalImage: {
    position: 'absolute',
    right: '5%',
    bottom: '20%',
    width: 70,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#FFA500',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Jogar;
