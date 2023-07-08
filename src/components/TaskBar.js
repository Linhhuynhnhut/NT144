import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import Post from "./Post";
import { api } from "../api/api";
import avts from "../data/Avatar";
export default TaskBarcomponent = ({
  currentButton,
  setCurrentButton,
  buttonWidth,
  setButtonWidth,
  translateValue,
  setTranslateValue,
  translateXRef,
  selectedButtons,
  selectButton,
  onButtonLayout,
  setPostsSearched,
  data,
  host,
}) => {
  const renderItemPost = ({ item }) => (
    <Post post={item} user={item.userInfo} host={host} tagsProp={item.tags} />
  );
  const [dataPosts, setDataPosts] = useState(0);
  const windowWidth = Dimensions.get("window").width;
  useEffect(() => {
    const getData = async () => {
      const allUsers = await api.getAllUsers();
      // const allReactions = await api.getAllReactions();
      const allTags = await api.getAllTags();
      const allPosts = await api.getAllPosts();

      const allPostsWithTagName = allPosts.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        console.log("tagsInThisPost>>>", tagsInThisPost);
        return {
          ...post,
          tags: tagsInThisPost,
        };
      });
      const postsWithInfoUser = allPostsWithTagName.map((post) => {
        let postId = post.user;
        const thisUser = allUsers.find((item) => item?._id === postId);
        const findItem = avts.find(
          (item) => item?.image?.uri === thisUser?.avatar
        );
        return {
          ...post,
          userInfo: {
            avatarID: findItem?.id || 0,
            avatar: thisUser?.avatar,
            nameUser: thisUser?.nameUser,
          },
        };
      });
      setPostsSearched(data);
      // console.log(postsWithInfoUser);
      setDataPosts(postsWithInfoUser || 0);
    };

    getData();
  }, [data]);

  return (
    <View style={{ width: windowWidth }}>
      <View
        style={{
          width: windowWidth,
          //backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {data.length === 0 ? (
          <>
            <View
              style={{
                backgroundColor: "#faeccd",
                minWidth: "100%",
                padding: 10,
                // paddingBottom: 0,
                borderTopColor: "#000",
                borderTopWidth: 1,
                // marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: "#635743",
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                Recommend
              </Text>
            </View>
            <FlatList
              data={dataPosts}
              renderItem={renderItemPost}
              style={{ flex: 1 }}
              // keyExtractor={(item) => item.id}
            />
          </>
        ) : (
          <>
            <View
              style={{
                backgroundColor: "#faeccd",
                width: windowWidth,
                padding: 10,
                // paddingBottom: 0,
                borderTopColor: "#000",
                borderTopWidth: 1,
                marginTop: 5,
              }}
            >
              <Text
                style={{
                  color: "#635743",
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                Search Result
              </Text>
            </View>
            <FlatList
              data={data}
              renderItem={renderItemPost}
              style={{ flex: 1 }}
            />
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  taskBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 2,
    borderBottomColor: "#d9d9d9",
    paddingHorizontal: 20,
    height: "8%",
  },
  lineContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 3,
  },
  line: {
    height: 3,
    backgroundColor: "#f27e35",
  },
});
