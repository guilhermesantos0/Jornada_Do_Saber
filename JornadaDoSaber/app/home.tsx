import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions } from 'react-native';
import { Link } from 'expo-router';

import Logo from '@/components/Logo';
import ChildBaloon from '@/components/ChildBaloon';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>

      <Logo />

      <Text style={styles.title}>JOGOS</Text>
      <ChildBaloon label='Confira os Jogos !!' />


      <View style={styles.buttonContainer}>
        <Link href="/memoria" asChild>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonImageContainer}>
              <Image style={styles.buttonImage} source={require('@/assets/images/home/memoria.png')} />
            </View>
            <Text style={styles.buttonText}>JOGO DA MEMÓRIA</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/jogoDaVelha" asChild>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonImageContainer}>
              <Image style={styles.buttonImage} source={require('@/assets/images/home/jogoDaVelhaIcons.png')} />
            </View>
            <Text style={styles.buttonText}>JOGO DA VELHA</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/resultados" asChild>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonImageContainer}>
              <Image style={styles.buttonImage} source={require('@/assets/images/home/resultados.png')} />
            </View>
            <Text style={styles.buttonText}>RESULTADOS</Text>
          </TouchableOpacity>
        </Link>

        <Image source={require('@/assets/images/home/child_2.png')} style={styles.leftChild} />
        <Image source={require('@/assets/images/home/asd_hand.png')} style={styles.rightHand} />

      </View>

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
    marginTop: 80,
  },
  subtitleContainer: {
    height: 150,
    width: '80%',
    marginTop: 10,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thoughtBalloon: {
    width: 200,
    height: 100,
    position: 'absolute',
    top: 0,
    right: 100,
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    position: 'absolute',
    top: 10,
    right: 115,
    width: '50%',
    fontWeight: 'bold'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
    marginTop: 15
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: '80%',
    height: '18.5%',
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
    fontSize: 23,
    fontWeight: 'bold',
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
  thinkingCharacter: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    right: 1,
    bottom: 0,
  },
  leftChild: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  rightHand: {
    position: 'absolute',
    bottom: -85,
    right: 0,
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
