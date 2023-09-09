import { useState } from "react";
import { IconButton, List, Surface, Text } from "react-native-paper";
import { addCommasToNum, formatDate } from "../../utils";
import { View } from "react-native";
import { useDataNum } from "../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { traceData } from "../../utils";
export const LoanItem = ({ item }) => {
  const [paidConfirm, setPaidConfirm] = useState(false); // boolean

  // if (!paidConfirm)
  return (<View>
    <Surface elevation={5}>
      <List.Item
        onPress={() => {
          if (item.id === item.debtID) setPaidConfirm((prev) => !prev);
        }}
        title={item.title}
        description={formatDate(new Date(item.time))}
        right={(props) => (
          <View>
            <Text>
              {(item.isMoneySubtraction ? "-" : "+") +
                addCommasToNum(item.cost) +
                " Đ"}
            </Text>
            <Text>{item.debtID === item.id ? "Chưa trả" : "Đã trả"}</Text>
          </View>
        )}
      />
    </Surface>

    { paidConfirm && <PaidConfirm item={item} setPaidConfirm={setPaidConfirm} />}
  </View>);
};

const PaidConfirm = ({ item, setPaidConfirm }) => {
  const [dataNum, setDataNum] = useDataNum();
  const navigation = useNavigation();

 
  // có 3 function storeTrade, khi sửa 1 func => cần sửa cả 3 func ở : Home, TagChip, LoanItem
  // phải được gọi sau changeOldTrade
  const storePaid = () => {
    
    AsyncStorage.setItem(JSON.stringify(item.id), JSON.stringify({
      ...item,
      title: item.title + " (Đã trả) ",
      debtID: dataNum,
    })) .then(() => AsyncStorage.getItem("0").then((result) => {
      if (item.id !== item.debtID) return
      const cost = item.cost;
      // lây money trong info
      const info = JSON.parse(result);
      let balance = info["money"];
      const isMoneySubtraction = !item.isMoneySubtraction;
      balance = isMoneySubtraction
        ? balance - Number(cost)
        : balance + Number(cost);
      if (balance < 0) return; // trừ âm thì không lưu được giao dịch

      // lưu số tiền mới
      AsyncStorage.setItem(
        "0",
        JSON.stringify({
          ...info,
          money: balance,
        })
      );

      // lưu trade mới
      const currentDate = new Date();
      AsyncStorage.setItem(
        JSON.stringify(dataNum),
        JSON.stringify({
          id: dataNum,
          title: item.title + " (Trả nợ)",
          cost: item.cost,
          isMoneySubtraction: isMoneySubtraction,
          isDebt: false,
          time: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          balance: balance,
          debtID: item.id, // nếu isDebt = true, debtID dùng để xác định nợ đã trả hay chưa
          // debtID === id => chưa trả, debtID !== id => đã trả và debtID liên kết tới giao dịch trả
        })
      ).then(() => {
        setPaidConfirm(false);
        // setDataNum
        setDataNum((prev) => prev + 1);
        navigation.navigate("History");

        traceData();
      });
    }))

    
  }
    

 

  return (
    <Surface elevation={5}>
      <List.Item
        onPress={() => {}}
        title={"Xác nhận trả nợ"}
        description={item.title}
        right={(props) => (
          <IconButton icon={"checkbox-marked-circle"} onPress={storePaid} />
        )}
        left={() => (
          <IconButton
            icon={"close-thick"}
            onPress={() => {
              setPaidConfirm((prev) => !prev);
            }}
          />
        )}
      />
    </Surface>
  );
};
