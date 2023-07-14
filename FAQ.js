import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FAQ = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Frequently Asked Questions</Text>
      {/* Add your FAQ content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default FAQ;