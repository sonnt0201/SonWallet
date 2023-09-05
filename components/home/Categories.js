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
import { initStorage, storeTrade, traceData } from "../../utils";

const styles = StyleSheet.create({
  categories: {
    flexDirection: "column",
    height: 120,
    marginTop: 20,
  },
  row: { flex: 1, flexDirection: "row" },
  buttonContainer: { flex: 1, marginHorizontal: 8 },
});

export const Categories = ({ title, cost }) => {
  const [dataNum, setDataNum] = useDataNum();
  
  return (
    <View style={[styles.categories]}>
      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="contained"
            onPress={() => {
              storeTrade({
                id: dataNum,
                title: title,
                cost: cost,
                isMoneySubtraction: true,
                isDebt: false,
              });

              setDataNum((prev) => prev + 1);
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
                id: dataNum,
                title: title,
                cost: cost,
                isMoneySubtraction: false,
                isDebt: false,
              });
              setDataNum((prev) => prev + 1);
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
                id: dataNum,
                title: title,
                cost: cost,
                isMoneySubtraction: true,
                isDebt: true,
              });

              setDataNum((prev) => prev + 1);
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
                id: dataNum,
                title: title,
                cost: cost,
                isMoneySubtraction: false,
                isDebt: true,
              });

              setDataNum((prev) => prev + 1);
            }}
          >
            Vay
          </Button>
        </View>
      </View>
    </View>
  );
};
