import React from "react";
import { SafeAreaView } from "react-native";
import ResultList from "../../components/ResultList";

export default function RestaurantListScreen({ navigation }) {
  return (
    <SafeAreaView>
      <ResultList />
    </SafeAreaView>
  );
}
