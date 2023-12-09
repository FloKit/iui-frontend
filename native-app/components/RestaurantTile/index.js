import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function RestaurantTile({
  review,
  type,
  name,
  stars,
  distance,
  imageSrc,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image src={imageSrc} style={styles.image} />
      <View style={styles.textWrapper}>
        <View>
          <View style={styles.headlineWrapper}>
            <Text style={styles.headline}>{name}</Text>
            <Text style={styles.stars}>{stars}</Text>
          </View>
          <Text style={styles.restaurantType}>{type}</Text>
          <Text style={styles.reviewText}>{review}</Text>
        </View>
        <View style={styles.footerWrapper}>
          <Text style={styles.distance}>{distance}</Text>
          <TouchableOpacity style={styles.touchableOpacity} 
                            onPress={
                              () => navigation.navigate('MapNavigation')
                            }>
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
});
