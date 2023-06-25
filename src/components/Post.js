import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { api } from "../api/api"; // import api
import React, { useState, useEffect } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Fontisto from "react-native-vector-icons/Fontisto";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import avts from "../data/Avatar";

const ImgPost = ({ src, index }) => (
  <Image style={styles.imgPost} source={{ uri: src }} />
);

const Cmt = ({ cmt }) => {
  // console.log("comment in Cmt", cmt);
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

const Post = ({ post, avt, user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [cmts, setCmts] = useState(null);
  const [tags, setTags] = useState(null);
  const [text, setText] = useState("");
  const [reaction, setReaction] = useState(false);
  const [reactionCount, setReactionCount] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const getData = async () => {
      // Lấy tất cả comment và user và reaction và tag
      const allComments = await api.getAllComments();
      const allUsers = await api.getAllUsers();
      const allReactions = await api.getAllReactions();
      const allTags = await api.getAllTags();

      //2. Lọc ra các comment của bài Post, có thả tim ko, tag nào được sử dụng
      const comments = allComments.filter((item) => item.post === post?._id);
      const thisReaction =
        allReactions.find((item) => {
          return item.post === post?._id && item.user === user._id;
        }) || null;
      const postReaction = allReactions.filter(
        (item) => item.post === post?._id
      );
      const postTags = post.tags;

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

      // Ứng với mỗi tag, lấy ra tagName
      const tagsInfo = postTags.map((tag) => {
        const thisTag = allTags.find((item) => item._id === tag);

        return {
          tag,
          nameTag: thisTag?.nameTag,
        };
      });
      // Nếu có reaction thì cho màu đỏ
      if (thisReaction === null) setReaction(false);
      else setReaction(true);

      // số tim
      setReactionCount(postReaction);
      setTags(tagsInfo);
      setCmts(commentsWithInfo);
    };

    getData();
  }, [cmts?.length, reaction]);

  return (
    <>
      <View style={styles.postComponent}>
        <View style={styles.postView}>
          <View style={{ position: "absolute", right: 0, top: 10 }}>
            <Fontisto name="more-v-a" size={30} marginRight={20} />
          </View>
          <View style={styles.headerPost}>
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
          <View
            style={{
              width: "80%",
              backgroundColor: "#faeccd",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 800,
                padding: 10,
                margin: 5,
                backgroundColor: "#F7D600",
                borderRadius: 10,
                color: "#F48100",
              }}
            >
              Khẩu phần: 4 người
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 800,
                padding: 10,
                margin: 5,
                backgroundColor: "#F7D600",
                borderRadius: 10,
                color: "#F48100",
              }}
            >
              Thời gian nấu: 2 tiếng
            </Text>
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
            <View style={styles.tagView}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={tags}
                renderItem={({ item }) => (
                  <Text style={styles.tag}>{item.nameTag}</Text>
                )}
                keyExtractor={(item) => item.id}
                style={{ maxWidth: 500 }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#faeccd",
            borderRadius: 10,
            height: 40,
          }}
        >
          <Pressable
            onPress={async () => {
              if (!reaction) {
                const newReact = {
                  user: user._id,
                  post: post._id,
                };
                const addReact = await api.addReaction(newReact);
              } else {
                const allReactions = await api.getAllReactions();
                const thisReaction = allReactions.find((item) => {
                  return item.post === post?._id && item.user === user._id;
                });
                try {
                  api.deleteReaction(thisReaction._id);
                } catch (error) {}
              }
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
                {reactionCount?.length}
              </Text>
            </View>
          </Pressable>

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

      {/* // Modal comment */}

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
            <View style={styles.cmtHeader}>
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Icon name="close-circle-outline" size={30} />
              </Pressable>
              <Text style={styles.titleModal}>Comments</Text>
            </View>
            <View
              style={{
                maxHeight: 500,
                width: "100%",
              }}
            >
              <FlatList
                style={[styles.cmtArr]}
                data={cmts}
                renderItem={({ item }) => <Cmt cmt={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                placeholder="Nhập bình luận..."
                multiline={true}
                onChangeText={(text) => setText(text)}
                onContentSizeChange={(event) =>
                  setHeight(event.nativeEvent.contentSize.height)
                }
                style={[styles.input, { height: Math.max(35, height) }]}
                value={text}
              />
              <Pressable
                style={[styles.buttonSend]}
                onPress={async () => {
                  const newComment = text;
                  const payloadComment = {
                    user: user._id,
                    content: newComment,
                    post: post._id,
                  };

                  let postedComment;
                  try {
                    postedComment = await api.addComment(payloadComment);
                  } catch (error) {
                    console.log("error update user>>>", error.response.data);
                  }
                  // console.log("newCmt>>>>", payloadComment);

                  // console.log("postedComment>>>", postedComment);

                  //Kết thêm info vào postedComment
                  const newCommentToState = {
                    ...postedComment,
                    avatar: user.avatar,
                    name: user.nameUser,
                  };

                  //setCmt
                  setCmts([...cmts, newCommentToState]);
                  setText("");
                }}
              >
                <Icon name="send-circle" size={30} />
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Post;

const styles = StyleSheet.create({
  postComponent: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDAE32",
    backgroundColor: "#faeccd",
    marginTop: -1,
  },
  postView: {
    borderWidth: 1,
    borderColor: "#EDAE32",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: -20,
  },
  modalView: {
    maxHeight: 500,
    width: "80%",
    margin: 20,
    backgroundColor: "#edeff2",
    borderRadius: 20,
    padding: 15,
    paddingTop: 10,
    alignItems: "center",
    shadowColor: "green",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  buttonClose: {
    //backgroundColor: "#2196F3",
    position: "absolute",
    right: "2%",
    top: -2,
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
  headerPost: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 10,
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "#000",
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
  tagView: {
    width: "100%",
    height: 40,
    //backgroundColor: "black",
    marginTop: 10,
  },
  tag: {
    marginRight: 10,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#F6D700",
    borderRadius: 10,
  },
});
