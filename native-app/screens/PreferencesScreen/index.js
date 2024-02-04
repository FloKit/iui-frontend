import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import PreferenceItem from "./components/PreferenceItem";

export default function PreferencesScreen({ preferences, setPreferences }) {
  const numSelectedPreferences = preferences.filter(
    (preference) => preference.selected
  ).length;
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <PreferenceItem
        preference="No Preferences"
        flag="cross"
        selected={false}
        onPress={() => {
          setPreferences(
            preferences.map((preference) => {
              return { ...preference, selected: false };
            })
          );
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, height: 1, backgroundColor: "#3F3D5650" }} />
        <View>
          <Text style={{ width: 250, textAlign: "center", color: "#3F3D5680" }}>
            {`Select up to three preferences (${numSelectedPreferences})`}
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "#3F3D5650" }} />
      </View>
      {preferences.map((preference) => (
        <PreferenceItem
          key={preference.name}
          preference={preference.name}
          flag={preference.flag}
          selected={preference.selected}
          onPress={() => {
            if (!preference.selected && numSelectedPreferences >= 3) {
              return;
            }
            setPreferences(
              preferences.map((otherPreference) => {
                if (otherPreference.name === preference.name) {
                  return { ...preference, selected: !preference.selected };
                }
                return otherPreference;
              })
            );
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 24,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 24,
    paddingVertical: 24,
    paddingBottom: 100,
  },
});
