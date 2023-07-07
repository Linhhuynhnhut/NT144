import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, FONTS, SIZES } from "../constants";
import { api } from "../api/api"; // import api
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CategoryCard = ({ data, containerStyle, onPress }) => {
  const [user, setUser] = useState(null);
  // const [trendFood, setTrendFood] = useState(
  //   "https://res.cloudinary.com/dbqvo0078/image/upload/v1688475091/Image_not_available_f5mwsi.png"
  // );
  useEffect(() => {
    // setTrendFood(data?.image[0]);
    const getData = async () => {
      const user = await api.getUser(data.user);
      console.log(user);
      setUser(user);
    };
    getData();
  }, []);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 20,
        borderRadius: SIZES.radius,
        elevation: 1,
        marginBottom: 10,
        backgroundColor: COLORS.gray2,
      }}
    >
      {/* Image */}
      <Image
        source={{
          uri:
            data?.image[0] ||
            "https://res.cloudinary.com/dbqvo0078/image/upload/v1688475091/Image_not_available_f5mwsi.png",
        }}
        alt="Not found"
        style={{ height: 90, width: 90, borderRadius: SIZES.radius }}
        resizeMode="stretch"
      />
      {/* Details */}
      <View
        style={{
          paddingHorizontal: 20,
          width: "75%",
          // backgroundColor: "#000",
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h3, color: COLORS.blue }}>
          {data?.author.nameUser}
        </Text>
        <Text
          style={{
            ...FONTS.body5,
            color: "#9C6B29",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          {data?.title}
        </Text>
        <Text
          style={{
            ...FONTS.body5,
            color: COLORS.lightGray2,
            fontSize: 11,
          }}
        >
          This post has {data?.reactionCount} likes
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CategoryCard;
