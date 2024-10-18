import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated';

interface MemoryCardProps {
  onPress: () => void;
  cardImage: any;
  size: string;
  isFlipped: boolean; // adicionando o estado de flip global
}

const MemoryCard: React.FC<MemoryCardProps> = ({ onPress, cardImage, size, isFlipped }) => {

  const flipAnim = useSharedValue(isFlipped ? 1 : 0); // usa o estado isFlipped para definir o estado inicial

  const handlePress = () => {
    onPress(); // passa o evento para o pai para controle global
  };

  // Animação da frente do cartão (verso)
  const frontStyle = useAnimatedStyle(() => {
    const rotation = interpolate(flipAnim.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotateY: `${rotation}deg` }],
    };
  });

  // Animação da parte de trás do cartão (imagem revelada)
  const backStyle = useAnimatedStyle(() => {
    const rotation = interpolate(flipAnim.value, [0, 1], [180, 360]);
    return {
      transform: [{ rotateY: `${rotation}deg` }],
    };
  });

  // Atualiza a animação sempre que o estado de flip mudar
  React.useEffect(() => {
    flipAnim.value = withTiming(isFlipped ? 1 : 0, { duration: 300 });
  }, [isFlipped]);

  return (
    <TouchableOpacity onPress={handlePress} style={styles.cardContainer}>
      {/* Verso do card */}
      <Animated.View style={[styles.card, frontStyle, size === '1' ? styles.easy : size === '2' ? styles.mid : styles.hard]}>
        <Image 
          source={require('@/assets/images/memoria/cards/card_back.png')} 
          style={styles.cardBackImage} 
        />
      </Animated.View>

      {/* Frente do card (Imagem revelada) */}
      <Animated.View style={[styles.card, backStyle, size === '1' ? styles.easy : size === '2' ? styles.mid : styles.hard, { position: 'absolute' }]}>
        <Image 
          source={cardImage} 
          style={styles.cardImageRevealed} 
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
  },
  card: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backfaceVisibility: 'hidden',
    elevation: 5,
  },
  easy: {
    width: 150,
    height: 150,
  },
  mid: {
    width: 125,
    height: 125,
  },
  hard: {
    width: 100,
    height: 100,
  },
  cardBackImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  cardImageRevealed: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default MemoryCard;
