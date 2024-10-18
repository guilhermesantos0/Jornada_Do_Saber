import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const tangramShapes = [
  { id: 'triangle1', color: '#FF6D00', width: 80, height: 80 },
  { id: 'triangle2', color: '#4A90E2', width: 80, height: 160 },
  { id: 'square', color: '#00FF00', width: 80, height: 80 },
  { id: 'parallelogram', color: '#FF00FF', width: 120, height: 60 },
];

function MobileTangram({ onGameWon }) {
  const [placedPieces, setPlacedPieces] = useState([]);
  const [occupiedSpaces, setOccupiedSpaces] = useState([]);

  const checkWinCondition = () => {
    if (placedPieces.length === tangramShapes.length) {
      onGameWon();
    }
  };

  useEffect(checkWinCondition, [placedPieces]);

  const renderShape = (shape, index) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_, gestureState) => {
        const { moveX, moveY } = gestureState;

        // Agora o quadrado branco inteiro é uma área válida
        const inTargetSquare =
          moveX > screenWidth * 0.1 &&
          moveX < screenWidth * 0.9 &&
          moveY > screenHeight * 0.2 &&
          moveY < screenHeight * 0.8;

        const isOverlapping = occupiedSpaces.some(
          (space) =>
            Math.abs(space.x - moveX) < shape.width && Math.abs(space.y - moveY) < shape.height
        );

        if (inTargetSquare && !isOverlapping) {
          setPlacedPieces((prev) => [...prev, shape.id]);
          setOccupiedSpaces((prev) => [...prev, { x: moveX, y: moveY, width: shape.width, height: shape.height }]);
        } else {
          pan.setValue({ x: 0, y: 0 });
        }
      },
    });

    return (
      <Animated.View
        key={shape.id}
        style={[
          styles.shape,
          {
            backgroundColor: shape.color,
            width: shape.width,
            height: shape.height,
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tangram Game</Text>
      </View>
      <View style={styles.board}>
        <View style={styles.targetSquare} />
      </View>
      <View style={styles.hud}>
        {tangramShapes.map((shape, index) => (
          <View key={shape.id} style={styles.hudPieceContainer}>
            {renderShape(shape, index)}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default function TangramGame() {
  const onGameWon = () => {
    Alert.alert('Parabéns!', 'Você completou o Tangram!');
  };

  return <MobileTangram onGameWon={onGameWon} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
  },
  header: {
    backgroundColor: '#FFA500', 
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  board: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  targetSquare: {
    width: screenWidth * 0.8, 
    height: screenWidth * 0.8,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#000',
  },
  shape: {
    position: 'absolute',
    borderRadius: 10,
  },
  hud: {
    backgroundColor: '#FFA500', 
    width: '100%', 
    height: screenHeight * 0.2, 
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  hudPieceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
