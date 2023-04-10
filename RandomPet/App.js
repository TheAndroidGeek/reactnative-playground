import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState();

  const loadPet = async () => {
    setLoading(true);
    const res = await fetch("http://pet-library.moonhighway.com/api/randomPet");
    const data = await res.json();
    await Image.prefetch(data.photo.full);
    setPet(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPet();
  }, []);

  if (!pet) return <ActivityIndicator size="large" />;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadPet} />
        }
      >
        <Image style={styles.pic} source={{ uri: pet.photo.full }} />
        <Text style={styles.paragraph}>
          {pet.name} - {pet.category}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
    justifyContent: "center",
    paddingTop: 30,
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  pic: {
    height: 500,
    width: 500,
  },
});
