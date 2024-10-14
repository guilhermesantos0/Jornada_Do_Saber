import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import TempBar from '@/components/TempBar';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const JogoDaMemoria = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Usando ScrollView para permitir rolagem */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>JOGO DA MEMÓRIA</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>O jogo da memória apresenta três modos de dificuldade: Fácil, Médio e Difícil</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Link href={{ pathname: "/memoria/jogar", params: { difficulty: 1 }}}>
            <TouchableOpacity style={[styles.button, { width: screenWidth * 0.8 }]}>
              <View style={styles.buttonImageContainer}>
                <Image style={styles.buttonImage} source={require('@/assets/images/memoria_easy.png')} />
              </View>
              <Text style={styles.buttonText}>FÁCIL</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: "/memoria/jogar", params: { difficulty: 2 }}}>
            <TouchableOpacity style={[styles.button, { width: screenWidth * 0.8 }]}>
              <View style={styles.buttonImageContainer}>
                <Image style={styles.buttonImage} source={require('@/assets/images/memoria_mid.png')} />
              </View>
              <Text style={styles.buttonText}>MÉDIO</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: "/memoria/jogar", params: { difficulty: 3 }}}>
            <TouchableOpacity style={[styles.button, { width: screenWidth * 0.8 }]}>
              <View style={styles.buttonImageContainer}>
                <Image style={styles.buttonImage} source={require('@/assets/images/memoria_hard.png')} />
              </View>
              <Text style={styles.buttonText}>DIFÍCIL</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Seção de Regras */}
        <View style={styles.rulesContainer}>
          <Text style={styles.rulesTitle}>📜 Regras</Text>
          <Text style={styles.rulesText}>
            Jogo da Memória: vire duas cartas por vez para encontrar pares iguais.
          </Text>
        </View>

        {/* Barra temporária usada apenas para desenvolvimento */}
        <TempBar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00',
    marginTop: 70,
  },
  subtitleContainer: {
    height: 100,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    margin: 10,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    maxHeight: screenHeight * 0.15,
    minHeight: screenHeight * 0.15,
    maxWidth: screenWidth * 0.8, 
    minWidth: screenWidth * 0.8
  },
  buttonImageContainer: {
    minWidth: 50,
    flexBasis: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonImage: {
    height: 40,
    width: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  rulesContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  rulesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6D00',
  },
  rulesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default JogoDaMemoria;
