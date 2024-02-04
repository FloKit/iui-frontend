import React from "react";
import { SafeAreaView } from "react-native";
import ResultList from "../../components/ResultList";

export default function RestaurantListScreen({
  restaurantList,
  setRestaurantList,
  loadNextPage,
}) {
  return (
    <SafeAreaView>
      <ResultList
        restaurantList={restaurantList}
        setRestaurantList={setRestaurantList}
        loadNextPage={loadNextPage}
      />
    </SafeAreaView>
  );
}
