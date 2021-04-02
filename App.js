import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider'
import Clipboard from 'expo-clipboard'
import { Entypo } from '@expo/vector-icons';

export default function App() {

  const [size, setSize] = useState(10)
  const [password, setPassword] = useState('')

  let pass = ''
  const charset = 'abcdefjhklmnopqrstuvxywzABCDEFGHIJKLMNOPQRSTUVXYWZ0123456789'

  const generatePass = () => {
    for(let i = 0, n = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    setPassword(pass)
  }
  const copyPass = () => {
    Clipboard.setString(password)
    alert('Senha Copiada')
  }

  return (
    <View style={styles.container}>
      <Entypo name="lock" size={80} color="#6930c3" />
      <Text style={styles.caracteres}>{size} Caracteres</Text>
      <View style={styles.slider}>
        <Slider maximumTrackTintColor='#6930c3' minimumValue={5} maximumValue={15} minimumTrackTintColor='limegreen' value={size} onValueChange={(currentValue => setSize(currentValue.toFixed(0)))}/>
      </View>
      <TouchableOpacity style={styles.btn} onPress={generatePass}>Gerar Senha</TouchableOpacity>

      {password != '' && (<>
          <View style={styles.passArea} onLongPress={copyPass}>
            <Text style={styles.passText} onLongPress={copyPass}>{password}</Text>
          </View>
          <Text style={styles.dica}>Mantenha pressionado para copiar</Text>
        </>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caracteres: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 20
  },
  slider: {
    backgroundColor: '#fff',
    width: 300,
    borderRadius: 10,
    padding: 5,
    marginBottom: 20
  },
  passArea: {
    backgroundColor: '#fff',
    width: 250,
    height: 40,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  passText: {
    fontSize: 20,
  },
  btn: {
    backgroundColor: 'limegreen',
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    marginBottom: 20,
    color: '#fff'
  },
  dica: {
    fontSize: 12,
    color: '#fff'
  }
});
