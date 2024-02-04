import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RestaurantTile from "../RestaurantTile";

export default function ResultList({
  restaurantList,
  loadNextPage,
}) {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResultsLeft, setNoResultsLeft] = useState(false);
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
      {restaurantList && restaurantList.length === 0 && (
        <Text>No restaurants found</Text>
      )}
      {restaurantList && restaurantList.length > 0 && !noResultsLeft && (
        <TouchableOpacity
          style={{
            backgroundColor: "#F9A826",
            width: 200,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 12,
            shadowOpacity: 0.2,
            shadowRadius: 2,
            shadowOffset: {
              height: 2,
              width: 1,
            },
          }}
          onPress={() => {
            loadNextPage(page, setLoading, setPage, setNoResultsLeft);
          }}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" animating={true} />
          ) : (
            <Text
              style={{
                color: "#FFF",
                paddingHorizontal: 24,
                fontWeight: "bold",
              }}
            >
              Load More
            </Text>
          )}
        </TouchableOpacity>
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
