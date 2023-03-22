import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import React, { useState, useEffect } from "react";
import img1 from "../../assets/image/food0.png";
import img2 from "../../assets/image/food1.png";
import img3 from "../../assets/image/food2.png";
const IMAGES = {
  "food0.png": require("../../assets/image/food0.png"),
  "food1.png": require("../../assets/image/food1.png"),
  "food2.png": require("../../assets/image/food2.png"),
};

const Item = ({ item }) => {
  return <Image source={item ? item : ""} style={styles.imageCard} />;
};

const IntroScreen = ({ navigation, route }) => {
  const [cardArrState, setCardArrState] = useState([img1, img2, img3]);

  return (
    <>
      <View style={styles.introView}>
        <View style={styles.imageView}>
          <Carousel
            layout={"default"}
            //layoutCardOffset={18}
            data={cardArrState}
            renderItem={({ item }) => <Item item={item} />}
            sliderWidth={300}
            itemWidth={300}
            style={{ backgroundColor: "#fff" }}
          />
        </View>
        <View style={styles.indicatorContainer}>
          <View style={styles.currentIndicator}></View>
          <View style={styles.indicator}></View>
          <View style={styles.indicator}></View>
        </View>
        <Text style={styles.title}>Delicious Food!</Text>
        <Text style={styles.discription}>
          Create and post your recipe to everyone
        </Text>
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
    width: 300,
    height: 300,
    flexDirection: "column",
    //backgroundColor: "#ccf",
    // padding: 0,
    bottom: 30,
    //alignItems: "center",
  },
  imageCard: {
    width: 300,
    height: 300,
    zIndex: 5,
    //left: 10,
    //backgroundColor: "#000",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    top: 0,
  },
  discription: {
    fontStyle: "italic",
    top: 0,
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
    top: 40,
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
