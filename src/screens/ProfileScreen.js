import { api } from "../api/api"; // import api
import avts from "../data/Avatar";
import Post from "../components/Post";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import COLORS from "../consts/colors";
import LinearGradient from "react-native-linear-gradient";

const ProfileScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonsTaskbar = [
    { id: 0, title: "Bài viết", color: "white", boderTop: 0 },
    { id: 1, title: "Đã thích", color: "white", boderTop: 0 },
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
  const [profileInfo, setprofileInfo] = useState(null);
  const [isPressedAvt, setIsPressedAvt] = useState(0);
  const [avt, setAvt] = useState(0);

  // const avtStyle = isPressedAvt ? styles.avatarPressed : styles.avatar;

  useEffect(() => {
    const getData = async () => {
      const allUsers = await api.getAllUsers();
      const user = await api.getUser("6492620f3379bee002a3345b");
      const follow = await api.getAllFollows();
      const posts = await api.getAllPosts(); // có _id
      const allReactions = await api.getAllReactions(); // có user, post

      //loc
      const followInfo = {
        follower: follow.filter((item) => item.followee === user?._id) || [],
        following: follow.filter((item) => item.follower === user?._id) || [],
      };
      const myPosts = posts.filter((item) => item.user === user?._id) || [];
      const findItem = avts.find((item) => item?.image?.uri === user?.avatar);

      const postLikedIds = allReactions
        .filter((item) => item.user === user?._id)
        .map((r) => r?.post);

      const postLiked = posts.filter((item) => {
        return postLikedIds.includes(item._id);
      });

      // const followerInfo = followInfo.follower.map((user) => {
      //   const thisFollower = allUsers.find((item) => item._id === user);

      //   return {
      //     tag,
      //     nameTag: thisTag?.nameTag,
      //   };
      // });

      //console.log("mypost>>>", myPosts);
      setprofileInfo(followInfo);
      setUser(user);
      setAvt(findItem?.id);
      setIsPressedAvt(findItem?.id);
      setPosts(myPosts);
      setPostsLiked(postLiked);
    };

    getData();
  }, []);

  const renderItemPost = ({ item }) => (
    <Post post={item} avt={avt} user={user} />
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
              keyExtractor={(item) => item.id}
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
          onPress={() => navigation.navigate("Home", {})}
        >
          <Image
            style={{ width: 40, height: 30, opacity: 0.8 }}
            source={require("../../assets/image/back.png")}
          />
        </Pressable>
        <Text style={styles.title}>Profile</Text>
        <Pressable
          style={styles.buttonRight}
          onPress={() => navigation.navigate("Home", {})}
        >
          <Image
            style={{
              width: 60,
              height: 45,
              opacity: 0.8,
              shadowColor: "#000",
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            }}
            source={require("../../assets/image/more.png")}
          />
        </Pressable>
      </View>
      <View stickyHeaderIndices={[3]} style={{ elevation: 5 }}>
        <View style={{ height: 11, backgroundColor: "#F5EFE6" }}></View>
        <View style={styles.profileview}>
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
          <View style={{ padding: 0, zIndex: 4, top: 50, left: 20 }}>
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
              shadowColor: "#000",
              elevation: 25,
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
              shadowOpacity: 0.9,
              shadowColor: "#000",
              elevation: 25,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // alignItems: "center",
                width: "80%",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontStyle: "normal", fontSize: 18, fontWeight: 900 }}
                >
                  {posts?.length}
                </Text>
                <Text style={{ fontSize: 12, color: "grey" }}>User Posts</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontStyle: "normal",
                    fontSize: 18,
                    fontWeight: 900,
                  }}
                >
                  {profileInfo?.follower.length}
                </Text>
                <Text style={{ fontSize: 12, color: "grey" }}>Followers</Text>
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontStyle: "normal", fontSize: 18, fontWeight: 900 }}
                >
                  {profileInfo?.following.length}
                </Text>
                <Text style={{ fontSize: 12, color: "grey" }}>Following</Text>
              </View>
            </View>
            <View style={{ height: 10 }}></View>
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pressable
                onPress={() => setIsPressed(!isPressed)} // Khi nhấn vào, thay đổi giá trị state hiện tại.
                style={({ pressed }) => [
                  { opacity: pressed ? 0.5 : 1 }, // Điều chỉnh opacity của Pressable khi người dùng nhấn vào.
                ]}
              >
                {({ pressed }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      borderRadius: 10,
                      height: 50,
                      width: 180,
                      justifyContent: "center",
                      backgroundColor: isPressed ? "#DCDCDC" : "#f27e35",
                    }}
                  >
                    <FontAwesome5
                      name={isPressed ? "user-check" : "user-plus"}
                      size={30}
                      color={pressed ? "red" : "black"}
                    />
                    <Text style={{ fontWeight: "bold", marginLeft: 10 }}>
                      {isPressed ? "UnFollow" : "Follow"}
                    </Text>
                  </View>
                )}
              </Pressable>
            </View> */}
          </View>
        </View>
        <View
          style={{
            backgroundColor: "#F5EFE6",
          }}
        ></View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "#F5EFE6",
              height: 45,
              // marginTop: -1,
            }}
          >
            {buttonsTaskbar.map((button) => (
              <Pressable
                key={button.id}
                style={({ pressed }) => [
                  {
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
                  },
                  pressed && { opacity: 0.5 },
                ]}
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
            height: "68%",
          }}
        >
          {activeIndex === 0 && (
            <View style={{ flex: 1 }}>
              <FlatList
                data={posts}
                renderItem={renderItemPost}
                style={{ flex: 1 }}
              />
            </View>
          )}
          {activeIndex === 1 && (
            <View style={{ flex: 1 }}>
              <FlatList data={postsLiked} renderItem={renderItemPost} />
            </View>
          )}
          {/* {activeIndex === 2 && (
            <View style={{ flex: 1 }}>
              <FlatList
                data={followers}
                renderItem={renderItem}
                keyExtractor={({ id }) => id.toString()}
              />
            </View>
          )} */}
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
    justifyContent: "space-between",
  },
  title: {
    color: COLORS.mainColorProfile,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    backgroundColor: COLORS.mainColorProfile,
  },
  buttonLeft: {
    alignSelf: "flex-start",
    height: 40,
    backgroundColor: COLORS.mainColorProfile,
    width: 60,
    justifyContent: "center",
  },
  buttonRight: {
    alignSelf: "flex-end",
    height: 40,
    backgroundColor: COLORS.mainColorProfile,
    width: 60,
    ustifyContent: "center",
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
