import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import Logo from '@/components/Logo';
import Back from '@/components/Back';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const JogoTangram = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Back url="/" />
      <Logo />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>JOGO DE TANGRAM</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>O jogo de Tangram oferece três modos de dificuldade: Fácil, Médio e Difícil</Text>
          <Image style={styles.subtitleImage} source={require('@/assets/images/tangram/tangram_pieces.png')} />
        </View>

        <View style={styles.buttonContainer}>
          <Link href={{ pathname: "/tangram/jogar", params: { difficulty: 1 }}} asChild>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonImageContainer}>
                <Image style={styles.buttonImage} source={require('@/assets/images/tangram/tangram_easy.png')} />
              </View>
              <Text style={styles.buttonText}>FÁCIL</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: "/tangram/jogar", params: { difficulty: 2 }}} asChild>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonImageContainer}>
                <Image style={styles.buttonImage} source={require('@/assets/images/tangram/tangram_mid.png')} />
              </View>
              <Text style={styles.buttonText}>MÉDIO</Text>
            </TouchableOpacity>
          </Link>

          <Link href={{ pathname: "/tangram/jogar", params: { difficulty: 3 }}} asChild>
            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonImageContainer}>
                <Image style={styles.buttonImage} source={require('@/assets/images/tangram/tangram_hard.png')} />
              </View>
              <Text style={styles.buttonText}>DIFÍCIL</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.rulesContainer}>
          <View style={styles.rulesTitleContainer}>
            <Image source={require("@/assets/images/rules.png")} />
            <Text style={styles.rulesTitle}>Regras</Text>
          </View>
          <Text style={styles.rulesText}>
            O Tangram é um quebra-cabeça geométrico que consiste em 7 peças. O objetivo é formar figuras específicas utilizando todas as peças sem sobreposição.
          </Text>
        </View>

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
    marginTop: 100,
  },
  subtitleContainer: {
    height: 100,
    marginTop: 10,
    paddingHorizontal: 20,
    position: 'relative'
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
    color: '#666',
    textAlign: 'left',
    fontWeight: 'bold'
  },
  subtitleImage: {
    position: 'absolute',
    right: 25,
    bottom: 20,
    height: 40,
    width: 40
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginTop: 0,
  },
  button: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    maxHeight: screenHeight * 0.15,
    minHeight: screenHeight * 0.15,
    maxWidth: screenWidth * 0.8,
    minWidth: screenWidth * 0.8,
  },
  buttonImageContainer: {
    minWidth: 50,
    flexBasis: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  buttonImage: {
    height: 40,
    width: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  rulesContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'flex-start'
  },
  rulesTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00'
  },
  rulesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  rulesTitleContainer: {
    flexDirection: 'row',
    marginLeft: 20
  }
});

export default JogoTangram;