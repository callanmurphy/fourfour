import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";

export default function TestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Menu Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
