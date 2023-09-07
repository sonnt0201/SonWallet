import { Appbar } from "react-native-paper";
import { useState, useEffect } from "react";
import { useDataNum } from "./components/stores";
import { addCommasToNum } from "./utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AppHeader = () => {
  const [money, setMoney] = useState("0");
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [dataNum,] = useDataNum()
  const toggleBalanceVisible = () => {
    setBalanceVisible((prev) => !prev);
  };
  useEffect(() => {
    AsyncStorage.getItem("0").then((result) => {
      setMoney(result);
    });
  }, []);
  useEffect(() => {
    AsyncStorage.getItem("0").then((result) => {
      setMoney(result);
    });
  }, [dataNum]);

  const title = () => {
    return balanceVisible ? (addCommasToNum(money.toString()) + " VNĐ") : "-----"
  }
  return (
    <Appbar.Header>
      <Appbar.Action icon="wallet" />
      <Appbar.Content
        title={title()}
        onPress={toggleBalanceVisible}
      />
      <Appbar.Action
        icon={balanceVisible ? "eye" : "eye-off"}
        onPress={toggleBalanceVisible}
      />
    </Appbar.Header>
  );
};
