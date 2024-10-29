import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
  query: string;
}

export default function SearchBar({ onSearch, query }: SearchBarProps) {
  const handleTextChange = (text: string) => {
    onSearch(text); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by city or ZIP code"
        value={query}
        onChangeText={handleTextChange} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
  },
});
