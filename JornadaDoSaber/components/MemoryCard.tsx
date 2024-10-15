import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface MemoryCardProps {
  image: any;
  onFlip: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ image, onFlip }) => {
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const [isFlipped, setIsFlipped] = useState(false);

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const flipToFront = () => {
    Animated.spring(flipAnimation, {
      toValue: 180,
      useNativeDriver: true,
    }).start();
    setIsFlipped(true);
  };

  const flipToBack = () => {
    Animated.spring(flipAnimation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    setIsFlipped(false);
  };

  const handlePress = () => {
    if (isFlipped) {
      flipToBack();
    } else {
      flipToFront();
    }
    onFlip();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Animated.View style={[styles.cardInner, { transform: [{ rotateY: frontInterpolate }] }]}>
        <View style={styles.frontFace}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      </Animated.View>
      <Animated.View style={[styles.cardInner, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
        <Image source={image} style={styles.cardImage} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.4,
    height: width * 0.4,
    margin: 10,
  },
  cardInner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  frontFace: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  questionMark: {
    fontSize: 40,
    color: '#fff',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default MemoryCard;
