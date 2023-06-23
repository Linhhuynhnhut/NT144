import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { api } from "../api/api"; // import api
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import avts from "../data/Avatar";

const ImgPost = ({ src, index }) => (
  <Image
    style={{
      width: "33%",
      height: 100,
      resizeMode: "stretch",
      margin: 1,
      borderWidth: 1,
      borderColor: "black",
      marginTop: 15,
    }}
    source={{ uri: src }}
  />
);

const Cmt = ({ cmt }) => {
  console.log("comment in Cmt", cmt);
  return (
    <View
      style={{
        //backgroundColor: "#bcdcda",
        flexDirection: "row",
        marginTop: 15,
        alignItems: "center",
      }}
    >
      <Image
        style={{
          resizeMode: "stretch",
          width: 40,
          height: 40,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "black",
        }}
        source={{ uri: cmt.avatar }}
      />
      <View
        style={{
          paddingLeft: 10,
          width: 200,
          //backgroundColor: "#bcbcbc",
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
        <Text>{cmt.content}</Text>
      </View>
    </View>
  );
};

const Post = ({ post, avt, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cmts, setCmts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      //1. Lấy tất cả comment và user
      const allComments = await api.getAllComments();
      const allUsers = await api.getAllUsers();

      //2. Lọc ra các comment của bài Post
      const comments = allComments.filter((item) => item.post === post?._id);

      //3. Ứng với mỗi comment => lấy ra userId để kết với thông tin user
      const commentsWithInfo = comments.map((cmt) => {
        let userId = cmt.user;
        const thisUser = allUsers.find((item) => item._id === userId);
        return {
          ...cmt,
          avatar: thisUser?.avatar,
          name: thisUser?.nameUser,
        };
      });

      //loc
      // const filteredArray = newAllUsers.filter((item) =>
      //   comment.some((user) => user?.user === item?.user)
      // );
      console.log("comment>>>", commentsWithInfo);
      // console.log("allUserArr>>>>>>>>", newAllUsers);
      // console.log("filtered>>>>>>>>", filteredArray);

      setCmts(commentsWithInfo);
      // setUserCmt(filteredArray);
    };

    getData();
  }, []);

  return (
    <>
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "black",
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ position: "absolute", right: 0, top: 10 }}>
            <Fontisto name="more-v-a" size={30} marginRight={20} />
          </View>
          <View
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              padding: 10,
              display: "flex",
              flexDirection: "row",
              //backgroundColor: "#000",
            }}
          >
            <Image
              style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "black",
              }}
              source={avts[avt]?.image}
            />
            <View
              style={{
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "900",
                }}
              >
                {user?.nameUser}
              </Text>
              <Text
                style={{
                  color: "grey",
                  fontSize: 12,
                }}
              >
                Đã đăng vào ngày {post?.date}
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: 20, fontWeight: 800 }}>{post.title}</Text>

          <Text
            style={{
              padding: 25,
              paddingBottom: 0,
              textAlign: "justify",
              // backgroundColor: "#000",
            }}
          >
            {post.content}
          </Text>
          <View
            style={{
              //backgroundColor: "#000",
              width: "100%",
              paddingLeft: 25,
              paddingBottom: 25,
              paddingRight: 25,
            }}
          >
            <FlatList
              numColumns={3}
              data={post.image}
              renderItem={({ item, index }) => (
                <ImgPost src={item} index={index} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>

          {/* <Image
            source={{ uri: post?.image[0] }}
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
            resizeMode="stretch"
          /> */}
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 10,
            height: 40,
          }}
        >
          <TouchableWithoutFeedback>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="heart"
                size={25}
                marginTop={5}
                marginLeft={10}
                color={"#ff4d4f"}
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
                100
              </Text>
            </View>
          </TouchableWithoutFeedback>

          <Pressable onPress={() => setModalVisible(true)}>
            <View style={{ flexDirection: "row" }}>
              <Icon
                name="comment-text-outline"
                size={25}
                marginTop={5}
                marginLeft={30}
              />
              <Text
                style={{
                  marginBottom: 10,
                  fontSize: 15,
                  color: "black",
                  marginTop: 5,
                }}
              >
                {cmts?.length}
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                height: 35,
                //backgroundColor: "#abc345",
                borderBottomWidth: 2,
                borderBottomColor: "#d3d6db",
              }}
            >
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="close-circle-outline" size={30} />
              </Pressable>
              <Text
                style={{
                  fontSize: 20,
                  color: "black",
                  //backgroundColor: "#000",
                  height: "100%",
                  width: "80%",
                  fontWeight: "900",
                }}
              >
                Comments
              </Text>
            </View>
            <View
              style={{
                maxHeight: 500,
                backgroundColor: "#bddesd",
              }}
            >
              <FlatList
                data={cmts}
                renderItem={({ item }) => <Cmt cmt={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    maxHeight: 500,
    width: "80%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    //backgroundColor: "#2196F3",
    position: "absolute",
    right: "2%",
    top: -2,
  },
});
