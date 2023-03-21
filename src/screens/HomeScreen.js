import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.introView}>
        <Text>Home Screen</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Search", {})}
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
    backgroundColor: "#f0dba3",
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
export default HomeScreen;
