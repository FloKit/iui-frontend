import React from "react";
import { Text, View } from "react-native";

export default function Header() {
  return (
    <View
      style={{
        width: "100%",
        height: 75,
        backgroundColor: "#F9A826",
        padding: 24,
        shadowColor: "#292929",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
          height: 8,
          width: 0,
        },
        zIndex: 10,
      }}
    >
      <Text style={{ fontSize: 24, color: "#fff" }}>Restaurants Close By</Text>
    </View>
  );
}
