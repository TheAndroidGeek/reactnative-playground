import { StyleSheet, View, FlatList } from "react-native";
import React, { useState } from "react";
import ColorButton from "./components/ColorButton";
import defaultColors from "./data/defaultColors.json";

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState("blue");
  return (
    <FlatList
      data={defaultColors}
      style={[styles.container, { backgroundColor }]}
      renderItem={({ item }) => {
        return (
          <ColorButton
            key={item.id}
            backgroundColor={item.color}
            onPress={setBackgroundColor}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
});
