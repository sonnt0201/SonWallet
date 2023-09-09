import { View } from "react-native";
import { Chip } from "react-native-paper";
import { addCommasToNum } from "../../../utils";
import { useDataNum } from "../../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { traceData } from "../../../utils";
export const TagChip = ({ id, title, cost, isSubtraction }) => {
  const [dataNum, setDataNum] = useDataNum();
  const navigation = useNavigation();

  // thêm giao dịch được đặt trong tag chip, tương tự thêm giao dịch ở Home
  // // có 3 function storeTrade, khi sửa 1 func => cần sửa cả 3 func ở : Home, TagChip, LoanItem
  const storeTrade = () =>
    title &&
    cost &&
    AsyncStorage.getItem("0").then((result) => {
      // setCost(prev => prev.replace(/,/g, ""));

      // lây money trong info
      const info = JSON.parse(result);
      let balance = info["money"];
      balance = isSubtraction ? balance - Number(cost) : balance + Number(cost);
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
          debtID: dataNum,
        })
      ).then(() => {
        setDataNum((prev) => prev + 1);
        navigation.navigate("History");
        traceData();
      });
    });

  return (
    <View style={[styles.chip]}>
      <Chip
        key={TagChip.id}
        icon="tag"
        onPress={() => {
          storeTrade();
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
