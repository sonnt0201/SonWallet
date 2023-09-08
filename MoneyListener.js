import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDataNum } from "./components/stores";
import { useEffect } from "react";
import { traceData } from "./utils";

export const MoneyListener = () => {
  const [dataNum, setDataNum] = useDataNum();

  // useEffect(() => {
  //   AsyncStorage.getAllKeys()
  //     .then((keys) => AsyncStorage.multiGet(keys))
  //     .then((pairs) => {
  //       // setDataNum(pairs.length)

  //       console.log("state " + pairs);
  //     });
  // }, [dataNum]);

  // useEffect(() => {
  //   AsyncStorage.getAllKeys().then((keys) => {
  //     AsyncStorage.multiGet(keys).then((pairs) => {
  //       console.log("pair: " + pairs);
  //       setDataNum(pairs.length);
  //       console.log("data num " + dataNum);
  //     });
  //   });
  // }, []);

  return null;
};
