import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RestaurantListScreen from "./screens/RestaurantListScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import HomeScreen from "./screens/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import defaultPreferences from "./constants/defaultPreferences";

const Stack = createNativeStackNavigator();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#fff",
  },
};

const loadPreferences = (onLoad) => {
  RNSecureStorage.getItem("preferences")
    .then((res) => {
      onLoad(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const savePreferences = (preferences) => {
  RNSecureStorage.setItem("preferences", JSON.stringify(preferences), {
    accessible: ACCESSIBLE.ALWAYS,
  })
    .then((res) => {
      console.log("Preferences saved successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    loadPreferences((res) => {
      if (res === "") {
        setPreferences(defaultPreferences);
      } else {
        setPreferences(JSON.parse(res));
      }
    });
  }, []);

  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

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
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Preferences"
            options={{
              title: "Your Preferences",
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
              <PreferencesScreen
                {...props}
                preferences={preferences}
                setPreferences={setPreferences}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
