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
    marginVertical: 20,
    backgroundColor: '#00FEFF',
  },
});

export default Separador;
