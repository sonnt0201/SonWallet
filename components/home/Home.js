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
import { traceData } from "../../utils";
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
  const [balanceVisible, setBalanceVisible] = useState();
  const [dataNum, setDataNum] = useDataNum();

  const toggleBalanceVisible = () => {
    setBalanceVisible((prev) => !prev);
  };

  const storeTrade = ({ isMoneySubtraction, isDebt }) =>
    title &&
    cost &&
    AsyncStorage.getItem("0").then((result) => {
      setCost(prev => cost.replace(/,/g, ""));
      let balance = Number(JSON.parse(result));

      balance = isMoneySubtraction ? balance - Number(cost) : balance + Number(cost);

      // lưu số tiền mới
      AsyncStorage.setItem("0", JSON.stringify(balance));
      setMoney(balance);

      const currentDate = new Date();
      AsyncStorage.setItem(
        JSON.stringify(dataNum),
        JSON.stringify({
          title,
          cost,
          isMoneySubtraction,
          isDebt,
          time: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          balance: balance,
        })
      ).then(() => {
        setDataNum(prev => prev + 1)
        traceData();
        
      });
    });

 

  useEffect(() => {
    AsyncStorage.getItem("0").then(result => {
      setMoney(result)
    })
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
      <Categories title={title} cost={cost} storeTrade = {storeTrade} />
      <QuickTags />
    </View>
  );
};
