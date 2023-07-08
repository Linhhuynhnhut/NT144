import { api } from "../api/api"; // import api
import Post from "../components/Post";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import avts from "../data/Avatar";
import COLORS from "../consts/colors";
import { LinearGradient } from "expo-linear-gradient";
const ProfileScreen = ({ navigation, route }) => {
  console.log("routeProfile>>>", route.params.myUserId);
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonsTaskbar = [
    { id: 0, title: "Posts", color: "white", boderTop: 0 },
    { id: 1, title: "Liked", color: "white", boderTop: 0 },
    // { id: 2, title: "Following", color: "white", boderTop: 0 },
  ];
  // const [selectedButton, setSelectedButton] = useState(buttonsTaskbar[0]);
  // const selectButton = (button) => {
  //   setSelectedButton(button);
  // };

  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState(null);
  const [postsLiked, setPostsLiked] = useState(null);
  const [user, setUser] = useState(null);
  const [isPressedAvt, setIsPressedAvt] = useState(0);
  const [avt, setAvt] = useState(0);

  // const [profileInfo, setprofileInfo] = useState(null);
  // const avtStyle = isPressedAvt ? styles.avatarPressed : styles.avatar;

  useEffect(() => {
    const getData = async () => {
      const allUsers = await api.getAllUsers();
      const user = await api.getUser(route.params.myUserId);
      // const follow = await api.getAllFollows();
      const allTags = await api.getAllTags();
      const posts = await api.getAllPosts(); // có _id

      const allReactions = await api.getAllReactions(); // có user, post
      const allPostsWithInfoUser = posts.map((post) => {
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
      //loc
      // const followInfo = {
      //   follower: follow.filter((item) => item.followee === user?._id) || [],
      //   following: follow.filter((item) => item.follower === user?._id) || [],
      // };
      const myPosts =
        allPostsWithInfoUser.filter((item) => item.user === user?._id) || [];
      const findItem = avts.find((item) => item?.image?.uri === user?.avatar);
      const allPostsWithTagName = myPosts.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });
      const postLikedIds = allReactions
        .filter((item) => item.user === user?._id)
        .map((r) => r?.post);
      const postLiked = allPostsWithInfoUser.filter((item) => {
        return postLikedIds.includes(item._id);
      });
      console.log("postliked>>>>", postLikedIds);
      console.log("postliked>>>>", allReactions);

      const allPostsLikedWithTagName = postLiked.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });

      // const followerInfo = followInfo.follower.map((user) => {
      //   const thisFollower = allUsers.find((item) => item._id === user);

      //   return {
      //     tag,
      //     nameTag: thisTag?.nameTag,
      //   };
      // });

      // console.log("myUser>>>", allPostsWithTagName);

      // setprofileInfo(followInfo);
      setUser(user);
      setAvt(findItem?.id || 0);
      setIsPressedAvt(findItem?.id);
      setPosts(allPostsWithTagName);
      setPostsLiked(allPostsLikedWithTagName);
    };

    getData();
  }, []);

  const renderItemPost = ({ item }) => (
    <Post
      post={item}
      user={user}
      host={user}
      posts={posts}
      setPosts={setPosts}
      author={item.userInfo}
      canDel={item.user === user._id}
    />
  );

  const Avatar = ({ src, index }) => (
    <Pressable
      onPress={() => {
        setIsPressedAvt(index);
      }}
      style={index == isPressedAvt ? styles.avatarPressed : styles.avatar}
    >
      <Image
        style={{ width: "100%", height: 100, opacity: 0.8 }}
        source={src}
      />
    </Pressable>
  );

  return (
    <>
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
            <Pressable
              style={[styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIsPressedAvt(avt);
              }}
            >
              <Icon name="close-circle-outline" size={30} />
            </Pressable>
            <Text style={[styles.titleAvatar]}>
              Chọn ảnh đại diện cho profile
            </Text>
            <FlatList
              numColumns={2}
              columnWrapperStyle
              data={avts}
              renderItem={({ item, index }) => (
                <Avatar src={item?.image} index={index} />
              )}
              // keyExtractor={(item) => item.id}
            />
            <Pressable
              style={{
                backgroundColor: "#ebab34",
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 50,
                paddingRight: 50,
                borderRadius: 10,
                top: 8,
              }}
              onPress={async () => {
                setModalVisible(!modalVisible);
                setAvt(isPressedAvt);
                const findItem = avts[isPressedAvt].image.uri;
                const payloadUpdateAvt = {
                  ...user,
                  avatar: findItem,
                };
                try {
                  await api.updateUser(user._id, payloadUpdateAvt);
                } catch (error) {
                  console.log("error update user>>>", error.response.data);
                }
              }}
            >
              <Icon name="check-decagram-outline" size={30} />
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{
          height: 25,
          backgroundColor: COLORS.mainColorProfile,
          paddingTop: 20,
        }}
      ></View>
      <View style={styles.header}>
        <Pressable
          style={styles.buttonLeft}
          onPress={() =>
            navigation.navigate("Home", {
              myUserId: user?._id,
            })
          }
        >
          <Image
            style={{ width: 40, height: 30, opacity: 0.8 }}
            source={require("../../assets/image/back.png")}
          />
        </Pressable>
        <Text style={styles.title}>Profile</Text>
        <Pressable style={styles.buttonRight}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              borderWidth: 2,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
            onPress={() =>
              navigation.navigate("Post", {
                myUserId: user._id,
              })
            }
          >
            <MaterialIcons name="add" size={30} color="black" />
          </TouchableOpacity>
        </Pressable>
      </View>
      <View stickyHeaderIndices={[3]} style={{ elevation: 5 }}>
        <LinearGradient
          colors={["rgb(254,182,36)", "transparent"]}
          style={styles.profileview}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: "black",
              right: 10,
              zIndex: 4,
            }}
            source={avts[avt]?.image}
          />
          <Pressable
            onPress={() => setModalVisible(true)}
            style={styles.btnSetAvt}
          >
            <Icon
              name="image-auto-adjust"
              size={25}
              marginTop={-20}
              marginLeft={75}
              backgroundColor={"#fff4"}
            />
          </Pressable>
          <View style={{ padding: 0, zIndex: 4, top: 40, left: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {user?.nameUser}
            </Text>
            <Text>Phone number: {user?.phoneNumber}</Text>
            <Text>{user?.mail}</Text>
          </View>
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              backgroundColor: COLORS.mainColorProfile,
              width: "90%",
              height: 80,
              top: 40,
              marginBottom: 5,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
              shadowColor: "blue",
              elevation: 5,
            }}
          ></View>
          <View
            style={{
              backgroundColor: COLORS.mainColorProfile,
              width: "90%",
              height: 50,
              position: "absolute",
              bottom: 5,
              borderBottomRightRadius: 40,
              borderBottomLeftRadius: 40,
              paddingTop: 5,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                // alignItems: "center",
                width: "80%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontStyle: "normal", fontSize: 18, fontWeight: 700 }}
                >
                  You have {posts?.length} Posts
                </Text>
                <Text style={{ fontSize: 12, color: "#24221f" }}>
                  Do you want to add more ???????
                </Text>
              </View>
            </View>

            <View style={{ height: 10 }}></View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 6,
              }}
            ></View>
          </View>
        </LinearGradient>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "transparent",
              height: 45,
            }}
          >
            {buttonsTaskbar.map((button) => (
              <Pressable
                key={button.id}
                style={{
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  padding: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: activeIndex === button.id ? 5 : 0,
                    height: activeIndex === button.id ? 5 : 0,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 10,
                  elevation: 5,
                  backgroundColor:
                    activeIndex === button.id ? "#faeccd" : "#FFCA48",
                  flex: 1, // Chiếm hết toàn bộ chiều rộng của View
                }}
                onPress={() => setActiveIndex(button.id)}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: activeIndex === button.id ? "bold" : "normal",
                  }}
                >
                  {button.title}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#faeccd",
            height: "67%",
          }}
        >
          {activeIndex === 0 ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={posts}
                renderItem={renderItemPost}
                style={{ flex: 1 }}
                // keyExtractor={(item) => item.id}
              />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                data={postsLiked}
                renderItem={renderItemPost}
                // keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  profileview: {
    backgroundColor: "#F5EFE6",
    width: "100%",
    height: 180,
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#f2ba35",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: COLORS.mainColorProfile,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonLeft: {
    position: "absolute",
    left: 0,
    alignSelf: "flex-start",
    height: 40,
    backgroundColor: COLORS.mainColorProfile,
    width: 60,
    justifyContent: "center",
  },
  buttonRight: {
    position: "absolute",
    top: 5,
    right: 0,
    height: 40,
    backgroundColor: COLORS.mainColorProfile,
    width: 60,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 900,
    color: "black",
  },
  taskbar: {
    backgroundColor: "#f2ba35",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  buttonFollow: {
    flexDirection: "row",
    flex: 3,
    backgroundColor: "#f27e35",
    marginLeft: 25,
    marginRight: 25,
    padding: 5,
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    height: 540,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    paddingTop: 20,
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
  titleAvatar: {
    color: "#e87a13",
    fontSize: 17,
    fontWeight: "500",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    //backgroundColor: "#2196F3",
    position: "absolute",
    right: "2%",
    top: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  btnSetAvt: {
    zIndex: 4,
    position: "absolute",
    top: 100,
    left: 40,
  },
  avatar: {
    width: 120,
    height: 120,
    margin: 10,
    marginTop: 20,
    borderWidth: 2,
    opacity: 0.5,
    borderColor: "grey",
    padding: 10,
    backgroundColor: "#000",
  },
  avatarPressed: {
    width: 120,
    height: 120,
    margin: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "green",
    padding: 10,
  },
});
export default ProfileScreen;
