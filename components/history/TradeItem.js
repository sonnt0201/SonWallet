import { StyleSheet,View } from "react-native";
import { useState } from "react";
import { List,Text } from "react-native-paper";
import { COLOR_PRIMARY } from "../../configs";
import { addCommasToNum, } from "../../utils";
export const TradeItem = ({ keyVal, trade, isLatest }) => {
    const [balanceVisible, setBalanceVisible] = useState(false);
  
    const rightContent = (trade) => {
      const text = addCommasToNum(trade["cost"]) + " Đ";
      if (trade.isMoneySubtraction) return "- " + text;
      else return "+ " + text;
    };
  
    const description = (trade) => {
      if (trade.id === 1) return "Tạo 1 giao dịch mới để bắt đầu";
      const isMoneySubtraction = trade["isMoneySubtraction"];
      const isDebt = trade["isDebt"];
  
      if (!isDebt) {
        if (isMoneySubtraction) return "Chi trả";
        return "Thêm tiền";
      }
  
      if (isMoneySubtraction) return "Cho vay";
      return "Vay";
    };
  
    return (
      <List.Item
        key={keyVal}
        title={trade["title"]}
        right={(props) => (
          <View >
            <Text style = {{textAlign: "right"}}>{rightContent(trade)}</Text>
            {trade.balance && balanceVisible && (
              <Text style={{ color: COLOR_PRIMARY }}>
                {"Số dư: " + addCommasToNum(trade["balance"]) + " Đ"}
              </Text>
            )}
          </View>
        )}
        description={description(trade)}
        onPress={() => {
          // console.log("pressed!")
          setBalanceVisible(!balanceVisible)
        }}

        style={isLatest && [styles.latest]}

      />
    );
  };

const styles = StyleSheet.create({
    latest : {
        backgroundColor: "#474E68",
      },
})