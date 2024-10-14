import React from 'react';
import { Link } from 'expo-router';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  url: string;
};

const Back: React.FC<Props> = ({ url }) => {
  return (
    <Link href={url} style={styles.back}>
        <Text style={styles.backText}>{"<"}</Text>
    </Link>
  );
};

const styles = StyleSheet.create({
  back: {
    padding: 10,
    borderRadius: 5,
    top: 50,
    left: 50,
    zIndex: 10,
    position: 'absolute',
},
backText: {
    fontSize: 32,
    color: '#878787',
  },
});

export default Back;
