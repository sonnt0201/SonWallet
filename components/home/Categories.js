import { View, StyleSheet, Keyboard } from "react-native";
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
    // height: 120,
    marginTop: 20,
  },
  row: { flex: 1, flexDirection: "row", marginBottom: 8, },
  buttonContainer: { flex: 1, marginHorizontal: 8 },
});

/*
  handlePress: xử lí 4 button để submit input form:
    với Categories trong Home, handlePress = StoreTrade({isMoneySubtraction, isDebt}) (title và cost đã có sẵn ở Home)
    với Categories trong QuickTags, HandlePress để add thêm tag vào (title và cost cũng có sẵn)
*/

export const Categories = ({ handlePress, shortened }) => {
  const [dataNum, setDataNum] = useDataNum();

  return (
    <View style={[styles.categories]}>
      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="contained"
            onPress={() => {
              Keyboard.dismiss()
              handlePress({
                isMoneySubtraction: true,
                isDebt: false,
              });

             
            }}
          >
            Chi trả
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button
            mode="outlined"
            onPress={() => {
              Keyboard.dismiss()
              handlePress({
                isMoneySubtraction: false,
                isDebt: false,
              });
            }}
          >
            Thêm tiền
          </Button>
        </View>
      </View>

      {!shortened && (
        <View style={[styles.row]}>
          <View style={[styles.buttonContainer]}>
            <Button
              mode="outlined"
              onPress={() => {
                handlePress({
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
                handlePress({
                  isMoneySubtraction: false,
                  isDebt: true,
                });
              }}
            >
              Vay
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};
