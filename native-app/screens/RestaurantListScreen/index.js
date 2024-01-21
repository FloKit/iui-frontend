import React from "react";
import { SafeAreaView } from "react-native";
import ResultList from "../../components/ResultList";

export default function RestaurantListScreen({ restaurantList }) {
  return (
    <SafeAreaView>
      <ResultList restaurantList={restaurantList} />
    </SafeAreaView>
  );
}
