import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

const LoginScreen = ({ navigation, route }) => {
  return (
    <>
      <View style={styles.introView}>
        <Text>Login/Register Screen</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Home", {})}
        >
          <Text>Button</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  introView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#bbaaff",
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default LoginScreen;