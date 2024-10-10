import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';

export default function App() {
  const [precoAlcool, setPrecoAlcool] = useState('');
  const [precoGasolina, setPrecoGasolina] = useState('');
  const [resultado, setResultado] = useState('');
  const [margem, setMargem] = useState('');

  const calcularCombustivel = () => {
    const alcoolNum = parseFloat(precoAlcool);
    const gasolinaNum = parseFloat(precoGasolina);
    
    if (!isNaN(alcoolNum) && !isNaN(gasolinaNum) && gasolinaNum > 0) {
      const relacao = alcoolNum / gasolinaNum;

      // Define se o álcool ou gasolina é mais vantajoso
      if (relacao < 0.7) {
        setResultado('Abasteça com Álcool');
        // Calcula o preço ideal da gasolina para equilibrar a vantagem
        const gasolinaIdeal = (alcoolNum / 0.7).toFixed(2);
        setMargem(`Para a gasolina ser mais vantajosa, deveria custar R$ ${gasolinaIdeal}`);
      } else {
        setResultado('Abasteça com Gasolina');
        // Calcula o preço ideal do álcool para equilibrar a vantagem
        const alcoolIdeal = (gasolinaNum * 0.7).toFixed(2);
        setMargem(`Para o álcool ser mais vantajoso, deveria custar R$ ${alcoolIdeal}`);
      }
    } else {
      setResultado('');
      setMargem('Por favor, insira valores válidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/gasolina.png')} style={styles.image} />
      <Text style={styles.title}>Comparação de Combustível</Text>
      <TextInput
        style={styles.input}
        placeholder="Preço do Álcool (R$)"
        keyboardType="numeric"
        value={precoAlcool}
        onChangeText={setPrecoAlcool}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço da Gasolina (R$)"
        keyboardType="numeric"
        value={precoGasolina}
        onChangeText={setPrecoGasolina}
      />
      <Button title="Calcular" onPress={calcularCombustivel} />
      {resultado ? (
        <View style={styles.result}>
          <Text style={styles.resultText}>{resultado}</Text>
          <Text style={styles.resultText}>{margem}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
