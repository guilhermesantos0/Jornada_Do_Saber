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
      <Back 
        url="/" 
      />
      <Logo />

      <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.imageContainer}>
          <Image style={styles.subtitleImage} 
              source={require('@/assets/images/tangram/tangram_pieces.png')}
          />
        </View>
        
        <Text style={styles.title}>TANGRAM</Text>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
          O jogo do TANGRAM 
          </Text>
        </View>
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <Link href={{ pathname: "/tangram/jogar", }} asChild>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonImageContainer}>
              <Image
                style={styles.buttonImage}
                source={require('@/assets/images/tangram/tangram_easy.png')}
              />
            </View>
            <Text style={styles.buttonText}>Jogar</Text>
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
  imageContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    marginTop: 150,
    paddingHorizontal: 95,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00',
    marginTop: 190,
  },
  subtitleContainer: {
    height: 100,
    marginTop: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  subtitle: {
    fontSize: 16,
    margin: 10,
    color: '#666',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  subtitleImage: {
    position: 'absolute',
    right: 25,
    bottom: 20,
    height: 150,
    width: 150,
  },
  buttonWrapper: {
    position: 'absolute',
    top: '50%', 
    left: '50%', 
    transform: [{ translateX: -screenWidth * 0.4 }, { translateY: -screenHeight * 0.075 }],
  },
  button: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: "center",
    alignContent: "space-around",
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
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 20, 
    left: 0,
    right: 0,
  },
  rulesTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00',
  },
  rulesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  rulesTitleContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
});

export default JogoTangram;