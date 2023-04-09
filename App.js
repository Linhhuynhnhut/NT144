import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import IntroScreen from "./src/screens/IntroScreen";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const homeName = "Home";
const searchName = "Search";
const profileName = "Profile";

const AppStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Introduction" component={IntroScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </>
  );
};

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={AppStack}
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
              //console.log("rn>>>", rn, "    route.name>>>>", route.name);
              if (rn === "homeName") {
                iconName = "home";
              } else if (rn === "searchName") {
                iconName = focused ? "list" : "list-outline";
              } else if (rn === "profileName") {
                iconName = focused ? "settings" : "settings-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="appStack"
            component={AppStack}
            options={({ route }) => ({
              tabBarStyle: {
                display: getTabBarVisibility(route),
              },
              tabBarButton: () => null,
              tabBarVisible: false,
            })}
          />
          <Tab.Screen name="homeName" component={HomeScreen} />
          <Tab.Screen name="searchName" component={SearchScreen} />
          <Tab.Screen name="profileName" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({});

const getTabBarVisibility = (route) => {
  console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  console.log(routeName);

  if (
    routeName == "Introduction" ||
    routeName == "Login" ||
    routeName == "Register"
  ) {
    return "none";
  }
  return "flex";
};
