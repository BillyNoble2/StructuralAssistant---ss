import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainMenu from './MainMenu';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navigation from './Navigation';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>StructuralAssistant</Text>
      </View>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return <Navigation />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'darkblue',
  },
});

export default App;
