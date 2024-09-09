# Calculadora en React Native

## Descripción

Esta aplicación es una calculadora simple construida con React Native. Permite realizar operaciones básicas como suma, resta, multiplicación y división, además de funciones adicionales como raíz cuadrada y potencia al cuadrado. También incluye un historial de cálculos.

## Funcionalidades

- **Operaciones Básicas**: Suma (+), Resta (-), Multiplicación (×), y División (÷).
- **Funciones Adicionales**:
  - **Raíz Cuadrada** (√)
  - **Potencia al Cuadrado** (x²)
- **Historial de Cálculos**: Visualiza los cálculos anteriores.
- **Limpieza de Entrada**: Borra la entrada actual.

## Cómo Usar

### Pantalla

- **Entrada**: Muestra la operación que estás construyendo.
- **Resultado**: Muestra el resultado de la operación actual o el error si hay uno.

### Botones

- **Número**: Presiona los números (0-9) para construir operaciones.
- **Operaciones**: 
  - **Suma**: +
  - **Resta**: -
  - **Multiplicación**: ×
  - **División**: ÷
- **Funciones Adicionales**:
  - **Raíz Cuadrada** (√): Calcula la raíz cuadrada del número en la entrada.
  - **Potencia al Cuadrado** (x²): Calcula el cuadrado del número en la entrada.
- **C**: Borra la entrada actual.
- **H**: Muestra el historial de cálculos.
- **=**: Calcula el resultado de la operación actual.

### Comportamiento

- **Operaciones y Funciones**: Presiona los botones correspondientes para añadir operadores o funciones a la entrada. La entrada se evalúa en tiempo real y el resultado parcial se muestra en la pantalla.
- **Evaluación de Entrada**: Se maneja automáticamente la evaluación de la entrada cuando presionas el botón "=". Los errores como la división por cero y resultados no finitos se mostrarán en la pantalla.
- **Historial**: Accede al historial de cálculos presionando el botón "H". Verás una lista de operaciones y sus resultados.

### Errores Comunes

- **División por Cero**: No se puede dividir por cero. Se mostrará el mensaje "No se puede dividir por 0".
- **Resultado no Finito**: Se mostrará si el resultado de la operación no es un número finito.
- **Errores en la evaluación**: Cualquier error en la operacion de entrada se mostrará como "Error".

## Instalación y Ejecución

Para ejecutar esta aplicación en tu entorno de desarrollo:

1. **Clona el Repositorio**:
   ```bash
   git clone 

2. **Instala las Dependencias:**:
    npm install

3. **Ejecutar la aplicacion**
    npm expo start
