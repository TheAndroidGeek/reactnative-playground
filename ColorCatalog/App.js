import { StyleSheet, View, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import ColorButton from "./components/ColorButton";
import defaultColors from "./data/defaultColors.json";
import ColorForm from "./components/ColorForm";
import { generate } from "shortid";

const useColors = () => {
  const [colors, setColors] = useState([]);
  const addColor = (color) => {
    const newColor = { id: generate(), color };
    setColors([newColor, ...colors]);
  };
  return { colors, addColor };
};

export default function App() {
  const [backgroundColor, setBackgroundColor] = useState("blue");
  const { colors, addColor } = useColors();
  return (
    <>
      <ColorForm onNewColor={addColor} />
      <FlatList
        data={colors}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
});
