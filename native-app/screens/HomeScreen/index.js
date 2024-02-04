import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import HomeScreenIllustration from "../../images/HomeScreenIllustration";
import LoadingPlate from "../../images/LoadingPlate";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import Geolocation from "@react-native-community/geolocation";
import RNSecureStorage, { ACCESSIBLE } from "rn-secure-storage";

const API_URL =
  Platform.OS === "android" ? "http://10.0.2.2:5000" : "http://127.0.0.1:5000";

export default function HomeScreen({
  loading,
  setLoading,
  navigation,
  setRestaurantList,
}) {
  spinValue = new Animated.Value(0);
  fadeOutValue = new Animated.Value(1);

  const ILLUSTRATION_SIZE = Dimensions.get("window").height * 0.25;

  const insets = useSafeAreaInsets();

  const spinAnimation = Animated.loop(
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.easeInOut,
      useNativeDriver: true,
    })
  );

  const fadeOutAnimation = Animated.timing(this.fadeOutValue, {
    toValue: 0,
    duration: 200,
    easing: Easing.linear,
    useNativeDriver: true,
  });

  const spin = this.spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const translateYText1 = this.fadeOutValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 0],
  });

  const translateYText2 = this.fadeOutValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -300],
  });

  const startAnimation = () => {
    spinAnimation.start();
    fadeOutAnimation.start();
  };

  const stopAnimation = () => {
    spinAnimation.stop();
    this.fadeOutValue.setValue(1);
    this.spinValue.setValue(0);
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

  const setAndNavigate = (restaurantList) => {
    setRestaurantList(restaurantList);
    setLoading(false);
    navigation.navigate("RestaurantList");
  };

  const getRestaurantList = async (lat, lon) => {
    try {
      loadPreferences(async (res) => {
        let preferences = "";

        if (!res || res === "[]" || res === null || res === undefined) {
          const url = `${API_URL}/nearby_restaurants?lat=${lat}&lng=${lon}&page=1`;
          const responseData = await fetchRestaurantData(url);
          const restaurantList = responseData.results;
          setAndNavigate(restaurantList);
        } else {
          preferences = JSON.parse(res)
            .filter((pref) => pref.selected)
            .map((pref) => pref.name.toLowerCase())
            .join(",");
        }

        const url = `${API_URL}/nearby_restaurants?lat=${lat}&lng=${lon}&tag=${preferences}&page=1`;
        const responseData = await fetchRestaurantData(url);
        const restaurantList = responseData.results;
        setAndNavigate(restaurantList);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getLocatiionAndFetchData = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords;
        getRestaurantList(latitude, longitude);
      },
      (error) => {
        const defaultLat = 48.137154;
        const defaultLon = 11.576124;
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

  const fetchData = () => {
    setLoading(true);
    getLocatiionAndFetchData();
  };

  useEffect(() => {
    if (loading) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [loading]);

  return (
    <SafeAreaView>
      <Animated.View
        style={{
          ...styles.homeScreenIllustration,
          marginTop: insets.top,
          marginBottom: insets.bottom,
        }}
      >
        <HomeScreenIllustration height={ILLUSTRATION_SIZE} />
      </Animated.View>
      <View style={styles.wrapper}>
        <Animated.Text
          style={{
            ...styles.hungryText,
            transform: [{ translateY: translateYText1 }],
          }}
        >
          Hungry?
        </Animated.Text>
        <Animated.Text
          style={{
            ...styles.loadingText,
            transform: [{ translateY: translateYText2 }],
          }}
        >
          Finding optimal restaurants for you...
        </Animated.Text>
        <View
          style={{
            ...styles.textWrapper,
            height: ILLUSTRATION_SIZE,
          }}
        ></View>
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
          }}
        >
          <LoadingPlate size={ILLUSTRATION_SIZE} />
        </Animated.View>
        <View
          style={{
            height: ILLUSTRATION_SIZE,
            ...styles.bottomWrapper,
          }}
        >
          <TouchableOpacity
            onPress={fetchData}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#F9A82650" : "#F9A826",
            }}
            disabled={loading}
          >
            {loading ? (
              <Text style={styles.buttonText}>Loading...</Text>
            ) : (
              <Text style={styles.buttonText}>Find a Restaurant</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Preferences");
            }}
            style={{
              ...styles.button,
              backgroundColor: "white",
              borderColor: loading ? "#F9A82650" : "#F9A826",
              borderWidth: 1,
              marginTop: 20,
            }}
            disabled={loading}
          >
            <Text
              style={{
                ...styles.buttonText,
                color: loading ? "#F9A82650" : "#F9A826",
              }}
            >
              Edit your preferences
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeScreenIllustration: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
  },
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  hungryText: {
    color: "#3F3D56",
    fontWeight: "bold",
    fontSize: 30,
    position: "absolute",
    top: "10%",
  },
  loadingText: {
    color: "#3F3D56",
    fontWeight: "bold",
    fontSize: 30,
    position: "absolute",
    textAlign: "center",
    top: "10%",
    paddingHorizontal: 20,
  },
  buttonText: { color: "#ffffff", fontWeight: "bold", fontSize: 18 },
  bottomWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    height: 50,
    borderRadius: 16,
    width: "70%",
    alignItems: "center",
  },
});
