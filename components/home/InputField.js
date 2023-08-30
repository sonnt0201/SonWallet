import { View, StyleSheet } from "react-native";
import { DefaultTheme, TextInput, HelperText } from "react-native-paper";
import { Text } from "react-native-paper";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 2,
    flexDirection: "row",
    // height: 80,
  },
  inputContainer: {
    // for all container that contain an input field
    justifyContent: "space-between",
    // borderColor: "red",
    // borderWidth: 1,
    marginHorizontal: 2,
  },
  titleContainer: {
    flex: 5,
  },

  costContainer: {
    flex: 3,
  },

  kdongtag: {
    // color: DefaultTheme.colors.primary,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 1,
  },
});

export const InputField = ({
  
  inputRef,
  title,
  setTitle,
  cost,
  setCost,
}) => {

 

  return (
    <View style={[styles.container]}>
      <View
        key={"title-container"}
        style={[styles.inputContainer, styles.titleContainer]}
      >
        <TextInput
          autoComplete="off"
          maxLength={40}
          label={"Tên giao dịch"}
          autoFocus={true}
          ref={inputRef}
          value={title}
          multiline
          onChangeText={text => {
            setTitle(text)
            console.log(text)
          }}
        />
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
          value={cost}
          onChangeText={num => {
            setCost(num)
            console.log(num)
          }}
        />
      </View>
      <View key={"kdong-tag-container"} style={[styles.kdongtag]}>
        <Text>,000đ</Text>
      </View>

      
    </View>
  );
};
