import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "../stores";
import { useEffect, useState } from "react";
import { List, Surface, Text } from "react-native-paper";
import { addCommasToNum, isSameDate,  } from "../../utils";
import { formatDate } from "../../utils";
export const DayList = ({date}) => {
  const [dataNum, ] = useDataNum();
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

 

  const getList = () =>
  arr.sort((a, b) => (b[0] - a[0]))
    .map((pair, index) => {
      const trade = JSON.parse(pair[1]);
      const time = new Date(trade.time);
      
      // console.log(dataNum);
      if (isSameDate(time, date))
        return (
     
          <List.Item
            key={pair[0]}
            title={trade["title"]}
            right={(props) => <Text {...props}>{rightContent(trade)}</Text>}
            description={description(trade)}
            onPress={() => {}}
            
          />
      
        
        );
    }).reverse();

 

  return (
    <List.Section
      title={formatDate(date)}
      expanded
      left={(props) => <List.Icon {...props} icon="folder" />}
    >
      {getList()}
      
    </List.Section>
  );
};


