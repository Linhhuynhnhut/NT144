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

const ProfileScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const buttonsTaskbar = [
    { id: 0, title: "Post", color: "white", boderTop: 0 },
    { id: 1, title: "Follower", color: "white", boderTop: 0 },
    { id: 2, title: "Following", color: "white", boderTop: 0 },
  ];
  // const [selectedButton, setSelectedButton] = useState(buttonsTaskbar[0]);
  // const selectButton = (button) => {
  //   setSelectedButton(button);
  // };
  const [followers, setFollowers] = useState([
    {
      id: 1,
      name: "An",
      username: "id.usernam1",
      post: "23",
      follower: "123K",
      image: require("../../assets/image/avatar1.png"),
    },
    {
      id: 2,
      name: "Bình",
      username: "id.usernam2",
      post: "223",
      follower: "223K",
      image: require("../../assets/image/avatar2.jpg"),
    },
    {
      id: 3,
      name: "Cường",
      username: "id.usernam3",
      post: "33",
      follower: "15K",
      image: require("../../assets/image/avatar3.jpg"),
    },
    {
      id: 4,
      name: "Đạt",
      username: "id.usernam4",
      post: "63",
      follower: "163K",
      image: require("../../assets/image/avatar4.jpg"),
    },
    {
      id: 5,
      name: "Evelyn",
      username: "id.usernam5",
      post: "73",
      follower: "93K",
      image: require("../../assets/image/avatar5.jpg"),
    },
    {
      id: 6,
      name: "Phương",
      username: "id.usernam6",
      post: "43",
      follower: "13K",
      image: require("../../assets/image/avatar6.jpg"),
    },
    {
      id: 7,
      name: "Linh",
      username: "id.usernam8",
      post: "73",
      follower: "623K",
      image: require("../../assets/image/avatar7.jpg"),
    },
    {
      id: 8,
      name: "Huy",
      username: "id.usernam9",
      post: "25",
      follower: "23K",
      image: require("../../assets/image/avatar8.jpg"),
    },
    {
      id: 10,
      name: "Đức",
      username: "id.usernam123",
      post: "8",
      follower: "12K",
      image: require("../../assets/image/avatar10.jpg"),
    },
  ]);
  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "white", margin: 5 }}>
        <Image
          source={item.image}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: "black",
            marginLeft: 10,
          }}
        />
      </View>
      <View style={{ flex: 3, padding: 10, backgroundColor: "white" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 14, color: "black" }}>{item.username}</Text>
      </View>
    </View>
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [posts, setPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [profileInfo, setprofileInfo] = useState(null);
  const [isPressedAvt, setIsPressedAvt] = useState(0);
  const [avt, setAvt] = useState(0);

  // const avtStyle = isPressedAvt ? styles.avatarPressed : styles.avatar;

  useEffect(() => {
    const getData = async () => {
      const user = await api.getUser("6492620f3379bee002a3345b");
      const follow = await api.getAllFollows();
      const posts = await api.getAllPosts();
      //loc
      const followInfo = {
        follower: follow.filter((item) => item.followee === user?._id) || [],
        following: follow.filter((item) => item.follower === user?._id) || [],
      };
      const myPosts = posts.filter((item) => item.user === user?._id) || [];
      const findItem = avts.find((item) => item?.image?.uri === user?.avatar);

      console.log("user>>>", user);
      console.log("followers>>>", followInfo.follower.length);
      console.log("followeing>>>", followInfo.following.length);
      //console.log("mypost>>>", myPosts);
      setprofileInfo(followInfo);
      setUser(user);
      setAvt(findItem?.id);
      setIsPressedAvt(findItem?.id);
      setPosts(myPosts);
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
                console.log("avt>>>>", avt);
                console.log("isPressAvt>>>>", isPressedAvt);
              }}
            >
              <Icon name="check-decagram-outline" size={30} />
            </Pressable>
          </View>
        </View>
      </Modal>

      <View
        style={{ height: 25, backgroundColor: "white", paddingTop: 20 }}
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
      <View stickyHeaderIndices={[3]}>
        <View style={{ height: 10, backgroundColor: "white" }}></View>
        <View style={styles.profileview}>
          <View style={{ flex: 1 }}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: "black",
                marginLeft: 10,
              }}
              source={avts[avt]?.image}
            />
            <Pressable onPress={() => setModalVisible(true)}>
              <Icon
                name="image-auto-adjust"
                size={25}
                marginTop={-20}
                marginLeft={75}
                backgroundColor={"#fff9"}
              />
            </Pressable>
          </View>

          <View style={{ flex: 3 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "flex-end",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontStyle: "normal", fontSize: 18, fontWeight: 900 }}
                >
                  {posts?.length}
                </Text>
                <Text style={{ fontSize: 12, color: "grey" }}>Posts</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontStyle: "normal", fontSize: 18, fontWeight: 900 }}
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
        <View style={{ paddingBottom: 10, backgroundColor: "white" }}>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ fontWeight: "bold" }}>{user?.nameUser}</Text>
            <Text>Phone number: {user?.phoneNumber}</Text>
            <Text>{user?.mail}</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              backgroundColor: "white",
              height: 45,
            }}
          >
            {buttonsTaskbar.map((button) => (
              <Pressable
                key={button.id}
                style={({ pressed }) => [
                  {
                    padding: 10,
                    borderBottomWidth: activeIndex === button.id ? 1 : 0,
                    backgroundColor:
                      activeIndex === button.id ? "#F5F5F5" : "white",
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
            backgroundColor: "white",
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
              <FlatList
                data={followers}
                renderItem={renderItem}
                keyExtractor={({ id }) => id.toString()}
              />
            </View>
          )}
          {activeIndex === 2 && (
            <View style={{ flex: 1 }}>
              <FlatList
                data={followers}
                renderItem={renderItem}
                keyExtractor={({ id }) => id.toString()}
              />
            </View>
          )}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  introView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "yellow",
    width: "100%",
    height: 250,
    margin: 0,
  },
  profileview: {
    backgroundColor: "white",
    width: "100%",
    height: 120,
    margin: 0,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#fff",
    width: 100,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "white",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 0,
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
  },
  buttonLeft: {
    alignSelf: "flex-start",
    height: 40,
    backgroundColor: "white",
    width: 60,
    justifyContent: "center",
  },
  buttonRight: {
    alignSelf: "flex-end",
    height: 40,
    backgroundColor: "white",
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
