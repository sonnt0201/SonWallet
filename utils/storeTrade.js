import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trade } from "../components/stores";
import { traceData } from "./traceData";

export const storeTrade = ({ id, title, cost, isMoneySubtraction, isDebt }) =>
 (title && cost) && AsyncStorage.getItem("0").then((result) => {
    cost = cost.replace(/,/g, '')
    let money = Number(JSON.parse(result));

    money = isMoneySubtraction ? money - Number(cost) : money + Number(cost);

    // lưu số tiền mới
    AsyncStorage.setItem("0", JSON.stringify(money));
    const currentDate = new Date();
    AsyncStorage.setItem(
      JSON.stringify(id),
      JSON.stringify({
        title,
        cost,
        isMoneySubtraction,
        isDebt,
        time: new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        balance: money,
      })
    ).then(() => {
      traceData();
    });
  });
