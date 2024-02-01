import React from "react";
import { View, Image } from "react-native";

export default function CrossIcon() {
  return (
    <View
      style={{
        height: 32,
        width: 32,
        borderRadius: 24,
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Flat_cross_icon.svg/512px-Flat_cross_icon.svg.png",
        }}
        style={{ width: 32, height: 32 }}
      />
    </View>
  );
}
