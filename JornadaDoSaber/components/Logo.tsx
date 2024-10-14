import { Image, StyleSheet } from "react-native"

const Logo = () => {
    return(
        <Image
        source={require('@/assets/images/logo.png')} 
        style={styles.logo}
      />
    )
}

const styles = StyleSheet.create({
    logo: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
})

export default Logo