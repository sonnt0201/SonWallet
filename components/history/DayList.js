import { List } from "react-native-paper"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "../stores";
import { useEffect, useState } from "react";
import { List, Text } from "react-native-paper";
import { addCommasToNum, isSameDate, traceData } from "../../utils";
export const DayList = ({date}) => {
  const [dataNum, setDataNum] = useDataNum();
  const [arr, setArr] = useState([]);
  
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

  const getList = () =>
    arr.map((pair) => {
      const trade = JSON.parse(pair[1]);
      const time = new Date(trade.time);

      // console.log(isSameDate(time, today()));
      if (isSameDate(time, date))
        return (
          <List.Item
            key={pair[0]}
            title={trade["title"]}
            right={(props) => <Text {...props}>{rightContent(trade)}</Text>}
            // description = {}
          />
        );
    });

  

  return (
    <List.Accordion
      title="Hôm nay"
      expanded
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      {getList()}
    
    </List.Accordion>
  );
};
