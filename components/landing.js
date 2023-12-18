import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export function Landing() {
  return (
    <View style={style.container}>
      <Image source={require("../assets/icon/icon.png")} style={style.icon} />
      <Text style={style.text}>FallieCatch</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    background: "white",
  },
  icon: {
    width: 200,
    height: 200,
  },
  text: {
    color: "white",
  },
});
