import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Carousel from "react-native-snap-carousel";

const IntroScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.introView}>
        <View style={styles.imageView}>
          <Image
            source={require("../../assets/image/food0.png")}
            style={styles.image}
          />
          <Text style={styles.title}>Delicious Food!</Text>
          <Text style={styles.discription}>
            Create and post your recipe to everyone
          </Text>
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator}></View>
          <View style={styles.indicator}></View>
          <View style={styles.indicator}></View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Login", {})}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>START</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  introView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2ba35",
    width: "100%",
    height: "100%",
  },
  imageView: {
    //backgroundColor: "#ccf",
    bottom: 100,
    alignItems: "center",
  },
  image: {
    width: 280,
    height: 300,
    left: 10,
    //backgroundColor: "#000",
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    top: 60,
  },
  discription: {
    top: 5,
    fontStyle: "italic",
    top: 60,
  },
  indicatorContainer: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  currentIndicator: {
    height: 12,
    width: 30,
    borderRadius: 10,
    backgroundColor: "#f27e35",
    marginHorizontal: 5,
  },
  indicator: {
    height: 12,
    width: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  button: {
    top: 20,
    backgroundColor: "#f27e35",
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
export default IntroScreen;
