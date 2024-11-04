import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={require('../assets/images/tutorial/1.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.bottomSection}>
        <View style={styles.pageIndicator}>
          <View style={[styles.indicatorBar, styles.activeIndicator]} />
          <View style={styles.indicatorBar} />
          <View style={styles.indicatorBar} />
          <View style={styles.indicatorBar} />
        </View>

        <Text style={styles.title}>Jornada do Saber</Text>
        <Text style={styles.description}>
        "Jornada do Saber" é um jogo interativo projetado especialmente para autistas, combinando os clássicos Jogo da Velha e Jogo da Memória. Explore o universo do Semeador enquanto desenvolve habilidades de raciocínio e memória em um ambiente acolhedor e divertido!  
        </Text>

        <Link href={'tutorial/2'} asChild>
          <TouchableOpacity style={styles.skipButton}>
            <FontAwesome name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>

        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7FB3FF',
  },
  topSection: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 320,
    height: 320,
  },
  bottomSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    padding: 20,
  },
  pageIndicator: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  indicatorBar: {
    width: width * 0.15,
    height: 5,
    backgroundColor: '#D3D3D3',
    marginHorizontal: 5,
    borderRadius: 2,
  },
  activeIndicator: {
    backgroundColor: '#FF6D00',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  skipButton: {
    width: 50,
    height: 50,
    backgroundColor: '#FF6D00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
  },
});

export default App;
