import React, { useState } from 'react';
import { View, StyleSheet, Text, Dimensions, SafeAreaView } from 'react-native';
import MemoryCard from '@/components/MemoryCard';
import { useLocalSearchParams } from 'expo-router';

import ChildBaloon from '@/components/ChildBaloon';
import Back from '@/components/Back';
import Logo from '@/components/Logo';

const { width } = Dimensions.get('window');

const Jogar = () => {
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

  const numberOfPairs = getCardPairs();
  const totalCards = numberOfPairs * 2;

  const cardImages = [
    require('@/assets/images/memoria/cards/1.jpg'),
    require('@/assets/images/memoria/cards/2.jpg'),
    require('@/assets/images/memoria/cards/3.jpg'),
    require('@/assets/images/memoria/cards/4.jpg'),
  ];

  const [flippedCards, setFlippedCards] = useState(Array(totalCards).fill(false));

  const handleCardPress = (index: number) => {
    setFlippedCards((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Back url="/memoria"/>
      <Logo />

      <Text style={styles.title}>JOGO DA MEMÓRIA</Text>
      <Text style={styles.subtitle}>Nível {difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil'}</Text>
      <Text style={styles.instructions}>Encontre as {numberOfPairs} combinações :) !!</Text>
      
      <View style={styles.cardsContainer}>
        {Array.from({ length: totalCards }).map((_, index) => (
          <MemoryCard
            key={index}
            size={difficulty}
            cardImage={cardImages[index % numberOfPairs]}
            isFlipped={flippedCards[index]}
            onPress={() => handleCardPress(index)}
          />
        ))}
      </View>

      <ChildBaloon label='Será que você consegue achar ?' />
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
});

export default Jogar;
