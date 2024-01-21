import React from "react";
import { View, Image } from "react-native";
import Svg, { SvgUri } from "react-native-svg";

export default function FlagIcon({ flag }) {
  const svgUri =
    "https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/debian.svg";
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
      }}
    >
      <Image
        source={{ uri: `https://flagcdn.com/h60/${flag}.png` }}
        style={{ width: 32, height: 32 }}
      />
    </View>
  );
}
