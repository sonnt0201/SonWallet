import { useState, useEffect } from "react"; 
import { StyleSheet, View } from "react-native";
import { DefaultTheme, List } from "react-native-paper";
import { useDataNum } from "../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Today } from "./Today";

export const HistoryList = () => {
  const [dataNum] = useDataNum();
  const [expanded, setExpanded] = useState(true);
  const [beginningDate, setBeginningDate] = useState("")
 
  useEffect(() => {
    AsyncStorage.getItem("1").then(val => {
      const trade = JSON.parse(val);

    })
  }, [dataNum])
  
  

  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={[styles.historyPage]}>
      <Today/>
    

      <List.Section title="Section 2">
        <List.Item title="First item" onPress={() => {}} />
        <List.Item title="Second item" onPress={() => {}} />
      </List.Section>

     
        
      
    </View>
  );
};
