import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Modal,
  FlatList,
} from "react-native";

import { api } from "../api/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CategoryCard, TrendingCard } from "../components";
import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";
import Carousel from "react-native-snap-carousel";

import {
  Menu,
  MenuItem,
  Card,
  Layout,
  Button,
  OverflowMenu,
} from "@ui-kitten/components";

const Home = ({ navigation, route }) => {
  console.log("routeHome>>>", route.params.myUserId);
  const renderItemPost = ({ item }) => <View>Hi</View>;
  // const [state, setState] = useState({
  //   allPosts: [],
  //   tredingRecipe: {},
  // });
  const [host, setHost] = useState({
    nameUser: "Chef's",
  });
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [trendView, setTrendView] = React.useState(false);
  const [postTrending, setPostTrending] = useState(null);
  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };

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

      const postReaction = allReactions.filter(
        (item) => item.user === myHostInfo?._id
      );
      // if (result) {
      //   let tredingRecipe = result.reduce(function (item1, item2) {
      //     return item1?.reactionCount > item2?.reactionCount ? item1 : item2;
      //   });
      //   setState((prev) => ({
      //     ...prev,
      //     allPosts: result,
      //     tredingRecipe: tredingRecipe,
      //   }));
      // }
      let reactionCountMax = 0;
      const postFavorite = allPosts[0];
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
      console.log("author>>>", authorPost);
      const newTrendingPost = {
        ...trendingPost,
        reactionCount: reactionCount,
        author: authorPost,
      };
      setPostTrending(newTrendingPost);
      // setPostsLiked(postReaction);
      setHost(myHostInfo);
    };

    getData();
  }, []);

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
            right: 30,
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
              onPress={() => console.log("See recipes")}
            >
              <Text
                style={{
                  color: COLORS.darkGreen,
                  textDecorationLine: "underline",
                  ...FONTS.h4,
                }}
              >
                See Recipes
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
                itemWidth={300}
              />
              <Text
                style={{
                  fontSize: 16,
                }}
              >
                {postTrending?.author.nameUser}
              </Text>
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
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginHorizontal: SIZES.padding,
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
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.darkGreen,
                ...FONTS.body4,
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <MenuItem
        title={(evaProps) => <Text {...evaProps}>USERS</Text>}
        style={{ width: 100, height: 100 }}
      ></MenuItem> */}

      {/* <FlatList
        data={dummyData.categories}
        // keyExtractor={(item) => item.id.toString()}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <CategoryCard
              data={item}
              categoryItem={item}
              containerStyle={{
                marginHorizontal: SIZES.padding,
              }}
              onPress={() => navigation.navigate("Recipe", { recipe: item })}
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          />
        }
      /> */}
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
    width: "80%",
    height: 540,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
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
});
export default Home;
