import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
// import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LatestTradeIDActions, Trade, useLatestTradeID } from "../stores";
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
  const [latestTradeID, setLatestTradeID] = useLatestTradeID();

  const addTrade = async () => {
    await storeTrade({
      id: latestTradeID + 1,
      title: title,
      cost: cost,
      isMoneySubtraction: true,
      isDebt: false
    })

    setLatestTradeID((prev) => (prev + 1))
  }

  const remove = async() => {
    // await initStorage();
    AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
    await AsyncStorage.multiSet([["wallet", JSON.stringify(1000)],[ "latestTradeID",JSON.stringify(0)]])
    setLatestTradeID(0);
    traceData()
  }

  return (
    <View style={[styles.categories]}>
      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="contained"
            onPress={() => {
             
              addTrade()
               console.log("TAP TAP TAP !!!")
               
              
            } }
          >
            Chi trả
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button mode="outlined" onPress={() => {}}>
            Thêm tiền
          </Button>
        </View>
      </View>

      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button mode="outlined" onPress={() => {}}>
            Cho vay
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button mode="outlined" onPress={() => {
            remove()

          }}>
            Vay
          </Button>
        </View>
      </View>
    </View>
  );
};
