import { Keyboard, StyleSheet, View, ScrollView } from "react-native";
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
import { QuickTags } from "./quicktags-components";
import { TextHelperContainer } from "./TextHelperContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "../stores";
import { addCommasToNum, traceData } from "../../utils";
import { useNavigation } from '@react-navigation/native';

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
  
  const [dataNum, setDataNum] = useDataNum();
  const navigation = useNavigation();
 
  // Được truyền xuống Categories để các button ở categories xử lý với từng gtri isMoneySubtraction, isDebt
  const storeTrade = ({ isMoneySubtraction, isDebt }) =>
    title &&
    cost &&
    AsyncStorage.getItem("0").then((result) => {
      setCost(prev => cost.replace(/,/g, ""));
      let balance = Number(JSON.parse(result));

      balance = isMoneySubtraction ? (balance - Number(cost)) : (balance + Number(cost));

      // lưu số tiền mới
      AsyncStorage.setItem("0", JSON.stringify(balance));
     

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
        setCost("")
        setTitle("")
        setDataNum(prev => prev + 1)
        navigation.navigate("History")
        traceData();
        
      });
    });

 

  
  return (
    <ScrollView style={[styles.home]}>
     
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
      <Categories title={title} cost={cost} handlePress = {storeTrade} />
      <QuickTags />
    </ScrollView>
  );
};
