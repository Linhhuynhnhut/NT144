import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

const SearchScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.introView}>
        <Text>Search Screen</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Profile", {})}
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
    backgroundColor: "#a8f0a5",
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
export default SearchScreen;
