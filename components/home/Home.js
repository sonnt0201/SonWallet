import { Keyboard, StyleSheet, View } from "react-native";
import {
  DefaultTheme,
  Text,
  TextInput,
  Appbar,
  HelperText,
} from "react-native-paper";
import { useState, useRef, useEffect } from "react";
import { InputField } from "./InputField";
import { Categories } from "./Categories";
import { QuickTags } from "./QuickTags";
import { TextHelperContainer } from "./TextHelperContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "../stores";

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
  const [money, setMoney] = useState("0");
  const inputRef = useRef(null);
  const [balanceVisible, setBalanceVisible] =  useState();
  const [dataNum, setDataNum] = useDataNum();

  const toggleBalanceVisible = () => {
    setBalanceVisible((prev) => !prev);
  };

  
    
  useEffect(() => {
    AsyncStorage.getItem("0").then((result) => result && setMoney(result));
    console.log("changed " + dataNum)
    // getMoneyFromStorage();
  }, [dataNum]);

  useEffect(() => {
    
    // getMoneyFromStorage();
  }, []);

  return (
    <View style={[styles.home]}>
      <Appbar.Header>
     
        <Appbar.Action icon="wallet" />
        <Appbar.Content
          title={money.toString()}
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

      <TextHelperContainer title={title} cost={cost} />
      <Categories title={title} cost={cost} />
      <QuickTags />
    </View>
  );
};
