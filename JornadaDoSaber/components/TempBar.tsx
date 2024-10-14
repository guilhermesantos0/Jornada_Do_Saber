import { View, StyleSheet, Text } from "react-native"
import { Link } from "expo-router"

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TempBar() {
    return(
        <View style={styles.bottomBar}>
        <Link href="/" style={styles.navButton}>
            <Ionicons name="home" size={28} style={{ marginBottom: -3 }} />
        </Link>
        <Link href="/memoria" style={styles.navButton}>
            <Ionicons name="extension-puzzle" size={24} color="black" />
        </Link>
        <Link href="/tangram" style={styles.navButton}>
            <Text>TG</Text>
        </Link>
        
      </View>
    )
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#f0f0f0',
    },
      navButton: {
        flex: 1,
        alignItems: 'center',
        textAlign: 'center',
        paddingVertical: 10,
    },
})