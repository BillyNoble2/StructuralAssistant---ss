import React, { useState, useEffect } from 'react';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Modal } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('user_details.db');

const createTable = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT);',
      [],
      () => {
        console.log('Table created successfully');
      },
      (_, error) => {
        console.error('Error creating table:', error);
      }
    );
  });
};

const clearTable = () => {
  db.transaction((transaction) => {
    transaction.executeSql(
      'DELETE FROM users;',
      [],
      () => {
        console.log('Table cleared successfully');
      },
      (_, error) => {
        console.error('Error clearing table:', error);
      }
    );
  });
};

const createAccount = (email, password, confirmPassword, setShowSuccessModal) => {
  if (!email || !password || password !== confirmPassword) {
    console.error('Invalid email or password');
    return;
  }

  db.transaction((transaction) => {
    transaction.executeSql(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (_, result) => {
        if (result.rows.length > 0) {
          console.error('Email already exists');
          return;
        }

        transaction.executeSql(
          'INSERT INTO users (email, password) VALUES (?, ?)',
          [email, password],
          (_, result) => {
            console.log('Account created successfully');
            // Additional logic after successful account creation
            setShowSuccessModal(true);
          },
          (_, error) => {
            console.error('Error creating account:', error);
          }
        );
      },
      (_, error) => {
        console.error('Error checking email:', error);
      }
    );
  });
};

function Signup() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    createTable();
  }, []);

  const handleCreateAccount = () => {
    createAccount(email, password, confirmPassword, setShowSuccessModal);
  };

  const handleClearTable = () => {
    clearTable();
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigation.replace('Login')
    
  };

  return (
    <View style={styles.outer}>
      <View style={styles.inner}>
        <Text style={styles.header}>Signup</Text>

        <TextInput
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="Enter email address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Enter password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm password"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleCreateAccount}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleClearTable}
        >
          <Text style={styles.buttonText}>Clear Table</Text>
        </TouchableOpacity>

        <Modal visible={showSuccessModal} animationType="slide" transparent>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Account created successfully</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCloseModal}>
              <Text style={styles.modalButtonText}>Return to Login</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    width: 240,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
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
});

export default Signup;
