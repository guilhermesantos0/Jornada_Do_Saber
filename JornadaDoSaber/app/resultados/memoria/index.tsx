import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '@/components/Logo';
import Back from '@/components/Back';

const { width: screenWidth } = Dimensions.get('window');

export default function ResultadoJogoDaMemoria() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const storedResults = await AsyncStorage.getItem('memoriaResults');
        const parsedResults = storedResults ? JSON.parse(storedResults) : [];
        setResults(parsedResults);
      } catch (error) {
        console.error("Erro ao carregar os resultados:", error);
      }
    };

    loadResults();
  }, []);

  return (
    <View style={styles.container}>
      <Back url="/resultados" />
      <Logo />
      <Text style={styles.title}>JOGO DA MEMÓRIA</Text>
      <Text style={styles.subtitle}>Confira os Resultados no Jogo da Memória :)</Text>
      
      {results.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <Image
            source={require('@/assets/images/resultados/nada.png')}
            style={styles.noResultsImage}
          />
          <Text style={styles.noResultsText}>Primeiro jogue para mostrarmos seu resultado</Text>
        </View>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                Resultado:
                <Text style={[styles.resultStatus, { color: item.result === 'Venceu' ? '#4CAF50' : '#FF0000' }]}> {item.result}</Text>
              </Text>
              <Text style={styles.levelText}>
                Nível: <Text style={styles.level}>{item.level}</Text>
              </Text>
              <Text style={styles.timeText}>
                Tempo: <Text style={styles.time}>{item.time} segundos</Text>
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6D00',
    marginTop: 80,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  noResultsContainer: {
    alignItems: 'center',
    marginTop: 150,
  },
  noResultsImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  noResultsText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#BBDEFB',
    borderRadius: 10,
    padding: 15,
    width: screenWidth * 0.9,
    marginVertical: 8,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  resultStatus: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  levelText: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  level: {
    color: '#FF6D00',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  time: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
