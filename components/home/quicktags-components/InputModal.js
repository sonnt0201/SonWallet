import { Modal, Text, DefaultTheme, Portal } from "react-native-paper";
import { View } from "react-native";
import { InputField } from "../InputField";
import { Categories } from "../Categories";
import { useState } from "react";

// addTag =  ({ title, cost, isSubtraction }) =>
export const InputModal = ({ visible, setVisible,  setTags, tags }) => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");

  // Thêm 1 tag ( chưa phải thêm giao dịch)
  const addTag = ({isMoneySubtraction, isDebt}) => {
    
    setTags(prev => [...prev, {id: tags.length, title, cost, isMoneySubtraction}])
    setTitle("")
    setCost("")
    setVisible(false)
  }

  return (
    <View>
      <InputField
        labelForTextInput={"Thêm TAG mới"}
        title={title}
        setTitle={setTitle}
        cost={cost}
        setCost={setCost}
      />
      <Categories shortened handlePress={addTag}/>
    </View>
  );
};
