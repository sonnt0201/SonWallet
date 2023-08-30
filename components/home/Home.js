import { Keyboard, StyleSheet, View } from "react-native";
import {
  DefaultTheme,
  Text,
  TextInput,
  Appbar,
  HelperText,
} from "react-native-paper";
import { useState, useRef } from "react";
import { InputField } from "./InputField";
import { withTheme } from "react-native-paper";
import { Categories } from "./Categories";
import { QuickTags } from "./QuickTags";
import { globalTheme } from "../../App";
import { TextHelperContainer } from "./TextHelperContainer";

const styles = StyleSheet.create({
  home: {
    paddingBottom: 0,

    backgroundColor: DefaultTheme.colors.background,
    height: "100%",
  },

  guide: {
    alignContent: "center",

    paddingHorizontal: 20,
  },
});

export const Home = () => {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("");
  const inputRef = useRef(null);
  const [balanceVisible, setBalanceVisible] = useState(false);
 

  toggleBalanceVisible = () => {
    setBalanceVisible((prev) => !prev);
  };
  return (
    <View style={[styles.home]}>
      <Appbar.Header>
        {/* <Appbar.BackAction  /> */}
        <Appbar.Action icon="wallet" />
        <Appbar.Content
          title={balanceVisible ? "Số dư" : "Hiện số dư"}
          onPress={toggleBalanceVisible}
        />
        <Appbar.Action
          icon={balanceVisible ? "eye" : "eye-off"}
          onPress={toggleBalanceVisible}
        />
      </Appbar.Header>
      <View style={[styles.guide]}>
        <Text
          onPress={() => {
            // inputRef.current.
            inputRef.current.blur();
            inputRef.current.focus();
          }}
        >
          Thêm một giao dịch
        </Text>
      </View>

      <InputField
        inputRef={inputRef}
        title={title}
        setTitle={setTitle}
        cost={cost}
        setCost={setCost}
      />

      <TextHelperContainer title={title} cost={cost}/>
      <Categories />
      <QuickTags />
    </View>
  );
};
