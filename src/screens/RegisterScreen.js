import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNbcrypt from "react-native-bcrypt";
import Spinner from "react-native-loading-spinner-overlay";
//import { setRandomFallback } from 'react-native-get-random-values';

import { api } from "../api/api";

const RegisterScreen = ({ navigation, route }) => {
  const [nameUser, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // setRandomFallback((callback) => {
  //   const randomBytes = require('react-native-get-random-values').getRandomBytes(16);
  //   callback(randomBytes);
  // });

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // check fields
    if (
      nameUser === "" ||
      mail === "" ||
      password === "" ||
      confirmPassword === "" ||
      phoneNumber === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      //Sử dụng bcrypt để mã hóa mật khẩu
      RNbcrypt.hash(password, 10, async (error, hashedPassword) => {
        if (error) {
          // Xử lý lỗi khi mã hóa mật khẩu
          console.error(error);
          setLoading(false);
          return;
        }

        const payload = {
          nameUser,
          mail,
          password: hashedPassword,
          phoneNumber,
        };
        try {
          // Gửi yêu cầu đăng ký người dùng
          await api.addUser(payload);

          // Xử lý đăng ký thành công
          const users = await api.getAllUsers();
          const user = users.find((user) => user.mail === mail);

          if (user) {
            try {
              await AsyncStorage.setItem("userToken", mail);
            } catch (error) {
              console.error("Error when saving user session:", error);
              setLoading(false);
            }
            console.log({ user });
            setLoading(false);
            navigation.navigate("Home", {
              myUserId: user._id,
            });
          }
        } catch (error) {
          alert("Email already exists! Please try again.");
          //console.error(error);
          setLoading(false);
        }
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Please wait..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />
      <Image
        source={require("../../assets/image/food1.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={nameUser}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={mail}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2ba35",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
    width: "80%",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f27e35",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    width: "80%",
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
    fontWeight: "bold",
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    fontSize: 16,
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: "#f2ba35",
    padding: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#f27e35",
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default RegisterScreen;
