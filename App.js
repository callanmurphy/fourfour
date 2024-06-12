import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import TestScreen from "./screens/TestScreen";
import LibraryScreen from "./screens/LibraryScreen";
import SongScreen from "./screens/SongScreen";
import { COLOURS } from "./config";

function LogoTitle() {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require("./assets/icon.png")}
    />
  );
}

const LibraryStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOURS.theme,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerBackTitleVisible: false, // Hide the back title if needed
        headerTitleAlign: 'center', // Center align the title
      }}
    >
      <LibraryStack.Screen
        name="LibraryHome"
        component={LibraryScreen}
        options={{ title: 'Library' }}
      />
      <LibraryStack.Screen
        name="Song"
        component={SongScreen}
        options={({ route }) => ({
          title: route.params.song.title,
        })}
      />
    </LibraryStack.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Library") {
              iconName = focused ? "book" : "book-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLOURS.theme,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Search"
          component={TestScreen}
          // options={{
          //   title: "Events",
          //   headerTitle: (props) => <LogoTitle {...props} />,
          // }}
        />
        <Tab.Screen name="Library" component={LibraryStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
