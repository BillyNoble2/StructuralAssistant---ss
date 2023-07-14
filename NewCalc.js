import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ImageComponent = ({ source }) => {
  const screenWidth = Dimensions.get('window').width;
  return (
    <Image source={source} style={[styles.image, { width: screenWidth * 0.8 }]} resizeMode="contain" />
  );
};

const NewCalc = () => {
  const navigation = useNavigation();

  const handleNewCalcButtonPress = () => {
    navigation.navigate('Scenario1');
  };

  return (
    <View>
      <Text style={styles.text}>Please select the desired scenario</Text>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={handleNewCalcButtonPress}>
          <Image style={styles.image} source={require('./images/scenario.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNewCalcButtonPress}>
          <Image style={styles.image} source={require('./images/scenario2.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNewCalcButtonPress}>
          <Image style={styles.image} source={require('./images/scenario3.png')} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    width: 350,
    height: 150,
  },
  text: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    fontSize: 18,
  },
});

export default NewCalc;
