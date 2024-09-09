import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, Alert } from 'react-native';

const App = () => {
  const [entrada, setEntrada] = useState('');
  const [resultado, setResultado] = useState('');
  const [historial, setHistorial] = useState<string[]>([]);
  const { width, height } = useWindowDimensions();
  const esHorizontal = width > height;

  const evaluarEntrada = (entradaEvaluada: string) => {
    try {
      if (/\/0/.test(entradaEvaluada)) {
        return 'No se puede dividir por 0';
      }
      const evaluado = eval(entradaEvaluada);
      if (!isFinite(evaluado)) {
        return 'Resultado no finito';
      }
      return String(evaluado);
    } catch (error) {
      return 'Error';
    }
  };

  const manejarPresion = (valor: string) => {
    const nuevaEntrada = entrada + valor;
    setEntrada(nuevaEntrada);
    const entradaEvaluada = nuevaEntrada.replace(/÷/g, '/').replace(/×/g, '*');
    const resultadoParcial = evaluarEntrada(entradaEvaluada);
    if (resultadoParcial !== 'Error' && resultadoParcial !== 'No se puede dividir por 0' && resultadoParcial !== 'Resultado no finito') {
      setResultado(resultadoParcial);
    } else {
      setResultado('');
    }
  };

  const manejarCalculo = () => {
    const entradaEvaluada = entrada.replace(/÷/g, '/').replace(/×/g, '*');
    const resultadoCalculo = evaluarEntrada(entradaEvaluada);

    if (resultadoCalculo === 'Error' || resultadoCalculo === 'No se puede dividir por 0' || resultadoCalculo === 'Resultado no finito') {
      setResultado(resultadoCalculo);
    } else {
      setHistorial([...historial, `${entrada} = ${resultadoCalculo}`]);
      setEntrada(resultadoCalculo);
      setResultado('');
    }
  };

  const manejarLimpiar = () => {
    setEntrada('');
    setResultado('');
  };

  const manejarRaizCuadrada = () => {
    try {
      const valorRaiz = Math.sqrt(parseFloat(entrada));
      setHistorial([...historial, `√(${entrada}) = ${valorRaiz}`]);
      setResultado(String(valorRaiz));
    } catch (error) {
      setResultado('Error');
    }
  };

  const manejarPotencia = () => {
    try {
      const valorPotencia = Math.pow(parseFloat(entrada), 2);
      setHistorial([...historial, `(${entrada})² = ${valorPotencia}`]);
      setResultado(String(valorPotencia));
    } catch (error) {
      setResultado('Error');
    }
  };

  const mostrarHistorial = () => {
    Alert.alert('Historial', historial.join('\n'));
  };

  const renderizarBotones = (
    manejarPresion: (valor: string) => void,
    manejarCalculo: () => void,
    manejarLimpiar: () => void,
    manejarRaizCuadrada: () => void,
    manejarPotencia: () => void,
    mostrarHistorial: () => void
  ) => {
    const botones = [
      { titulo: 'C', onPress: manejarLimpiar, estilo: styles.botonOperacion },
      { titulo: 'H', onPress: mostrarHistorial, estilo: styles.botonOperacion },
      { titulo: '√', onPress: manejarRaizCuadrada, estilo: styles.botonOperacion },
      { titulo: 'x²', onPress: manejarPotencia, estilo: styles.botonOperacion },
      { titulo: '7', onPress: () => manejarPresion('7'), estilo: styles.botonNumero },
      { titulo: '8', onPress: () => manejarPresion('8'), estilo: styles.botonNumero },
      { titulo: '9', onPress: () => manejarPresion('9'), estilo: styles.botonNumero },
      { titulo: '÷', onPress: () => manejarPresion('÷'), estilo: styles.botonOperacion },
      { titulo: '4', onPress: () => manejarPresion('4'), estilo: styles.botonNumero },
      { titulo: '5', onPress: () => manejarPresion('5'), estilo: styles.botonNumero },
      { titulo: '6', onPress: () => manejarPresion('6'), estilo: styles.botonNumero },
      { titulo: '×', onPress: () => manejarPresion('×'), estilo: styles.botonOperacion },
      { titulo: '1', onPress: () => manejarPresion('1'), estilo: styles.botonNumero },
      { titulo: '2', onPress: () => manejarPresion('2'), estilo: styles.botonNumero },
      { titulo: '3', onPress: () => manejarPresion('3'), estilo: styles.botonNumero },
      { titulo: '-', onPress: () => manejarPresion('-'), estilo: styles.botonOperacion },
      { titulo: '0', onPress: () => manejarPresion('0'), estilo: styles.botonNumero },
      { titulo: '.', onPress: () => manejarPresion('.'), estilo: styles.botonNumero },
      { titulo: '=', onPress: manejarCalculo, estilo: styles.botonOperacion },
      { titulo: '+', onPress: () => manejarPresion('+'), estilo: styles.botonOperacion },
    ];

    const filasBotones = [];
    for (let i = 0; i < botones.length; i += 4) {
      filasBotones.push(
        <View key={i} style={styles.fila}>
          {botones.slice(i, i + 4).map((boton, index) => (
            <Boton key={index} titulo={boton.titulo} onPress={boton.onPress} estilo={boton.estilo} />
          ))}
        </View>
      );
    }

    return <>{filasBotones}</>;
  };

  return (
    <View style={styles.contenedor}>
      <View style={[styles.pantallaContainer, esHorizontal && styles.pantallaContainerHorizontal]}>
        <Text style={styles.pantalla}>{entrada || '0'}</Text>
        <Text style={styles.resultado}>{resultado}</Text>
      </View>

      <View style={esHorizontal ? styles.botonesContainerHorizontal : styles.botonesContainerVertical}>
        {renderizarBotones(manejarPresion, manejarCalculo, manejarLimpiar, manejarRaizCuadrada, manejarPotencia, mostrarHistorial)}
      </View>
    </View>
  );
};

const Boton = ({ titulo, onPress, estilo }: { titulo: string; onPress: () => void; estilo: any }) => (
  <TouchableOpacity style={[styles.boton, estilo]} onPress={onPress}>
    <Text style={[styles.textoBoton, estilo === styles.botonNumero && styles.textoBotonNumero]}>{titulo}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#333',
    padding: 16,
  },
  pantallaContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  pantallaContainerHorizontal: {
    height: 120,
  },
  pantalla: {
    fontSize: 40,
    textAlign: 'right',
    color: '#fff',
  },
  resultado: {
    fontSize: 32,
    textAlign: 'right',
    color: '#ccc',
  },
  botonesContainerVertical: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  botonesContainerHorizontal: {
    flex: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  boton: {
    flex: 1,
    margin: 5,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 30,
    minHeight: 35,
  },
  botonNumero: {
    backgroundColor: '#fff',
  },
  botonOperacion: {
    backgroundColor: '#fdb11a',
  },
  textoBoton: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
  textoBotonNumero: {
    color: '#333',
  },
});

export default App;
