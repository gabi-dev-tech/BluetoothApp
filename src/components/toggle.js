import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

function Toggle(props) {
  return (
    <View style={styles.constainer}>
      <Text style={styles.text}> {props.isScanning ? 'ON' : 'OFF'} </Text>
      <Switch
        style={styles.switch}
        value={props.isScanning}
        onValueChange={value => props.setIsScanning(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#eceff1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 40, 
    borderBottomLeftRadius: 20,
  },
  text: {
    fontSize: 20,
    flex: 1,
    fontFamily: 'Orbitron-Bold',
    color: '#6ab7b7ff',
  },
  switch: {
    width: 50,
  },
});

export default Toggle;
