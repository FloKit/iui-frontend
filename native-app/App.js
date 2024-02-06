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
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";
import defaultPreferences from "./constants/defaultPreferences";
import Geolocation from "@react-native-community/geolocation";

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

  const fetchRestaurantData = async (url) => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    return response.json();
  };

  const getRestaurantList = async (lat, lon, onLoad) => {
    try {
      loadPreferences(async (res) => {
        let preferences = "";

        if (!res || res === "[]" || res === null || res === undefined) {
          const url = `${API_URL}/nearby_restaurants?lat=${lat}&lng=${lon}&page=1`;
          const responseData = await fetchRestaurantData(url);
          const restaurantList = responseData.results;
          setRestaurantList(restaurantList);
          setLoading(false);
          onLoad();
        } else {
          preferences = JSON.parse(res)
            .filter((pref) => pref.selected)
            .map((pref) => pref.name.toLowerCase())
            .join(",");
        }

        const url = `${API_URL}/nearby_restaurants?lat=${lat}&lng=${lon}&tag=${preferences}&page=1`;
        const responseData = await fetchRestaurantData(url);
        const restaurantList = responseData.results;
        setRestaurantList(restaurantList);
        setLoading(false);
        onLoad();
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLocationAndFetchData = (onLoad) => {
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords;
        setLat(latitude);
        setLng(longitude);
        getRestaurantList(latitude, longitude, onLoad);
      },
      (error) => {
        const defaultLat = 48.137154;
        const defaultLon = 11.576124;
        setLat(defaultLat);
        setLng(defaultLon);
        console.log(
          "Error getting location (this library is unfortunately not working properly on Android)"
        );
        console.log(
          "Therefore we will contunue with the default location (City Center of Munich)"
        );
        console.log(defaultLat, defaultLon);
        getRestaurantList(defaultLat, defaultLon);
      },
      (options = {
        enableHighAccuracy: false,
        timeout: 5000,
      })
    );
  };

  const loadNextPage = async (page, setLoading, setPage, setNoResultsLeft) => {
    setLoading(true);
    const url = `${API_URL}/nearby_restaurants?lat=${lat}&lng=${lng}&page=${page}&tag=${preferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.name.toLowerCase())
      .join(",")}`;
    const responseData = await fetchRestaurantData(url);
    const newRestaurantList = responseData.results;
    setRestaurantList([...restaurantList, ...newRestaurantList]);
    setLoading(false);
    setPage(page + 1);
    if (newRestaurantList.length === 0) {
      setNoResultsLeft(true);
    }
  };

  useEffect(() => {
    loadPreferences((res) => {
      if (res === "" || res === null || res === undefined || res === "[]") {
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
                getLocationAndFetchData={getLocationAndFetchData}
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
                loadNextPage={loadNextPage}
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
