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
import { CategoryCard } from "../components";
import { FONTS, COLORS, SIZES, icons, images } from "../constants";
import Carousel from "react-native-snap-carousel";
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
import Blog from "../components/Blog";

const Home = ({ navigation, route }) => {
  console.log("routeHome>>>", route.params.myUserId);
  const [host, setHost] = useState({
    nameUser: "Chef's",
  });
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [modalRecipe, setModalRecipe] = React.useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [trendView, setTrendView] = React.useState(false);
  const [postTrending, setPostTrending] = useState(null);
  const [breakfastPosts, setBreakfastPosts] = useState(null);
  const [lunchPosts, setLunchPosts] = useState(null);
  const [dinnerPosts, setDinnerPosts] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [postsSelected, setPostsSelected] = useState(null);
  const [reaction, setReaction] = useState(false);
  const [reactionCount, setReactionCount] = useState(0);
  const [allReactions, setAllReactions] = useState([]);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

  const ImgPost = ({ src, index }) => (
    <Image style={styles.imgPost} source={{ uri: src }} />
  );
  const renderToggleButton = () => (
    <Pressable
      onPress={() => {
        setVisible(true);
      }}
      style={{ width: 50, height: 30, backgroundColor: "#f2ba35" }}
    >
      <Icon name="silverware" size={30} />
    </Pressable>
  );

  useEffect(() => {
    const getData = async () => {
      const allPosts = await api.getAllPosts();
      const myHostInfo = await api.getUser(route.params.myUserId);
      const allReactions = await api.getAllReactions(); // có user, post
      const allTags = await api.getAllTags();
      const allUsers = await api.getAllUsers();

      let reactionCountMax = 0;
      allPosts.forEach((post) => {
        const reactionOfPost = allReactions.filter(
          (item) => item.post === post?._id
        );
        const reactionCount = reactionOfPost.length;
        reactionCountMax =
          reactionCountMax > reactionCount ? reactionCountMax : reactionCount;
      });
      let reactionCount = 0;
      const trendingPost = allPosts.find((post) => {
        const reactionOfPost = allReactions.filter(
          (item) => item.post === post?._id
        );
        reactionCount = reactionOfPost.length;
        return reactionCount === reactionCountMax;
      });
      const authorPost = await api.getUser(trendingPost?.user);
      // console.log("author>>>", authorPost);
      const newTrendingPost = {
        ...trendingPost,
        reactionCount: reactionCount,
        author: authorPost,
      };

      const thisPostTags = newTrendingPost?.tags;
      // console.log("postTrend>>>", newTrendingPost);
      const tagsInThisPost = allTags.filter((tag) => {
        return thisPostTags.includes(tag._id);
      });

      const postTrendingWithTags = {
        ...newTrendingPost,
        tags: tagsInThisPost,
      };

      const thisReaction = allReactions.find((item) => {
        return item.post === trendingPost?._id && item.user === myHostInfo?._id;
      });
      let isActive = thisReaction ? true : false;
      console.log("tim>>>>", isActive);
      const breakfastTag = allTags.find((tag) => {
        return tag.nameTag.toLowerCase() === "sáng";
      });
      const lunchTag = allTags.find((tag) => {
        return tag.nameTag.toLowerCase() === "chiều";
      });
      const dinnerTag = allTags.find((tag) => {
        return tag.nameTag.toLowerCase() === "tối";
      });

      // Breakfast
      const breakfastPosts = allPosts.filter((item) => {
        const thisPostTags = item.tags;
        return thisPostTags.includes(breakfastTag._id);
      });

      const breakfastPostsWithTagName = breakfastPosts.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });

      const breakfastPostsFinnal = breakfastPostsWithTagName.map((post) => {
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

      // Lunch
      const lunchPosts = allPosts.filter((item) => {
        const thisPostTags = item.tags;
        return thisPostTags.includes(lunchTag._id);
      });

      const lunchPostsWithTagName = lunchPosts.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });

      const lunchPostsFinnal = lunchPostsWithTagName.map((post) => {
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

      //Dinner
      const dinnerPosts = allPosts.filter((item) => {
        const thisPostTags = item.tags;
        return thisPostTags.includes(dinnerTag._id);
      });

      const dinnerPostsWithTagName = dinnerPosts.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });

      const dinnerPostsFinnal = dinnerPostsWithTagName.map((post) => {
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

      // All

      const allPostsWithTagName = allPosts.map((post) => {
        const thisPostTags = post?.tags;
        const tagsInThisPost = allTags.filter((tag) => {
          return thisPostTags.includes(tag._id);
        });

        return {
          ...post,
          tags: tagsInThisPost,
        };
      });

      const allPostsFinnal = allPostsWithTagName.map((post) => {
        let postId = post?.user;
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

      console.log("posttrending>>>>", postTrendingWithTags.reactionCount);

      setPostTrending(postTrendingWithTags);
      setBreakfastPosts(breakfastPostsFinnal);
      setLunchPosts(lunchPostsFinnal);
      setDinnerPosts(dinnerPostsFinnal);
      setAllPosts(allPostsFinnal);
      setPostsSelected(breakfastPostsFinnal);
      setHost(myHostInfo);
      setReaction(isActive);
      setReactionCount(postTrendingWithTags.reactionCount);
      setAllReactions(allReactions);
    };

    getData();
  }, [allReactions.length]);

  const myUserId = route.params.myUserId;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f2ba35",
        paddingTop: 20,
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: SIZES.padding,
            alignItems: "center",
            height: 80,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color: COLORS.darkGreen,
                ...FONTS.h2,
                fontWeight: "bold",
              }}
            >
              Hello {host.nameUser}
            </Text>
            <Text
              style={{
                marginTop: 3,
                color: COLORS.black,
                ...FONTS.body3,
                fontWeight: "bold",
              }}
            >
              What you want to cook today?
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 40,
            height: 40,
            position: "absolute",
            right: 20,
            top: 20,
          }}
        >
          <Layout level="1">
            <OverflowMenu
              style={{
                width: 100,
                height: 90,
              }}
              anchor={renderToggleButton}
              visible={visible}
              selectedIndex={selectedIndex}
              onSelect={onItemSelect}
              onBackdropPress={() => setVisible(false)}
            >
              <MenuItem
                title="Profile"
                onPress={() =>
                  navigation.navigate("Profile", {
                    myUserId: myUserId,
                  })
                }
              />
              <MenuItem
                title="Log out"
                onPress={() => navigation.navigate("Login")}
              />
            </OverflowMenu>
          </Layout>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("Search", {
              myUserId: myUserId,
            })
          }
          style={{
            flexDirection: "row",
            height: 50,
            alignItems: "center",
            marginHorizontal: SIZES.padding,
            paddingHorizontal: SIZES.radius,
            borderRadius: 10,
            backgroundColor: COLORS.lightGray,
            zIndex: 5,
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
          <View
            style={{
              marginLeft: SIZES.radius,
              ...FONTS.body3,
              flex: 1,
            }}
          >
            <Text
              style={{
                ...FONTS.body3,
              }}
            >
              Search Recipe
            </Text>
          </View>
        </Pressable>
        <View
          style={{
            flexDirection: "row",
            marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.lightGreen,
          }}
        >
          <View
            style={{
              width: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={images.recipe} style={{ width: 80, height: 80 }} />
          </View>
          <View
            style={{
              flex: 1,
              paddingVertical: SIZES.radius,
            }}
          >
            <Text
              style={{
                width: "70%",
                ...FONTS.body4,
              }}
            >
              Do you want to update your profile?
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
              }}
              onPress={() =>
                navigation.navigate("Profile", {
                  myUserId: myUserId,
                })
              }
            >
              <Text
                style={{
                  color: COLORS.darkGreen,
                  textDecorationLine: "underline",
                  ...FONTS.h4,
                }}
              >
                My profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: SIZES.padding,
          }}
        >
          <Text
            style={{
              marginHorizontal: SIZES.padding,
              ...FONTS.h2,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            Trending Recipe
          </Text>
          <CategoryCard
            // key={state.tredingRecipe?._id}
            data={postTrending}
            onPress={() => setTrendView(true)}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={trendView}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setTrendView(!trendView);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Carousel
                // ref={(c) => {
                //   this._carousel = c;
                // }}
                layout={"tinder"}
                layoutCardOffset={18}
                data={postTrending?.image}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <Image source={{ uri: item }} style={styles.imageCard} />
                    </View>
                  );
                }}
                sliderWidth={700}
                itemWidth={340}
              />
              <View
                style={{
                  position: "absolute",
                  top: 180,
                  left: 2,
                  backgroundColor: "rgba(55, 57, 61, 0.5)",
                  width: "90%",
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 10,
                }}
              >
                <Avatar
                  source={{ uri: postTrending?.author.avatar }}
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
                    {postTrending?.author.nameUser}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  position: "absolute",
                  top: 250,
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
                  {postTrending?.title}
                </Text>

                <ScrollView
                  horizontal
                  style={{
                    marginBottom: 5,
                  }}
                  showsHorizontalScrollIndicator={false}
                >
                  {postTrending?.tags.map((item) => (
                    <Chip
                      style={{
                        marginRight: 8,
                        marginBottom: 4,
                        height: 40,
                        backgroundColor: "#FFD949",
                      }}
                      onPress={() => console.log("Pressed")}
                    >
                      {item.nameTag}
                    </Chip>
                  ))}
                </ScrollView>
                <View style={{ height: 305 }}>
                  <ScrollView
                    style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}
                  >
                    <Text style={{ textAlign: "justify", padding: 5 }}>
                      {postTrending?.content}
                    </Text>
                  </ScrollView>
                </View>
                {/* <Chip onPress={() => console.log(postTrending)}>abc</Chip> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  // backgroundColor: "#faeccd",
                  borderRadius: 10,
                  height: 40,
                  // right: 100,
                }}
              >
                <Pressable
                  onPress={async () => {
                    if (!reaction) {
                      const newReact = {
                        user: host?._id,
                        post: postTrending?._id,
                      };
                      const addReact = await api.addReaction(newReact);
                      console.log("newReact>>>", addReact);
                      setReactionCount(reactionCount + 1);
                    } else {
                      const allReactions = await api.getAllReactions();
                      const thisReaction = allReactions.find((item) => {
                        return (
                          item.post === postTrending?._id &&
                          item.user === host?._id
                        );
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
              <Pressable
                style={[styles.buttonClose]}
                onPress={() => {
                  console.log(postTrending.nameUser);
                  setTrendView(!trendView);
                }}
              >
                <Icon name="close-circle-outline" size={30} />
              </Pressable>
            </View>
          </View>
        </Modal>
        <View
          style={{
            flexDirection: "column",
            // alignItems: "center",
            marginTop: 20,
            marginHorizontal: SIZES.padding,
            // backgroundColor: "#000",
            height: 320,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              flex: 1,
              ...FONTS.h2,
              fontWeight: "bold",
            }}
          >
            Categories
          </Text>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              // backgroundColor: "#000",
            }}
          >
            <Pressable
              style={{
                marginRight: 16,
                marginBottom: 16,
                height: 120,
                width: 120,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#8ACCEE",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setPostsSelected(breakfastPosts);
                setModalRecipe(true);
              }}
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/bread.png")}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  zIndex: 5,
                  bottom: 20,
                }}
              />
              <Text
                style={{
                  height: 115,
                  width: 115,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  textAlignVertical: "center",
                  zIndex: 6,
                  color: "#F7FEE8",
                  fontSize: 20,
                  fontWeight: "700",
                  top: 32,
                }}
              >
                Breakfast
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginRight: 16,
                marginBottom: 16,
                height: 120,
                width: 120,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F76703",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setPostsSelected(lunchPosts);
                setModalRecipe(true);
              }}
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/rice.png")}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  zIndex: 5,
                  bottom: 20,
                }}
              />
              <Text
                style={{
                  height: 115,
                  width: 115,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  textAlignVertical: "center",
                  zIndex: 6,
                  color: "#F7FEE8",
                  fontSize: 20,
                  fontWeight: "700",
                  top: 32,
                }}
              >
                Lunch
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginRight: 16,
                marginBottom: 16,
                height: 120,
                width: 120,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#D75F36",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setPostsSelected(dinnerPosts);
                setModalRecipe(true);
              }}
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/dinner.png")}
                style={{
                  width: 90,
                  height: 90,
                  position: "absolute",
                  zIndex: 5,
                  bottom: 25,
                }}
              />
              <Text
                style={{
                  height: 115,
                  width: 115,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  textAlignVertical: "center",
                  zIndex: 6,
                  color: "#F7FEE8",
                  fontSize: 20,
                  fontWeight: "700",
                  top: 32,
                }}
              >
                Dinner
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginRight: 16,
                marginBottom: 16,
                height: 120,
                width: 120,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#A1C509",
                borderWidth: 2,
                borderRadius: 10,
              }}
              onPress={() => {
                setPostsSelected(allPosts);
                setModalRecipe(true);
              }}
            >
              <Image
                resizeMode="stretch"
                source={require("../../assets/cookie.png")}
                style={{
                  width: 100,
                  height: 100,
                  position: "absolute",
                  zIndex: 5,
                  bottom: 20,
                }}
              />
              <Text
                style={{
                  height: 115,
                  width: 115,
                  borderRadius: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  textAlignVertical: "center",
                  zIndex: 6,
                  color: "#F7FEE8",
                  fontSize: 20,
                  fontWeight: "700",
                  top: 32,
                }}
              >
                Other
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRecipe}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalRecipe(!modalRecipe);
        }}
      >
        <View style={styles.centeredView}>
          <Carousel
            layout={"stack"}
            layoutCardOffset={18}
            data={postsSelected}
            renderItem={({ item }) => {
              const postReaction = allReactions.filter(
                (reaction) => reaction.post === item?._id
              );
              return (
                <Blog
                  item={item}
                  allReactions={allReactions}
                  setAllReactions={setAllReactions}
                  host={host}
                  postReaction={postReaction}
                />
              );
            }}
            sliderWidth={700}
            itemWidth={340}
          />
          <Pressable
            style={[styles.buttonCloseRecipe]}
            onPress={() => {
              setModalRecipe(!modalRecipe);
            }}
          >
            <Icon name="close-circle-outline" size={30} />
          </Pressable>
        </View>
      </Modal>
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
            {/* <View
              style={{
                maxHeight: 500,
                width: "100%",
              }}
            >
              <FlatList
                style={[styles.cmtArr]}
                data={cmts}
                renderItem={({ item }) => <Cmt cmt={item} />}
                // keyExtractor={(item) => item.id}
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
                    user: hostApp?._id,
                    content: newComment,
                    post: post?._id,
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
                    avatar: hostApp.avatar,
                    name: hostApp.nameUser,
                  };

                  //setCmt
                  setCmts([...cmts, newCommentToState]);
                  setText("");
                }}
              >
                <Icon name="send-circle" size={30} />
              </Pressable>
            </View> */}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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
export default Home;
