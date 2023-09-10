import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUniqueTimes, isSameDate } from "../../utils";
import { List, Text } from "react-native-paper";
import { DayList } from "./DayList";
import { formatDate } from "../../utils";
import { Today } from "./Today";
import { useDataNum } from "../stores";
export const HistoryList = () => {

  const [uniqueTimesArray, setUniqueTimesArray] = useState([]);
  const [dataNum, setDataNum] = useDataNum()
  const today = () => {
    const current = new Date();
    return new Date(current.getFullYear(), current.getMonth(), current.getDate())
  }
  
  useEffect(() => {
    getUniqueTimes().then((times) => {
      setUniqueTimesArray(times);
    });
  }, [dataNum]);

  const renderItem = ({ item }) => (
    isSameDate(today(), new Date(item)) ? <Today/> :
     <DayList date={new Date(item)}/>
  );


  return (
    <FlatList
      data={uniqueTimesArray}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()} // Assuming time values are unique
    />
  );
};
