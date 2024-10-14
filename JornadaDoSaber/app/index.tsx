import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';

import TempBar from '@/components/TempBar';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>JOGOS</Text>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Confira os Jogos !!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/memoria">
          <TouchableOpacity style={[styles.button, { width: screenWidth * 0.8 }]}>
            <View style={styles.buttonImageContainer}>
              <Image style={styles.buttonImage} source={require('../assets/images/placeholder.jpg')} />
            </View>
            <Text style={styles.buttonText}>JOGO DA MEMÓRIA</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/tangram">
          <TouchableOpacity style={[styles.button, { width: screenWidth * 0.8 }]}>
            <View style={styles.buttonImageContainer}>
              <Image style={styles.buttonImage} source={require('../assets/images/placeholder.jpg')} />
            </View>
            <Text style={styles.buttonText}>TANGRAM</Text>
          </TouchableOpacity>
        </Link>
      </View>

      { /* essa barra vai ser utilizada apenas no desenvolvimento, não precisa ser estilizada */}
      <TempBar />

    </SafeAreaView>
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
    marginTop: 70,
  },
  subtitleContainer: {
    height: 130,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#666',
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
    maxHeight: screenWidth * 0.3,
    minHeight: screenWidth * 0.3,
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
  hamburgerMenu: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  hamburgerText: {
    fontSize: 30,
    color: '#000',
  },
});

export default HomeScreen;
