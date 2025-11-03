import React from 'react';
import { View, StyleSheet } from 'react-native';

function Separador() {
  return <View style={styles.separador} />;
}

const styles = StyleSheet.create({
  separador: {
    width: '80%',
    height: 3,
    marginLeft: 60,
    marginRight: 60,
    marginVertical: 10,
    backgroundColor: '#d5d8daff',
  },
});

export default Separador;
