import React from "react";
import { View, Image } from "react-native";
import Svg, { SvgUri } from "react-native-svg";

export default function VegetarianIcon() {
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
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Vegetarian-mark.svg/225px-Vegetarian-mark.svg.png",
        }}
        style={{ width: 24, height: 24 }}
      />
    </View>
  );
}
