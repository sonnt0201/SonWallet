import { Modal, Text, DefaultTheme, Portal } from "react-native-paper";
import { View } from "react-native";
import { InputField } from "../InputField";
import { Categories } from "../Categories";
export const InputModal = ({ visible, setVisible,  }) => {
  return (
    <View>
     
        <InputField labelForTextInput={"Tên tag"} />
        <Categories shortened ></Categories>
    </View>
  );
};
