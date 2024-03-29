import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
  Platform,
  Image
} from "react-native";
import { Skeleton } from "native-base";

export default function RestaurantTile({
  type,
  name,
  stars,
  distance,
  imageSrc,
  id,
  address,
}) {
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState(true);

  const API_URL =
    Platform.OS === "android"
      ? "http://10.0.2.2:5000"
      : "http://127.0.0.1:5000";

  const fetchSummary = async () => {
    fetch(`${API_URL}/summary/${id}`)
      .then(async (res) => {
        const responseData = await res.json();
        const summary = responseData["summary"];

        setReview(summary);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePress = () => {
    // open the following url: https://www.google.de/maps/dir/48.1820856,11.47598/Augsburg

    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}&travelmode=walking`;
    Linking.openURL(url);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <View style={styles.container}>
      <Image src={imageSrc} style={styles.image} />
      <View style={styles.textWrapper}>
        <View>
          <View style={styles.headlineWrapper}>
            <Text style={styles.headline}>{name}</Text>
            <Text style={styles.stars}>{stars}</Text>
          </View>
          {loading ? (
            <View style={{ paddingVertical: 24 }}>
              <Skeleton height={3} width={"100%"} my={1} rounded="md" />
              <Skeleton height={3} width={"100%"} my={1} rounded="md" />
              <Skeleton height={3} width={"100%"} my={1} rounded="md" />
              <Skeleton height={3} width={"70%"} my={1} rounded="md" />
            </View>
          ) : (
            <Text style={styles.reviewText}>{review}</Text>
          )}
        </View>
        <View style={styles.footerWrapper}>
          <Text style={styles.distance}>{distance} meters away</Text>
          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={handlePress}
          >
            <Text style={styles.navigationText}>Navigate Me</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "90%",
    borderColor: "#3F3D56",
    borderWidth: Platform.OS === "android" ? 1 : 0,
    borderRadius: 24,
    shadowColor: "#292929",
    shadowOpacity: 0.5,
    shadowRadius: 8,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    display: "flex",
    justifyContent: "space-between",
  },
  headlineWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headline: {
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#3F3D56",
    fontSize: 20,
  },

  restaurantType: {
    fontSize: 14,
    color: "#3F3D5675",
    fontWeight: "300",
  },
  stars: {
    fontSize: 14,
    color: "#3F3D5675",
    fontWeight: "300",
  },
  reviewText: {
    fontSize: 14,
    color: "#3F3D56",
    textAlign: "left",
    marginTop: 12,
  },
  footerWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  distance: {
    fontSize: 11,
    color: "#3F3D5675",
  },
  navigationText: {
    color: "#FFF",
    fontSize: 14,
  },
  touchableOpacity: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F9A826",
    borderRadius: 12,
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
  image: {
    height: 100,
    width: "100%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  textWrapper: { paddingTop: 12, paddingBottom: 24, paddingHorizontal: 24 },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3F3D5650",
    height: 100,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    width: "100%",
  },
});
