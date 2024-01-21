import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import HomeScreenIllustration from "../../images/HomeScreenIllustration";
import LoadingPlate from "../../images/LoadingPlate";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";

const API_URL = "http://127.0.0.1:5000";

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/nearby_restaurants");
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      const responseData = await response.json();
      const restaurantList = responseData["results"];

      console.log(restaurantList);

      setRestaurantList(restaurantList);
      setLoading(false);
      navigation.navigate("RestaurantList");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
