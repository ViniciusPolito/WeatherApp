import { StatusBar } from 'expo-status-bar';
import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {

  const [cidade, setCidade] = useState("");
  const [temperatura, setTemperatura] = useState("0");
  const [clima, setClima] = useState("none");

  const requestDataWeather = async () => {
    try {

      const response = await fetch(`https://weather.contrateumdev.com.br/api/weather/city/?city=${cidade}`);
      const json = await response.json();
      setTemperatura(json.main.temp)
      setClima(json.weather[0].description)

      if (response.ok) {
        setTemperatura(json.main.temp)
        setClima(json.weather[0].description)
      } else {
        Alert.alert("Falha na requisição", "Error");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>

      <Text>Cidade: {cidade}</Text>
      <Text>Temperatura: {temperatura}ºC</Text>
      <Text>Clima: {clima}</Text>
      <StatusBar style="auto" />

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Digite a cidade..."
        style={styles.input}
        onChangeText={cidade => setCidade(cidade)}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={requestDataWeather}
      >
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#38A69D',
    borderRadius: 4,
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
});
