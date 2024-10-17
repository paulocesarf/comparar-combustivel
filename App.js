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
    
    if (!isNaN(alcoolNum) && !isNaN(gasolinaNum) && gasolinaNum > 0) { // verificar valores valido e invalidos
      const relacao = alcoolNum / gasolinaNum;

      // define vantagem alcool ou gasolina 
      if (relacao < 0.7) {
        setResultado('Abasteça com Álcool');
        // preço ideal da gasolina
        const gasolinaIdeal = (alcoolNum / 0.7).toFixed(2);
        setMargem(`Para a gasolina ser mais vantajosa, deveria custar R$ ${gasolinaIdeal}`);
      } else {
        setResultado('Abasteça com Gasolina');
        // preço ideal do álcool
        const alcoolIdeal = (gasolinaNum * 0.7).toFixed(2);
        setMargem(`Para o álcool ser mais vantajoso, deveria custar R$ ${alcoolIdeal}`);
      }
    } else {
      setResultado('');
      setMargem('Por favor, insira valores válidos.');
    }
  };

// front app
  return (
    <View style={styles.container}>
      <Image source={require('./assets/gasolina.png')} style={styles.imagem} />
      <Text style={styles.tituloApp}>Comparação de Combustível</Text>
      <TextInput
        style={styles.precoGasAlc}
        placeholder="Preço do Álcool (R$)"
        keyboardType="numeric"
        value={precoAlcool}
        onChangeText={setPrecoAlcool}
      />
      <TextInput
        style={styles.precoGasAlc}
        placeholder="Preço da Gasolina (R$)"
        keyboardType="numeric"
        value={precoGasolina}
        onChangeText={setPrecoGasolina}
      />
      <Button title="Calcular" onPress={calcularCombustivel} /> 
      {resultado ? (
        <View style={styles.resultadoCalculo}>
          <Text style={styles.textoResultado}>{resultado}</Text>
          <Text style={styles.textoResultado}>{margem}</Text>
        </View>
      ) : null}
    </View>
  );
}


// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imagem: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 30,
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  precoGasAlc: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
  resultadoCalculo: {
    marginTop: 20,
    alignItems: 'center',
  },
  textoResultado: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});
