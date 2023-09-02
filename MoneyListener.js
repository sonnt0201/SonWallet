import AsyncStorage from "@react-native-async-storage/async-storage";
import { LatestTradeIDActions, useLatestTradeID } from "./components/stores";
import { useEffect } from "react";
import { traceData } from "./utils";

export const MoneyListener = () => {


  const [latestTradeID, setLatestTradeID] = useLatestTradeID();

  const initData = async () => {
    let wallet = await JSON.parse(AsyncStorage.getItem("wallet"));
    if (!wallet ) 
    wallet = 100;  
    AsyncStorage.setItem("wallet", JSON.stringify(wallet))
    console.log("wallet in storage: " + wallet)
    let id = await JSON.parse(AsyncStorage.getItem("latestTradeID"));
    if (!id)
     id = 0; // muốn cho giá trị trong bộ nhớ về 0, thay đổi if này
    setLatestTradeID(id);

    
  };

  const storeData = async () => {
    await AsyncStorage.setItem("latestTradeID", JSON.stringify(latestTradeID))
    console.log("id in storage: " + await AsyncStorage.getItem("latestTradeID"))
    
  }

 

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    storeData();
  },[latestTradeID])

  useEffect(() => {
    traceData()
  },[latestTradeID])

  return null;
};
