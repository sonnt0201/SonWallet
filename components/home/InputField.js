import { View, StyleSheet } from "react-native";
import {  TextInput, HelperText, Button } from "react-native-paper";
import { Text } from "react-native-paper";
import { globalTheme } from "../../configs";
import { themeColor } from "../../constants";
import { useRef } from "react";

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
    color: globalTheme.colors.primary,
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 1,
    borderWidth: 2,
    borderColor: themeColor,
    borderRadius: 20,
  },
});

export const InputField = ({
  
  inputRef,
  title,
  setTitle,
  cost,
  setCost,
  labelForTextInput
}) => {

  const costInputRef = useRef(null)

  const formatCostValue = (value) => {
    // Remove existing commas and non-numeric characters
    const cleanedValue = value.replace(/[^\d]/g, "");
    // Add commas every three digits from the right
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return formattedValue;
  };

  // Function to handle cost input value changes
  const handleCostChange = (value) => {
    // Format the input value and update the state
    setCost(formatCostValue(value));
  };

  return (
    <View style={[styles.container]}>
      <View
        key={"title-container"}
        style={[styles.inputContainer, styles.titleContainer]}
      >
        <TextInput
          autoComplete="off"
          maxLength={40}
          label={labelForTextInput? labelForTextInput: "Tên giao dịch"}
          autoFocus={true}
          ref={inputRef}
          value={title}
          multiline={false}
        
          returnKeyType="next"
          onSubmitEditing={() => costInputRef.current.focus()}
          onChangeText={text => {
            setTitle(text)
            // console.log(text)
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
          onChangeText={handleCostChange}
          ref={costInputRef}
        />
      </View>
      <View key={"kdong-tag-container"}
       style={[styles.kdongtag]} 
       onTouchEnd={() => {
        setCost(prev => (prev + ",000"))
       }}
       >
        <Text>?000</Text>
      </View>

      
    </View>
  );
};
