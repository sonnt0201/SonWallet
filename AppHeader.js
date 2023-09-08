import { Appbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDataNum } from "./components/stores";
import { addCommasToNum, traceData } from "./utils";
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
      if (!val)
        AsyncStorage.setItem(
          "0",
          JSON.stringify({
            money: 0,
            tags: [],
          })
        ).then(() => {
          setDataNum(1);
        });
      else {
        const info = JSON.parse(val);
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
