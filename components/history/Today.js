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
    if (trade.id === 1) return "Tạo 1 giao dịch mới để bắt đầu"
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
    if (index === dataNum - 1) return styles.latest;
    return [];
  };

  const getList = () =>
    arr
      .map((pair, index, arr) => {
        const trade = JSON.parse(pair[1]);
        if (!trade.time) return null;
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
              style={styleForLatestItem(index)}
            />
          );
      })
      .reverse();

  const removeLatest = () => {
    if (dataNum <= 2) return;
    else
      AsyncStorage.removeItem(JSON.stringify(dataNum - 1)).then(() => {
        // lấy giao dịch ngay trước đó
        AsyncStorage.getItem(JSON.stringify(dataNum - 2)).then((val) => {
          const trade = JSON.parse(val);

          //lưu vào info
          AsyncStorage.getItem("0").then((val) => {
            const info = JSON.parse(val);
            AsyncStorage.setItem("0", JSON.stringify({
              ...info,
              money: trade.balance,
            })).then(() => {
              setDataNum(prev => prev - 1)
            });
          });
        });
      });
  };

  return (
    <List.Section title="Hôm nay">
      <List.Item
        title="Xóa giao dịch mới nhất"
        right={(props) => <List.Icon {...props} icon="trash-can" />}
        onPress={removeLatest}
      />
      {getList()}
    </List.Section>
  );
};

const styles = StyleSheet.create({
  latest: {
    backgroundColor: "#474E68",
  },
});
