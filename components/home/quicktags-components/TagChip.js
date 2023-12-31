import { View } from "react-native";
import { Chip } from "react-native-paper";
import { addCommasToNum } from "../../../utils";
import { useDataNum, useNotification } from "../../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { notiStrings } from "../../../configs/noti";

export const TagChip = ({ id, title, cost, isSubtraction, removeChip, }) => {
  const [dataNum, setDataNum] = useDataNum();
  const navigation = useNavigation();
  const [noti, setNoti] = useNotification();
  // thêm giao dịch được đặt trong tag chip, tương tự thêm giao dịch ở Home
  // // có 3 function storeTrade, khi sửa 1 func => cần sửa cả 3 func ở : Home, TagChip, LoanItem
  const storeTrade = () =>
    title &&
    cost &&
    AsyncStorage.getItem("0").then((result) => {
      // setCost(prev => prev.replace(/,/g, ""));
      const costNum = cost.replace(/,/g, '');
      // lây money trong info
      const info = JSON.parse(result);
      let balance = info["money"];
      balance = isSubtraction ? balance - Number(costNum) : balance + Number(costNum);
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
          cost: costNum,
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
        setNoti(prev => [...prev, {content: notiStrings.TRADE_ADD + title}])
        navigation.navigate("History");

        // traceData();
      }).catch(error => {
        setNoti(prev => [...prev, {content: notiStrings.ERROR, isError: true}])
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
          removeChip(id);
        }}
        onLongPress={() => removeChip(id)}
      >
        {title + (isSubtraction ? "   -" : "  +") + addCommasToNum(cost) + "Đ"}
      </Chip>
    </View>
  );
};
