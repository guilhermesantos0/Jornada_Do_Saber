import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

interface MemoryCardProps {
  onPress: () => void;
  size: string;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ onPress, size }) => {

  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, size == '1' ? styles.easy : size == '2' ? styles.mid : styles.hard]}>
      <Image 
        source={require('@/assets/images/memoria/cards/card_back.png')}
        style={styles.cardImage} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    elevation: 5,
  },
  easy: {
    width: 150,
    height: 150,
  },
  mid: {
    width: 125,
    height: 125
  },
  hard: {
    width: 100,
    height: 100
  },
  cardImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default MemoryCard;
