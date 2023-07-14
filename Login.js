import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import * as SQLite from 'expo-sqlite';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    db = SQLite.openDatabase('user_details.db');
    db.transaction((transaction) => {
      transaction.executeSql(
        'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, fName TEXT, lName TEXT, email TEXT, password TEXT);',
        [],
        (_, result) => {
          console.log('Table created successfully');
        },
        (_, error) => {
          console.error('Error creating table:', error);
        }
      );
    });
  }, []);

    const handleLogin = () => {
    db.transaction((transaction) => {
      transaction.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [username, password],
        (_, result) => {
          if (result.rows.length > 0) {
            // Login successful
            navigation.replace('MainMenu');
            console.log('Login successful');
          } else {
            // Login failed, display an error message
            setShowErrorModal(true);
          }
        },
        (_, error) => {
          console.error('Error checking credentials:', error);
        }
      );
    });
  };

  const handleCloseModal = () => {
    setShowErrorModal(false);
  };

  const handleTextPress = () => {
    setShowErrorModal(false);
  };

  const handleRegistration = () => {
    navigation.navigate('Registration')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>StructuralAssistant</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleTextPress}>
        <Text style={styles.forgottenPassword}>Forgot your password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register for account</Text>
      </TouchableOpacity>

      <Modal visible={showErrorModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Incorrect username or password</Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
            <Text style={styles.modalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop:200
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,

  },
  button: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  modalButton: {
    backgroundColor: 'darkblue',
    borderRadius: 10,
    padding: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headingText: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingBottom:150,
    color: 'darkblue'
  },
  forgottenPassword:{
    fontSize:18,
    textDecorationLine: 'underline',
    paddingTop:15,
    paddingBottom:170,
    color: 'gray'
  }
});

export default Login;

