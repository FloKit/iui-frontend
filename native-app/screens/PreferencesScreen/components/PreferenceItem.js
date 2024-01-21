import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import FlagIcon from "../../../images/FlagIcon/FlagIcon";

export default function PreferenceItem({
  preference,
  onPress,
  flag,
  selected,
}) {
  return (
    <View style={{ ...styles.container, borderWidth: selected ? 2 : 0 }}>
      <TouchableOpacity onPress={onPress} style={styles.toachableOpacity}>
        <Text style={styles.text}>{preference}</Text>
        <FlagIcon flag={flag} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderColor: "#3F3D56",
    width: "100%",
    // overflow: "hidden",
  },
  toachableOpacity: {
    paddingVertical: 24,
    paddingHorizontal: 24,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3F3D5610",
    borderRadius: 8,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#3F3D56",
  },
});
