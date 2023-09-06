import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "../stores";
import { useEffect, useState } from "react";
import { List, Text } from "react-native-paper";
import { addCommasToNum, isSameDate, traceData } from "../../utils";
export const Today = () => {
  const [dataNum, setDataNum] = useDataNum();
  const [arr, setArr] = useState([]);
  const today = () => {
    const current = new Date();
    return new Date(
      current.getFullYear(),
      current.getMonth(),
      current.getDate()
    );
  };

  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiGet(keys))
      .then((pairs) => setArr(pairs));
  }, [dataNum]);

  const rightContent = (trade) => {
    const text = addCommasToNum(trade["cost"]) + " Đ";
    if (trade.isMoneySubtraction) return "- " + text;
    else return "+ " + text;
  };

  const description = (trade) => {
    const isMoneySubtraction = trade["isMoneySubtraction"];
    const isDebt = trade["isDebt"];

    if (!isDebt) {
      if (isMoneySubtraction) return "Chi trả";
      return "Thêm tiền";
    }

    if (isMoneySubtraction) return "Cho vay";
    return "Vay";
  };

  const styleForLatestItem = (index) => {
    if (index === (dataNum - 1)) return styles.latest;
    return []
  }

  const getList = () =>
    arr.map((pair, index) => {
      const trade = JSON.parse(pair[1]);
      const time = new Date(trade.time);
      
      // console.log(dataNum);
      if (isSameDate(time, today()))
        return (
          <List.Item
            key={pair[0]}
            title={trade["title"]}
            right={(props) => <Text {...props}>{rightContent(trade)}</Text>}
            description={description(trade)}
            onPress={() => {}}
            style = {styleForLatestItem(index)}
          />
        );
    });

  const removeLatest = () => {
    if (dataNum <= 2) return;
    else
      AsyncStorage.removeItem(JSON.stringify(dataNum - 1)).then(() => {
        AsyncStorage.getItem(JSON.stringify(dataNum - 2)).then((val) => {
          const trade = JSON.parse(val);
          AsyncStorage.setItem("0", JSON.stringify(trade.balance)).then(() => {
            setDataNum((prev) => prev - 1);

            traceData();
          });
        });
      });
  };

  return (
    <List.Accordion
      title="Hôm nay"
      expanded
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      {getList()}
      <List.Item
        title="Xóa giao dịch mới nhất"
        right={(props) => <List.Icon {...props} icon="trash-can" />}
        onPress={removeLatest}
      />
    </List.Accordion>
  );
};

const styles = StyleSheet.create({
  latest: {
    backgroundColor: "#474E68",
  },
});
