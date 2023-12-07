import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import ResultList from "./components/ResultList";
import Header from "./components/Header";
import MapNavigation from "./components/MapNavigation";

export default function App() {
  return (
    <MapNavigation />
  );
}
