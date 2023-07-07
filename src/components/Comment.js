import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Modal,
  ImageBackground,
  ScrollView,
  FlatList,
} from "react-native";

import { api } from "../api/api";
import avts from "../data/Avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const Cmt = ({ cmt }) => {
  return (
    <View style={styles.cmtView}>
      <Image style={styles.avatarUserCmt} source={{ uri: cmt.avatar }} />
      <View
        style={{
          paddingLeft: 10,
          width: "85%",
        }}
      >
        <Text
          style={{
            color: "black",
            fontWeight: "900",
          }}
        >
          {cmt.name}
        </Text>
        <Text
          style={{
            textAlign: "justify",
          }}
        >
          {cmt.content}
        </Text>
      </View>
    </View>
  );
};
export default Cmt;
