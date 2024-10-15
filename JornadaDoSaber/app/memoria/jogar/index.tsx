import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MemoryCard from '@/components/MemoryCard'; // Ajuste o caminho conforme necessário
import { RouteProp } from '@react-navigation/native'; // Dependendo de como está estruturada a navegação
import { useLocalSearchParams } from 'expo-router';

const { width } = Dimensions.get('window');

interface MemoryGameScreenProps {
  route: RouteProp<{ params: { difficulty: number } }, 'params'>;
}

const images = [
  require('@/assets/images/memoria/cards/1.jpg'),
  require('@/assets/images/memoria/cards/2.jpg'),
  // Adicione mais imagens conforme necessário
];

const MemoryGameScreen: React.FC<MemoryGameScreenProps> = ({ route }) => {
  const { difficulty } = useLocalSearchParams();

  // Baseado na dificuldade, você define quantos pares deseja.
  let numPairs: number;
  switch (difficulty) {
    case 1: // Fácil
      numPairs = 2;
      break;
    case 2: // Médio
      numPairs = 4;
      break;
    case 3: // Difícil
      numPairs = 6;
      break;
    default:
      numPairs = 2;
  }

  // Duplicando as imagens para criar pares
  const selectedImages = images.slice(0, numPairs);
  const cards = [...selectedImages, ...selectedImages].sort(() => Math.random() - 0.5);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Jogo da Memória - Nível {difficulty === 1 ? 'Fácil' : difficulty === 2 ? 'Médio' : 'Difícil'}
      </Text>
      <View style={styles.cardsContainer}>
        {cards.map((img, index) => (
          <MemoryCard key={index} image={img} onFlip={() => console.log('Card flipped')} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00',
    marginVertical: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default MemoryGameScreen;
