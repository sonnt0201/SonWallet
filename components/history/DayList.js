import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "../stores";
import { useEffect, useState } from "react";
import { List, Surface, Text } from "react-native-paper";
import { addCommasToNum, isSameDate } from "../../utils";
import { formatDate } from "../../utils";
import { COLOR_PRIMARY } from "../../configs";
import { TradeItem } from "./TradeItem";
export const DayList = ({ date }) => {
  const [dataNum] = useDataNum();
  const [arr, setArr] = useState([]);

  useEffect(() => {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiGet(keys))
      .then((pairs) => setArr(pairs));
  }, [dataNum]);

  const getList = () =>
    arr
      .sort((a, b) => b[0] - a[0])
      .map((pair, index) => {
        const trade = JSON.parse(pair[1]);
        const time = new Date(trade.time);

        // console.log(dataNum);
        if (isSameDate(time, date))
          return <TradeItem keyVal={pair[0]} trade={trade} />;
      });

  return (
    <List.Section
      title={formatDate(date)}
      titleStyle={[styles.sectionTitle]}
      expanded
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      {getList()}
    </List.Section>
  );
};



const styles = StyleSheet.create({
  sectionTitle: {
    color: COLOR_PRIMARY,
  },
});
