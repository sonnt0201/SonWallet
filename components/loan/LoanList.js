import { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoanItem } from "./LoanItem";
import { List, Text } from "react-native-paper";
import { useDataNum } from "../stores";

export const LoanList = () => {
  const [debtTrades, setDebtTrades] = useState([]);
  const [dataNum, ] = useDataNum()
  useEffect(() => {
    // Retrieve data from AsyncStorage
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiGet(keys))
      .then((data) => {
        const parsedData = data.map(([key, value]) => JSON.parse(value));

        // Filter and sort the trades
        const debtTradesSorted = parsedData
          .filter((trade) => trade.isDebt === true).reverse()
          

        setDebtTrades(debtTradesSorted);
      })
      .catch((error) => {
        console.error("Error retrieving data from AsyncStorage:", error);
      });
  }, [dataNum]);

  return (
    <View>
      {/* <List.Section title={"(nhấn vào các khoản nợ để xác nhận trả)"}> */}
        <FlatList
          data={debtTrades}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item }) => <LoanItem item={item} />}
          ListHeaderComponent={() => <Text style = {[styles.header]}>Nhấn vào các khoản nợ để xác nhận trả</Text>}
        />
      {/* </List.Section> */}
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
     marginHorizontal: 10,
  color: "#FAD6A5",
  }
 
})