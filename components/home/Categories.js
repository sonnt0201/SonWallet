import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
// import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  LatestTradeIDActions,
  Trade,
  useDataNum,
  useLatestTradeID,
} from "../stores";
// import { initStorage, traceData } from "../../utils";

const styles = StyleSheet.create({
  categories: {
    flexDirection: "column",
    height: 120,
    marginTop: 20,
  },
  row: { flex: 1, flexDirection: "row" },
  buttonContainer: { flex: 1, marginHorizontal: 8 },
});

export const Categories = ({ title, cost, storeTrade }) => {
  const [dataNum, setDataNum] = useDataNum();

  

  return (
    <View style={[styles.categories]}>
      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="contained"
            onPress={() => {
              storeTrade({
             
                isMoneySubtraction: true,
                isDebt: false,
              });

              
              console.log("TAP TAP TAP !!!");
            }}
          >
            Chi trả
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="outlined"
            onPress={() => {
              storeTrade({
               
                isMoneySubtraction: false,
                isDebt: false,
              });
              
            }}
          >
            Thêm tiền
          </Button>
        </View>
      </View>

      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="outlined"
            onPress={() => {
              storeTrade({
               
                isMoneySubtraction: true,
                isDebt: true,
              });

             
            }}
          >
            Cho vay
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="outlined"
            onPress={() => {
              storeTrade({
               
                isMoneySubtraction: false,
                isDebt: true,
              });

              
            }}
          >
            Vay
          </Button>
        </View>
      </View>
    </View>
  );
};
