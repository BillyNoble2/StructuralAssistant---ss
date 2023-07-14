import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PreviousCalc = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Previous Calculation</Text>
      <Text style={styles.result}>Result: 12345</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  result: {
    fontSize: 18,
  },
});

export default PreviousCalc;
