import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import iconImage from '../assets/images/iconBluetooth.png';
import iconSetting from '../assets/images/iconSetting.png';
import iconEmpty from '../assets/images/iconEmpty.png';

function BluetoothListLayout(props) {
  const [changeColorIcon, setChangeColorIcon] = useState(false);
  
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={props.devices}
        renderItem={({ item }) => (
          <View style={styles.element}>
            <Image source={iconImage} style={styles.image}  />
            <Text style={styles.list} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
            <TouchableOpacity  onPress={() => {props.connectToDevice(item.id); setChangeColorIcon(!changeColorIcon)}} >
              <Image source={iconSetting} style={[styles.image, {tintColor: changeColorIcon ? 'red' : '#6ab7b7ff'}]} />
            </TouchableOpacity >
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
    height: '100%',
    backgroundColor: '#ebf1f3ff',
    paddingVertical: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
  },
  list: {
    fontSize: 20,
    color: '#6ab7b7ff',
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
    tintColor: '#6ab7b7ff'
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
    color: '#6ab7b7ff',
  },
  imageEmpty: {
    width: 250,
    height: 250,
    tintColor: '#6ab7b7ff',
  },
});

export default BluetoothListLayout;
