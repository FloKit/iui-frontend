import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RestaurantListScreen from "./screens/RestaurantListScreen";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <HomeScreen
                {...props}
                loading={loading}
                setLoading={setLoading}
                setRestaurantList={setRestaurantList}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="RestaurantList"
            options={{
              title: "Restaurants Close By",
              headerStyle: {
                backgroundColor: "#F9A826",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                fontFamily: "Inter",
              },
            }}
          >
            {(props) => (
              <RestaurantListScreen
                {...props}
                restaurantList={restaurantList}
                setRestaurantList={setRestaurantList}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
