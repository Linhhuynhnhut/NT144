import React, { useState, useEffect, useRef } from "react";
import {
  TextInput,
  Animated,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import COLORS from "../consts/colors";
import avts from "../data/Avatar";
import { api } from "../api/api"; // import api
import TaskBar from "../components/TaskBar";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "../constants";
const SearchScreen = ({ navigation, route }) => {
  console.log("routeSearch>>>", route.params.myUserId);

  // console.log(route.params.myUserId);
  const [text, setText] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [host, setHost] = useState(null);
  // taskbar
  const [currentButton, setCurrentButton] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(0);
  const [translateValue, setTranslateValue] = useState(new Animated.Value(0));
  const translateXRef = useRef(null);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [postsSearched, setPostsSearched] = useState([]);
  const selectButton = (index) => {
    setCurrentButton(index);
    const newSelectedButtons = new Array(2).fill(false);
    newSelectedButtons[index] = true;
    setSelectedButtons(newSelectedButtons);
    Animated.timing(translateValue, {
      toValue: index * (buttonWidth + 20),
      duration: 150,
      useNativeDriver: true,
    }).start();
  };
  const onButtonLayout = (event) => {
    const width = event.nativeEvent.layout.width;
    setButtonWidth(width);
  };

  useEffect(() => {
    const getData = async () => {
      const allComments = await api.getAllComments();
      const allUsers = await api.getAllUsers();
      const allReactions = await api.getAllReactions();
      const allTags = await api.getAllTags();
      const allPosts = await api.getAllPosts();

      const allPostsWithInfoUser = allPosts.map((post) => {
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
      const postWithTagName = allPostsWithInfoUser.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });
      const myHostInfo = await api.getUser(route.params.myUserId);

      setHost(myHostInfo);
      setAllUsers(allUsers);
      setAllPosts(postWithTagName);
      setAllTags(allTags);
      setSelectedButtons([true, false, false]);
    };

    getData();
  }, [postsSearched.length]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Pressable
          style={styles.buttonLeft}
          onPress={() =>
            navigation.navigate("Home", {
              myUserId: route.params.myUserId,
            })
          }
        >
          <Image
            style={{ width: 40, height: 30, opacity: 0.8 }}
            source={require("../../assets/image/back.png")}
          />
        </Pressable>
        <Text style={styles.title}>Search</Text>
      </View>

      <View style={{ flex: 9 }}>
        <LinearGradient
          colors={["rgb(254,182,36)", "transparent"]}
          style={{
            left: 0,
            right: 0,
            flex: 1,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFF",
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 15,
              // marginTop: 25,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="What to eat today?..... "
              placeholderTextColor="#FEB624"
              style={{
                fontWeight: "bold",
                fontSize: 18,
                width: "100%",
                color: "#FEB624",
              }}
              onChangeText={(text) => {
                setText(text);
              }}
              value={text}
            />
            <TouchableOpacity
              style={{
                width: 20,
                height: "100%",
                tintColor: COLORS.gray,
                // position: "absolute",
                right: 10,
                top: 5,
                // backgroundColor: "#000",
              }}
              onPress={async () => {
                const postsHaveKeyWords = allPosts.filter((post) => {
                  const keyWordArr = text.split(" ");
                  const tagArr = post?.tags;
                  let found = false;
                  //1. Lặp qua tất cả keyword
                  keyWordArr.forEach((keyword) => {
                    //2. Duyệt có tag nào khớp keyword đang lặp hay không
                    if (
                      tagArr.find(
                        (tag) =>
                          tag?.nameTag?.toLowerCase() === keyword?.toLowerCase()
                      )
                    ) {
                      //3. Nếu có set giá trị found  = true
                      found = true;
                    }
                  });

                  return found;
                });

                // console.log(
                //   "postsHaveKeyWords[0].tags>>>",
                //   postsHaveKeyWords[0].tags
                // );

                // const postLiked = posts.filter((item) => {
                //   return postLikedIds.includes(item._id);
                // });
                const postsWithInfoUser = postsHaveKeyWords.map((post) => {
                  let postId = post.user;
                  const thisUser = allUsers.find(
                    (item) => item?._id === postId
                  );
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
                setPostsSearched(postsWithInfoUser);
                // console.log(
                //   "postsWithInfoUser[0].tags>>>",
                //   postsWithInfoUser[0].tags
                // );

                // console.log("allPost>>>>>", allPosts);
              }}
            >
              <Image
                source={icons.search}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.gray,
                }}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["transparent", "rgba(254,182,36,0.2)"]}
          style={{
            left: 0,
            right: 0,
            flex: 9,
          }}
        >
          <TaskBar
            currentButton={currentButton}
            setCurrentButton={setCurrentButton}
            buttonWidth={buttonWidth}
            setButtonWidth={setButtonWidth}
            translateValue={translateValue}
            setTranslateValue={setTranslateValue}
            translateXRef={translateXRef}
            selectedButtons={selectedButtons}
            selectButton={selectButton}
            onButtonLayout={onButtonLayout}
            setPostsSearched={setPostsSearched}
            data={postsSearched}
            host={host}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default SearchScreen;
const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: COLORS.mainColorProfile,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonLeft: {
    position: "absolute",
    height: 40,
    backgroundColor: COLORS.mainColorProfile,
    width: 60,
    justifyContent: "center",
    left: 10,
    bottom: 5,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 900,
    color: "#fff",
    marginTop: 20,
  },
});
