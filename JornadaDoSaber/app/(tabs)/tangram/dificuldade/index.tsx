import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './style'; // Importando os estilos do arquivo separado

const TangramScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            /* Cabeçalho com imagem */
            <View style={styles.header}>
                <Image source={require('./path/to/tangram-icon.png')} style={styles.tangramIcon} />
                <Image source={require('./path/to/logo.png')} style={styles.logo} />
            </View>

            {/* Título */}
            <Text style ={styles.title}>TANGRAM</Text>
            <Text style={styles.subtitle}>
                O jogo da memória apresenta três modos de dificuldade: Fácil, Médio e Difícil
            </Text>

            {/* Botões de dificuldade */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>NÍVEL FÁCIL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>NÍVEL MÉDIO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>NÍVEL DIFÍCIL</Text>
            </TouchableOpacity>

            {/* Regras */}
            <Text style={styles.rulesTitle}>Regras</Text>
            <Text style={styles.rulesText}>
                Tangram: monte figuras usando sete peças (tans) sem sobreposição; crie formas e figuras diversas.
            </Text>

            {/* Imagem exemplo Tangram */}
            <Image source={require('./path/to/tangram-example.png')} style={styles.tangramExample} />
        </View>
    );
};

export default TangramScreen;
