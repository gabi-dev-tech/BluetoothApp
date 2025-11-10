import React from 'react';
import { Alert } from 'react-native';

function ShowAlert(title, message) {
  Alert.alert(
    title,
    message,
    [
      { text: "OK", onPress: () => console.log("Botón OK presionado") }
    ]
  );
}

export default ShowAlert;
