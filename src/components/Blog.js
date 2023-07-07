import React, { useEffect, useState } from "react";
import {
  View,
  Pressable,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

import { api } from "../api/api";
import avts from "../data/Avatar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CategoryCard } from "../components";
import { FONTS, COLORS, SIZES, icons, images } from "../constants";
import AntDesign from "react-native-vector-icons/AntDesign";
import Cmt from "../components/Comment";

import {
  Avatar,
  MenuItem,
  Card,
  Layout,
  OverflowMenu,
  Text,
} from "@ui-kitten/components";
import { Button, Chip } from "react-native-paper";
const ImgPost = ({ src, index }) => (
  <Image style={styles.imgPost} source={{ uri: src }} />
);
const Blog = ({ item, allReactions, setAllReactions, host, postReaction }) => {
  const [reaction, setReaction] = useState(
    postReaction.find((item) => item.user === host._id) ? true : false
  );
  const [reactionCount, setReactionCount] = useState(
    allReactions.filter((reaction) => reaction.post === item?._id)?.length || 0
  );
  //   const [postReaction, setPostReaction] = useState(
  //     allReactions.filter((reaction) => reaction.post === item?._id) || []
  //   );
  //   const postReaction = allReactions.filter(
  //     (reaction) => reaction.post === item?._id
  //   );
  //   console.log("postReaction>>>", postReaction.length);
  return (
    <View style={styles.modalRecipeView}>
      <View
        style={{
          position: "absolute",
          top: 20,
          // left: 2,
          backgroundColor: "rgba(55, 57, 61, 0.5)",
          width: "90%",
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <Avatar
          source={{ uri: item?.userInfo.avatar }}
          ImageComponent={ImageBackground}
        />
        <View>
          <Text
            category="s1"
            style={{
              padding: 5,
              paddingBottom: 0,
              left: 10,
              color: "#A1BEED",
              borderRadius: 10,
              fontFamily: "notoserif",
            }}
          >
            Recipe by
          </Text>
          <Text
            category="h5"
            style={{
              padding: 5,
              paddingTop: 0,
              left: 10,
              color: "#CFE0FA",
              borderRadius: 10,
            }}
          >
            {item?.userInfo.nameUser}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          top: 60,
          // left: 2,
          // backgroundColor: "rgba(55, 57, 61, 0.9)",
          width: "100%",
          // height: 100,
          borderRadius: 10,
          // flexDirection: "row",
          // justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
          padding: 5,
        }}
      >
        <Text
          category="h6"
          style={{
            // padding: 5,
            padding: 10,
            // left: 10,
            justifyContent: "center",
            color: "#7A7D7A",
            borderRadius: 10,
            width: "100%",
            textAlign: "center",
          }}
        >
          {item?.title}
        </Text>

        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "flex-start",
            flexDirection: "row",
            flexWrap: "wrap",
            marginBottom: 5,
          }}
        >
          {item?.tags.map((tag) => (
            <Chip
              style={{
                marginRight: 8,
                marginBottom: 4,
                height: 40,
                backgroundColor: "#FFD949",
              }}
              onPress={() => console.log("Pressed")}
            >
              {tag.nameTag}
            </Chip>
          ))}
        </View>
        <View style={{ height: 310, marginTop: 10 }}>
          <ScrollView
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ textAlign: "justify", padding: 5 }}>
              {item?.content}
            </Text>
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
          }}
        >
          <FlatList
            numColumns={3}
            data={item?.image}
            renderItem={({ item, index }) => {
              console.log("image>>>", item);
              return <ImgPost src={item} index={index} key={index} />;
            }}
            // keyExtractor={(item) => item._id}
          />
        </View>

        {/* <Chip onPress={() => console.log(item)}>abc</Chip> */}
      </View>
      <View
        style={{
          flexDirection: "row",
          // backgroundColor: "#faeccd",
          borderRadius: 10,
          height: 40,
          position: "absolute",
          bottom: 0,
          left: 10,
        }}
      >
        <Pressable
          onPress={async () => {
            if (!reaction) {
              const newReact = {
                user: host?._id,
                post: item?._id,
              };
              const addReact = await api.addReaction(newReact);
              console.log("newReact>>>", addReact);
              setReactionCount(reactionCount + 1);
            } else {
              //   const allReactions = await api.getAllReactions();
              const thisReaction = allReactions.find((re) => {
                return re.post === item?._id && re.user === host?._id;
              });
              try {
                api.deleteReaction(thisReaction?._id);
                console.log("ok");
                setReactionCount(reactionCount - 1);
              } catch (error) {}
            }
            const newAllReactions = await api.getAllReactions();
            setAllReactions(newAllReactions);
            setReaction(!reaction);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <AntDesign
              name="heart"
              size={25}
              marginTop={5}
              marginLeft={10}
              color={reaction ? "#ff4d4f" : "#000"}
            />
            <Text
              style={{
                marginBottom: 10,
                fontSize: 15,
                color: "black",
                marginTop: 5,
                //backgroundColor: "#000",
                paddingTop: 2,
                paddingLeft: 5,
              }}
            >
              {reactionCount}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    height: 700,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    // justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageCard: {
    width: "100%",
    height: 230,
    resizeMode: "stretch",
    borderRadius: 10,
  },
  buttonClose: {
    //backgroundColor: "#2196F3",
    position: "absolute",
    right: "2%",
    top: 10,
  },
  buttonCloseRecipe: {
    //backgroundColor: "#2196F3",
    position: "absolute",
    top: 55,
    right: 45,
  },
  modalRecipeView: {
    width: "90%",
    height: 700,
    margin: 20,
    top: 30,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    // justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imgPost: {
    width: "33%",
    height: 100,
    resizeMode: "stretch",
    margin: 1,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 15,
  },
  cmtHeader: {
    width: "100%",
    height: 35,
    //backgroundColor: "#abc345",
    borderBottomWidth: 2,
    borderBottomColor: "#d3d6db",
  },
  titleModal: {
    fontSize: 20,
    color: "black",
    //backgroundColor: "#000",
    height: "100%",
    width: "80%",
    fontWeight: "900",
  },
  cmtArr: {
    maxHeight: 400,
  },
  inputView: {
    width: 314,
    height: 70,
    borderTopWidth: 2,
    borderTopColor: "#dcdfe3",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: "#edeff2",
    marginTop: 10,
  },
  buttonSend: {
    position: "absolute",
    right: 15,
    top: 15,
  },
  input: {
    padding: 12,
    paddingRight: 50,
    margin: 10,
    backgroundColor: "#FFF",
    borderRadius: 10,
    maxHeight: 60,
  },
  cmtView: {
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  avatarUserCmt: {
    resizeMode: "stretch",
    width: 40,
    height: 40,
    marginTop: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
});
export default Blog;
