import { View, StyleSheet } from "react-native";
import { DefaultTheme, TextInput } from "react-native-paper";
import { Text } from "react-native-paper";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    height: 80,
  },
  inputContainer: {
    // for all container that contain an input field
    justifyContent: "space-between",
    // borderColor: "red",
    // borderWidth: 1,
    margin: 2,
  },
  titleContainer: {
    flex: 4,
  },

  costContainer: {
    flex: 2,
  },

  kdongtag: {
    // color: DefaultTheme.colors.primary,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 1,
  },
});

export const InputField = () => {
  return (
    <View style={[styles.container]}>
      
      <View
        key={"title-container"}
        style={[styles.inputContainer, styles.titleContainer]}
      >
        <TextInput autoComplete="off" maxLength={40} label={"Nội dung"} />
      </View>

      <View
        key={"cost-container"}
        style={[styles.inputContainer, styles.costContainer]}
      >
        <TextInput
          maxLength={40}
          autoComplete="off"
          placeholder="Số tiền"
          keyboardType="numeric"
        />
      </View>
      <View key={"kdong-tag-container"} style={[styles.kdongtag]} >
        <Text >.000đ</Text>
      </View>
    </View>
  );
};
