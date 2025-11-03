import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Alert,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import BluetoothListLayout from './src/components/bluetooth-list-layout';
import Toggle from './src/components/toggle';
import Separador from './src/components/separador';

function App() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const managerRef = useRef(new BleManager());
  const isDarkMode = useColorScheme() === 'dark';

  // 🧩 2️⃣ Función para iniciar escaneo BLE
  const startScan = async () => {
    const manager = managerRef.current;

    if (!permissionsGranted) {
      Alert.alert(
        'Permisos faltantes',
        'No se pueden iniciar escaneos sin permisos.',
      );
      return;
    }

    console.log('🚀 Iniciando escaneo BLE...');

    const subscription = manager.onStateChange(state => {
      if (state === 'PoweredOn') {
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('ErrorDevice:', error);
            return;
          }

          if (device && device.name) {
            setDevices((prev: Device[]) => {
              if (!prev.find(d => d.id === device.id)) {
                return [...prev, device];
              }
              return prev;
            });
          }
        });
        subscription.remove();
      }
    }, true);
  };

  // 🧩 3️⃣ Función para detener escaneo
  const stopScan = () => {
    const manager = managerRef.current;
    console.log('🛑 Deteniendo escaneo BLE...');
    manager.stopDeviceScan();
    setDevices([]);
  };

  // 🧩 1️⃣ Pedimos permisos SOLO al inicio
  useEffect(() => {
    const requestPermissions = async () => {
      try {
        if (Platform.OS === 'android') {
          if (Platform.Version >= 31) {
            const granted = await PermissionsAndroid.requestMultiple([
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
              PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);

            const allGranted = Object.values(granted).every(
              result => result === PermissionsAndroid.RESULTS.GRANTED,
            );
            if (!allGranted) {
              Alert.alert(
                'Permisos requeridos',
                'Se necesitan permisos Bluetooth.',
              );
              return;
            }
          } else {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
              Alert.alert(
                'Permisos requeridos',
                'Se necesita permiso de ubicación.',
              );
              return;
            }
          }
        }
        setPermissionsGranted(true);
      } catch (err) {
        console.error('Error al pedir permisos:', err);
      }
    };

    requestPermissions();
  }, []);

  // 🧩 4️⃣ Observa los cambios del Toggle
  useEffect(() => {
    if (isScanning) startScan();
    else stopScan();
  }, [isScanning, permissionsGranted]);

  // 🧩 5️⃣ Limpieza total al desmontar la app
  useEffect(() => {
    const manager = managerRef.current;
    return () => {
      console.log('🧹 Limpiando BLE Manager...');
      manager.stopDeviceScan();
      manager.destroy();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bluetooth App</Text>

      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Toggle isScanning={isScanning} setIsScanning={setIsScanning} />

      <Separador />

      <BluetoothListLayout devices={devices} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ebf1f3ff',
    fontFamily: 'Orbitron-Regular',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default App;
