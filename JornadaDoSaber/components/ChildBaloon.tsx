import React from "react"
import { View, Image, Text, StyleSheet } from "react-native"

interface ChildBaloonProps {
    label: string
}

const ChildBaloon: React.FC<ChildBaloonProps> = ({ label }) => {
    return (
        <View style={styles.subtitleContainer}>
            <Image source={require('@/assets/images/home/thought_balloon.png')} style={styles.thoughtBalloon} />
            <Text style={styles.subtitle}>{label}</Text>
            <Image source={require('@/assets/images/home/child_1.png')} style={styles.thinkingCharacter} />
        </View>
    )
}

const styles = StyleSheet.create({
    subtitleContainer: {
        height: 150,
        width: '80%',
        marginTop: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    thoughtBalloon: {
        width: 250,
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
        right: 145,
        width: '50%',
        fontWeight: 'bold'
    },
    thinkingCharacter: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        position: 'absolute',
        right: 1,
        bottom: 0,
    },
})

export default ChildBaloon