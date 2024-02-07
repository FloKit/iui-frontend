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
  setRestaurantList,
  lat,
  lng,
  preferences,
  API_URL,
}) {
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [noResultsLeft, setNoResultsLeft] = useState(false);

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

  const loadNextPage = async () => {
    setLoading(true);
    const url = `${API_URL}/nearby_restaurants?lat=${lat}&lng=${lng}&page=${page}&tag=${preferences
      .filter((pref) => pref.selected)
      .map((pref) => pref.name.toLowerCase())
      .join(",")}`;
    const responseData = await fetchRestaurantData(url);
    const newRestaurantList = responseData.results.filter((item) => {
      return !restaurantList.some((other) => item.id === other.id);
    });
    setRestaurantList([...restaurantList, ...newRestaurantList]);
    setLoading(false);
    setPage(page + 1);
    if (newRestaurantList.length === 0) {
      setNoResultsLeft(true);
    }
  };

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
