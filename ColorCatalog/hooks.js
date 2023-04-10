import { useState, useEffect } from "react";
import { generate } from "shortid";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useColors = () => {
  const [colors, setColors] = useState([]);

  const loadColors = async () => {
    try {
      const colorData = await AsyncStorage.getItem("@ColorListStore:Colors");
      if (colorData) {
        const colors = JSON.parse(colorData);
        setColors(colors);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (colors.length) return;
    loadColors();
  }, []);

  const saveColors = async (colors) => {
    try {
      await AsyncStorage.setItem(
        "@ColorListStore:Colors",
        JSON.stringify(colors)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveColors();
  }, [colors]);

  const addColor = (color) => {
    const newColor = { id: generate(), color };
    setColors([newColor, ...colors]);
  };
  return { colors, addColor };
};
