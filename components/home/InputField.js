import { View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
     paddingHorizontal: 10,
    // paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
  },
  inputContainer: {
    // for all container that contain an input field
    justifyContent: "space-between",
    borderColor: "red",
    borderWidth: 1,
    margin: 2,
  },
  titleContainer: {
    flex: 4,
  },

  costContainer: {
    flex: 2,
  },

  kdongtag: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 1,
  }
});

export const InputField = () => {
 

  return (
    <View style={[styles.container]}>
     
      <View
        key={"title-container"}
        style={[styles.inputContainer, styles.titleContainer]}
      >
        <TextInput
          editable
          multiline
          numberOfLines={1}
          maxLength={40}
          style={{ padding: 10 }}
          placeholder="Nhập nội dung"
        />
      </View>

      <View
        key={"cost-container"}
        style={[styles.inputContainer, styles.costContainer]}
      >
        <TextInput
          editable
          multiline
          numberOfLines={1}
          maxLength={40}
          style={{ padding: 10 }}
          placeholder="Số tiền"
          keyboardType="numeric"
        />
     
      </View>
      <View key={"kdong-tag-container"} style = {[styles.kdongtag]}>
        <Text>
            .000đ
        </Text>
      </View>
    </View>
  );
};
