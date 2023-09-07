import { View } from "react-native";
import { Chip } from "react-native-paper";
import { addCommasToNum } from "../../../utils";
import { useDataNum } from "../../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { traceData } from "../../../utils";
export const TagChip = ({ title, cost, isSubtraction }) => {
    const [dataNum, setDataNum] = useDataNum()
    const navigation = useNavigation();
  const storeTrade = () =>
    title &&
    cost &&
    AsyncStorage.getItem("0").then((result) => {
      let balance = Number(JSON.parse(result));

      balance = isSubtraction ? balance - Number(cost) : balance + Number(cost);

      // lưu số tiền mới
      AsyncStorage.setItem("0", JSON.stringify(balance));

    //   lưu giao dịch mới
      const currentDate = new Date();
      AsyncStorage.setItem(
        JSON.stringify(dataNum),
        JSON.stringify({
          title,
          cost,
          isMoneySubtraction: isSubtraction,
          isDebt: false,
          time: new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
          ),
          balance: balance,
        })
      ).then(() => {

        // thay đổi dataNum
        setDataNum((prev) => prev + 1);
        navigation.navigate("History");
        traceData();
      });
    });

  return (
    <View style={[styles.chip]}>
      <Chip
        icon="tag"
        onPress={() => {
            storeTrade()
        }}
        onClose={() => {
          _removeChip();
        }}
        // style={[styles.chip]}
      >
        {title + (isSubtraction ? "   -" : "  +") + addCommasToNum(cost) + "Đ"}
      </Chip>
    </View>
  );
};
