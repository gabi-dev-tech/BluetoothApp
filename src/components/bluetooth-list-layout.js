import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import iconImage from '../assets/images/iconBluetooth.png';
import iconSetting from '../assets/images/iconSetting.png';
import iconEmpty from '../assets/images/iconEmpty.png';

function BluetoothListLayout(props) { 
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.devices}
        renderItem={({ item }) => (
          <View style={styles.element}>
            <Image source={iconImage} style={styles.image} />
            <Text style={styles.list} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <Image source={iconSetting} style={styles.image} />
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={styles.noElementContainer}>
            <Text style={styles.noElementText}>No hay elementos.</Text>
            <Image source={iconEmpty} style={styles.imageEmpty} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    height: 600,
    backgroundColor: '#ebf1f3ff',
    paddingVertical: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
  },
  list: {
    fontSize: 20,
    color: '#4a4a4aff',
    maxWidth: '60%',
    fontFamily: 'Orbitron-Regular',
  },
  element: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    gap: 30,
    marginTop: 20,
  },
  image: {
    width: 30,
    height: 30,
  },
  noElementContainer: {
    height: 600,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  noElementText: {
    fontSize: 20,
    fontFamily: 'Orbitron-Regular',
  },
  imageEmpty: {
    width: 250,
    height: 250,
    tintColor: '#9e9e9eff',
  },
});

export default BluetoothListLayout;
