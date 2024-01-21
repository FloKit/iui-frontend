import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import RestaurantTile from "../RestaurantTile";

export default function ResultList({ restaurantList }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {restaurantList ? (
        restaurantList.map((restaurant) => (
          <RestaurantTile
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            stars={restaurant.rating}
            distance={restaurant.distance}
            imageSrc={restaurant.image_url}
            address={restaurant.address}
          />
        ))
      ) : (
        <Text>No restaurants found</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 24,
    paddingVertical: 24,
    paddingBottom: 100,
  },
});
