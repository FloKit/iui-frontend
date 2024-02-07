import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import RestaurantListScreen from "./screens/RestaurantListScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import HomeScreen from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import defaultPreferences from "./constants/defaultPreferences";
import { request, PERMISSIONS } from "react-native-permissions";

const API_URL =
  Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://127.0.0.1:5000";

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
  const [preferences, setPreferences] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

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

  useEffect(() => {
    loadPreferences((res) => {
      if (res === "" || res === null || res === undefined || res === "[]") {
        setPreferences(defaultPreferences);
      } else {
        setPreferences(JSON.parse(res));
      }
    });

    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then((result) => {
      console.log(result);
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
                lat={lat}
                lng={lng}
                setLat={setLat}
                setLng={setLng}
                preferences={preferences}
                API_URL={API_URL}
                loadPreferences={loadPreferences}
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
                lat={lat}
                lng={lng}
                preferences={preferences}
                API_URL={API_URL}
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
