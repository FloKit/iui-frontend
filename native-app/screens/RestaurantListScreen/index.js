import React from "react";
import { SafeAreaView } from "react-native";
import ResultList from "../../components/ResultList";

export default function RestaurantListScreen({
  restaurantList,
  setRestaurantList,
  lat,
  lng,
  preferences,
  API_URL,
}) {
  return (
    <SafeAreaView>
      <ResultList
        restaurantList={restaurantList}
        setRestaurantList={setRestaurantList}
        lat={lat}
        lng={lng}
        preferences={preferences}
        API_URL={API_URL}
      />
    </SafeAreaView>
  );
}
