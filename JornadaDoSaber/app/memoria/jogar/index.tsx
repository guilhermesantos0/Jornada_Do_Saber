import React from 'react';
import { View, StyleSheet, Text, Dimensions, Image, SafeAreaView } from 'react-native';
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

  return (
    <SafeAreaView style={styles.container}>
      <Back url="/memoria"/>
      <Logo />

      <Text style={styles.title}>JOGO DA MEMÓRIA</Text>
      <Text style={styles.subtitle}>Nível {difficulty === '1' ? 'Fácil' : difficulty === '2' ? 'Médio' : 'Difícil'}</Text>
      <Text style={styles.instructions}>encontre as {numberOfPairs} combinações :) !!</Text>
      
      <View style={styles.cardsContainer}>
        {Array.from({ length: totalCards }).map((_, index) => (
          <MemoryCard
            key={index}
            size={difficulty}
            onPress={() => console.log(`Card ${index} pressed`)}
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
  childImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  bubbleContainer: {
    position: 'absolute',
    bottom: 130, // Ajuste a posição do balão de fala
    right: 50, // Ajuste a posição do balão de fala
    alignItems: 'flex-start',
  },
  bubbleImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    position: 'absolute',
    zIndex: 1,
  },
  bubbleText: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 2, // Sombra para o texto do balão
    zIndex: 2,
    color: '#333',
    fontSize: 14,
    maxWidth: 150,
  },
});

export default Jogar;
