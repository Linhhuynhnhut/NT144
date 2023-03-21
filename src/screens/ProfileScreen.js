import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.introView}>
        <Text>Profile Screen</Text>
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
    backgroundColor: "##919083",
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
export default ProfileScreen;
