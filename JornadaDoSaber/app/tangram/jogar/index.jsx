import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, PanResponder, Alert, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 
import * as Font from 'expo-font';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const shapeImages = {
  largeTriangle: [
    require('@/assets/images/tangram/pecas/trianguloGrande/amarelo.png'),
    require('@/assets/images/tangram/pecas/trianguloGrande/azul.png'),
  ],
  smallTriangle: [
    require('@/assets/images/tangram/pecas/triangoloPequeno/Bordo.png'),
    require('@/assets/images/tangram/pecas/triangoloPequeno/Preto.png'),
  ],
  mediumTriangle: [
    require('@/assets/images/tangram/pecas/trianguloMedio/Rosa.png'),
  ],
  square: [
    require('@/assets/images/tangram/pecas/quadrado/Verde.png'),
  ],
  parallelogram: [
    require('@/assets/images/tangram/pecas/paralelograma/laranja.png'),
  ],
};

const tangramShapes = [
  { id: 'largeTriangle1', type: 'largeTriangle', width: 100, height: 100 },
  { id: 'largeTriangle2', type: 'largeTriangle', width: 100, height: 100 },
  { id: 'mediumTriangle', type: 'mediumTriangle', width: 80, height: 80 },
  { id: 'smallTriangle1', type: 'smallTriangle', width: 60, height: 60 },
  { id: 'smallTriangle2', type: 'smallTriangle', width: 60, height: 60 },
  { id: 'square', type: 'square', width: 70, height: 70 },
  { id: 'parallelogram', type: 'parallelogram', width: 90, height: 45 },
];

export default function TangramGame() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter(); 
  const panValues = useRef(tangramShapes.map(() => new Animated.ValueXY())).current;
  const [overBoard, setOverBoard] = useState(false); // Estado para controlar se a peça está sobre o tabuleiro

  const panResponders = useRef(
    tangramShapes.map((_, index) =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          const isOverBoard = checkIfOverBoard(gestureState); // Verifica se está sobre o tabuleiro
          setOverBoard(isOverBoard);

          Animated.event(
            [null, { dx: panValues[index].x, dy: panValues[index].y }],
            { useNativeDriver: false }
          )(e, gestureState);
        },
        onPanResponderRelease: (_, gestureState) => handleShapeDrop(gestureState, index),
      })
    )
  ).current;

  const loadFonts = async () => {
    await Font.loadAsync({
      'BalooThambi-Regular': require('@/assets/fonts/BalooThambi2-VariableFont_wght.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const checkIfOverBoard = (gestureState) => {
    const { moveX, moveY } = gestureState;

    return (
      moveX > screenWidth * 0.25 &&
      moveX < screenWidth * 0.75 &&
      moveY > screenHeight * 0.25 &&
      moveY < screenHeight * 0.75
    );
  };

  const handleShapeDrop = (gestureState, index) => {
    if (overBoard) {
      panValues[index].extractOffset(); // A peça fica na posição onde foi solta
    } else {
      panValues[index].setValue({ x: 0, y: 0 }); // Volta à posição inicial
    }

    setOverBoard(false); // Reseta o estado
  };

  const renderShape = (shape, index) => {
    const imageSource =
      shapeImages[shape.type][Math.floor(Math.random() * shapeImages[shape.type].length)];

    return (
      <Animated.View
        key={shape.id}
        style={[
          styles.shape,
          { width: shape.width, height: shape.height },
          { transform: [{ translateX: panValues[index].x }, { translateY: panValues[index].y }] },
        ]}
        {...panResponders[index].panHandlers}
      >
        <Image source={imageSource} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
      </Animated.View>
    );
  };

  const handleBackPress = () => {
    Alert.alert(
      'Atenção!',
      'Ao sair, o jogo não será salvo. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sim', onPress: () => router.push('/') },
      ]
    );
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Tangram Game</Text>
      </View>

      <View style={styles.board}>
        <View style={styles.targetSquare} />
        {tangramShapes.map((shape, index) => overBoard && renderShape(shape, index))}
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

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#e3d8d8' 
  },
  loadingContainer: { 
    flex: 1, justifyContent: 'center', 
    alignItems: 'center' 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    backgroundColor: '#FFA500' 
  },
  backButton: { 
    marginRight: 10, 
    padding: 15, 
    backgroundColor: '#FFA500', 
    borderRadius: 5 
  },
  backButtonText: { 
    fontSize: 30, 
    color: '#000', 
    fontFamily: 'BalooThambi-Regular' 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#000', 
    fontFamily: 'BalooThambi-Regular' 
  },
  board: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  targetSquare: { 
    width: screenWidth * 0.5, 
    height: screenWidth * 0.5, 
    backgroundColor: '#FFF', 
    borderWidth: 2, 
    borderColor: '#000' 
  },
  shape: { 
    position: 'absolute', 
    borderRadius: 10 
  },
  hud: { 
    height: screenHeight * 0.15, 
    backgroundColor: '#FFA500', 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingHorizontal: 5 
  },
  hudPieceContainer: { 
    width: 80, 
    height: 80, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
});
