import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import PreferenceItem from "./components/PreferenceItem";

preferences = [
  {
    name: "American",
    selected: true,
    flag: "us",
  },
  {
    name: "British",
    selected: false,
    flag: "gb",
  },
  {
    name: "Chinese",
    selected: true,
    flag: "cn",
  },
  {
    name: "Egyptian",
    selected: true,
    flag: "eg",
  },
  {
    name: "French",
    selected: false,
    flag: "fr",
  },
  {
    name: "German",
    selected: false,
    flag: "de",
  },
  {
    name: "Greek",
    selected: true,
    flag: "gr",
  },
  {
    name: "Indian",
    selected: true,
    flag: "in",
  },
  {
    name: "Italian",
    selected: true,
    flag: "it",
  },
  {
    name: "Japanese",
    selected: true,
    flag: "jp",
  },
  {
    name: "Lebanese",
    selected: true,
    flag: "lb",
  },
  {
    name: "Mexican",
    selected: false,
    flag: "mx",
  },
  {
    name: "Spanish",
    selected: false,
    flag: "es",
  },
  {
    name: "Thai",
    selected: true,
    flag: "th",
  },
  {
    name: "Turkish",
    selected: true,
    flag: "tr",
  },
  {
    name: "Vietnamese",
    selected: false,
    flag: "vn",
  },
];

export default function PreferencesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      {preferences.map((preference) => (
        <PreferenceItem
          key={preference.name}
          preference={preference.name}
          flag={preference.flag}
          selected={preference.selected}
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
