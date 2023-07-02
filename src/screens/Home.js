import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";

import { api } from "../api/api";

import { CategoryCard, TrendingCard } from "../components";

import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";

const Home = ({ navigation, route }) => {
  const [state, setState] = useState({
    allPosts: [],
    tredingRecipe: {},
  });

  useEffect(async () => {
    const result = await api.getAllPosts();
    if (result) {
      let tredingRecipe = result.reduce(function (item1, item2) {
        return item1?.reactionCount > item2?.reactionCount ? item1 : item2;
      });
      setState((prev) => ({
        ...prev,
        allPosts: result,
        tredingRecipe: tredingRecipe,
      }));
    }
  }, []);

  const [myUserId, setMyUserId] = useState(route.params.myUserId);
  function renderHeader() {
    return (
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
            Hello Chef's
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
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Profile", {
              myUserId: myUserId,
            })
          }
        >
          <Image
            source={images.profile}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderSearchBar() {
    return (
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
    );
  }

  function renderSeeRecipeCard() {
    return (
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
            You have 12 recepies that you haven't tried yet.
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
    );
  }

  function renderTrendingSection() {
    return (
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
          }}
        >
          Trending Recipe
        </Text>
        <CategoryCard
          key={state.tredingRecipe?._id}
          data={state.tredingRecipe}
          onPress={() =>
            navigation.navigate("Recipe", { recipe: state.tredingRecipe })
          }
        />
      </View>
    );
  }

  function renderCategoryHeader() {
    return (
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
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.orange,
      }}
    >
      <FlatList
        data={dummyData.categories}
        // keyExtractor={(item) => item.id.toString()}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderSearchBar()}
            {renderSeeRecipeCard()}
            {renderTrendingSection()}
            {renderCategoryHeader()}
          </View>
        }
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
      />
    </SafeAreaView>
  );
};

export default Home;
