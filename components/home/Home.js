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
import { useNotification } from "../stores";
import { notiStrings } from "../../configs";

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
  const [noti, setNoti] = useNotification()
  // Được truyền xuống Categories để các button ở categories xử lý với từng gtri isMoneySubtraction, isDebt
  // có 3 function storeTrade, khi sửa 1 func => cần sửa cả 3 func ở : Home, TagChip, LoanItem
  const storeTrade = ({ isMoneySubtraction, isDebt }) =>
    title &&
    cost &&
    AsyncStorage.getItem("0").then((result) => {
 
      const costInNum = cost.replace(/,/g, "")
      setCost(prev => prev.replace(/,/g, ""));
      
      // lây money trong info
      const info = JSON.parse(result);
      let balance = info["money"];
      balance = isMoneySubtraction ? (balance - Number(costInNum)) : (balance + Number(costInNum));
      if (balance < 0) return // trừ âm thì không lưu được giao dịch
      
      // lưu số tiền mới
      AsyncStorage.setItem("0", JSON.stringify({
        ...info,
        money: balance
      }));
     

      // lưu trade mới
      const currentDate = new Date();
      AsyncStorage.setItem(
        JSON.stringify(dataNum),
        JSON.stringify({
          id: dataNum,
          title,
          cost: Number(costInNum),
          isMoneySubtraction,
          isDebt,
          time: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          balance: balance,
          debtID: dataNum, // nếu isDebt = true, debtID dùng để xác định nợ đã trả hay chưa
          // debtID === id => chưa trả, debtID !== id => đã trả và debtID liên kết tới giao dịch trả
        })
      ).then(() => {

        setNoti(prev => [...prev, {content: notiStrings.TRADE_ADD + title}])
        setCost("")
        setTitle("")
        // setDataNum
        setDataNum(prev => prev + 1)
        navigation.navigate("History")
        
        // traceData();
        
      }).catch(error => {
        setNoti(prev => [...prev, {content: notiStrings.ERROR, isError : false}])
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
