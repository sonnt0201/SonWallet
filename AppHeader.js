import { Appbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDataNum } from "./components/stores";
import { addCommasToNum, getTimeToday, traceData } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AppHeader = () => {
  const [money, setMoney] = useState("0");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [dataNum, setDataNum] = useDataNum();
  const toggleBalanceVisible = () => {
    setBalanceVisible((prev) => !prev);
  };

  const getMoneyFromStorage = () => {
    AsyncStorage.getItem("0").then((val) => {
      const info = JSON.parse(val);
      if (!val || !info["money"])
        AsyncStorage.multiSet([
          [
            "0",
            JSON.stringify({
              money: 0,
              tags: [],
            }),
          ],
          [
            "1",
            JSON.stringify({
              id: 1,
              title: "Chào mừng! ",
              cost: 0,
              isMoneySubtraction: false,
              isDebt: false,
              time: getTimeToday()
            })
          ]
        ]).then(() => {
          setDataNum(2);
        });
      else {
        setMoney(info["money"]);
      }
    });
  };

  useEffect(() => {
    getMoneyFromStorage();
  }, [dataNum]);

  useEffect(() => {
    getMoneyFromStorage();
    // traceData()
  }, []);

  const title = () => {
    return balanceVisible ? addCommasToNum(money.toString()) + " VNĐ" : "-----";
  };
  return (
    <Appbar.Header>
      <Appbar.Action icon="wallet" />
      <Appbar.Content title={title()} onPress={toggleBalanceVisible} />
      <Appbar.Action
        icon={balanceVisible ? "eye" : "eye-off"}
        onPress={toggleBalanceVisible}
      />
    </Appbar.Header>
  );
};
