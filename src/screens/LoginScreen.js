import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNbcrypt from "react-native-bcrypt";
import { api } from "../api/api";

const LoginScreen = ({ navigation, route }) => {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Handle login logic here
    if (mail === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }

    try {
      // Lấy thông tin tất cả người dùng từ server
      const users = await api.getAllUsers();

      // Tìm kiếm người dùng với email và password tương ứng
      const user = users.find(
        (user) => user.mail === mail /*&& user.password === password*/
      );

      if (user) {
        // try {
        //   await AsyncStorage.setItem('userToken', mail);
        // } catch (error) {
        //   console.error('Error when saving user session:', error);
        // }
        // navigation.navigate('Home');
        RNbcrypt.compare(password, user.password, async (error, isMatch) => {
          if (error) {
            console.error(error);
            return;
          }

          if (isMatch) {
            try {
              await AsyncStorage.setItem("userToken", mail);
            } catch (error) {
              console.error("Error when saving user session:", error);
            }

            console.log(user);
            navigation.navigate("Home", {
              myUserId: user._id,
            });
          } else {
            alert("Invalid email or password");
          }
        });
      } else {
        alert("Invalid email or password");
      }
    } catch (error) {
      //handle error
      alert("An error occurred. Please try again.");
      console.error(error);
    }
    //navigation.navigate('Profile');
  };

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={mail}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <Pressable style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register now</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2ba35",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 8,
    padding: 12,
    marginVertical: 12,
    width: "100%",
    backgroundColor: "#FFF",
  },
  button: {
    backgroundColor: "#f27e35",
    padding: 12,
    borderRadius: 8,
    marginTop: 32,
    width: "100%",
    alignItems: "center",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: {
    fontSize: 16,
    marginRight: 8,
  },
  registerButton: {
    backgroundColor: "#f2ba35",
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#f27e35",
  },
  registerButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
