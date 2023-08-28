import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
import { InputField } from "./InputField";

const styles = StyleSheet.create({
  home: {
    width: 400,
    flexDirection: "column",
  }
})

export const Home = () => {
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();

  return (
    <View style={[styles.home]}>
      <InputField/>
    </View>
  );
};
