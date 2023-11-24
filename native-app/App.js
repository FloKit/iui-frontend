import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import ResultList from "./components/ResultList";
import Header from "./components/Header";

export default function App() {
  return (
    <SafeAreaView>
      <Header />
      <ResultList />
    </SafeAreaView>
  );
}
