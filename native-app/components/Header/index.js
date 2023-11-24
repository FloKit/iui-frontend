import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        width: "100%",
        height: 75,
        backgroundColor: "#F9A826",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 24, color: "#fff" }}>Restaurants Close By</Text>
    </View>
  );
}
