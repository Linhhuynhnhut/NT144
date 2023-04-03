import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const RegisterScreen = ({ navigation, route }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');

  const handleRegister = () => {
    // Handle registration logic here
    navigation.navigate('Home');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <View style={styles.genderContainer}>
        <Text style={styles.genderLabel}>Gender:</Text>
        <View style={styles.genderRadioButtons}>
          <View style={styles.genderRadioButton}>
            <Pressable
              style={[
                styles.genderRadioCircle,
                gender === 'Male' && styles.genderRadioSelected,
              ]}
              onPress={() => setGender('Male')}
            />
            <Text style={styles.genderRadioLabel}>Male</Text>
          </View>
          <View style={styles.genderRadioButton}>
            <Pressable
              style={[
                styles.genderRadioCircle,
                gender === 'Female' && styles.genderRadioSelected,
              ]}
              onPress={() => setGender('Female')}
            />
            <Text style={styles.genderRadioLabel}>Female</Text>
          </View>
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2ba35',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: '80%',
    fontSize: 16,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '80%',
    marginTop: 10,
    borderColor:'#777',
    borderWidth:1,
    borderRadius: 8,
    padding: 5,
  },
  
  genderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 16,
  },
  genderRadioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '70%',
  },
  genderRadioButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  genderRadioCircle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  genderRadioSelected: {
    backgroundColor: '#777',
  },
  genderRadioLabel: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f27e35',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: '80%',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: '#f2ba35',
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#f27e35',
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
    
export default RegisterScreen;