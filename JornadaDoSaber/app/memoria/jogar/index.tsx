import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Dimensions, SafeAreaView, Animated, Modal, TouchableOpacity, Image } from 'react-native';
import MemoryCard from '@/components/MemoryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jogoDaVelhaResults from '@/resultados/memoria';
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
  
  // Estado para armazenar o tempo inicial e calcular a duração
  const [startTime, setStartTime] = useState(0);
  const [shuffledCards, setShuffledCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [matchedCards, setMatchedCards] = useState<boolean[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const pulseAnim = useRef<Animated.Value[]>([]).current;

  useEffect(() => {
    setStartTime(Date.now()); // Inicia o cronômetro
    const numberOfPairs = getCardPairs();
    const totalCards = numberOfPairs * 2;

    if (pulseAnim.length === 0) {
      for (let i = 0; i < totalCards; i++) {
        pulseAnim[i] = new Animated.Value(1);
      }
    }

    resetGame(numberOfPairs, totalCards);
  }, [difficulty]);

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
        saveResult(); 
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

  const saveResult = async () => {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000); // Tempo em segundos
    
    const resultData = {
      result: 'Venceu',
      level: difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil',
      time: timeTaken,
    };

    try {
      const storedResults = await AsyncStorage.getItem('memoriaResults');
      const results = storedResults ? JSON.parse(storedResults) : [];
      results.push(resultData);
      await AsyncStorage.setItem('memoriaResults', JSON.stringify(results));
    } catch (error) {
      console.error("Erro ao salvar o resultado:", error);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    router.push('/memoria');
  };

  // BANCO DE DADOS
  const DBsaveResult = async () => {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000); // Tempo em segundos
  
    const resultData = {
      result: 'Venceu',
      level: difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil',
      time: timeTaken,
    };
  
    try {
      const response = await fetch('http://localhost:3001/jogo-da-memoria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData),
      });
  
      if (!response.ok) {
        throw new Error('Erro ao salvar resultado no servidor');
      }
      console.log('Resultado salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o resultado:', error);
    }
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
              cardImage={cardImages[cardIndex]}
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
    marginBottom: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Jogar;
