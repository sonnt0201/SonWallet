import * as React from "react";
import { StyleSheet } from "react-native";
import { DefaultTheme, List } from "react-native-paper";
import { useDataNum } from "../stores";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Today } from "./Today";

export const HistoryList = () => {
  const [dataNum] = useDataNum();
  const [expanded, setExpanded] = React.useState(true);
  const [data, setData] = React.useState();

  

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section title="Lịch sử giao dịch" style={[styles.historyPage]}>
      <Today/>
    

      <List.Accordion
        title="Uncontrolled Accordion"
        left={(props) => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={(props) => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}
      >
        <List.Item title="First item" onPress={() => {}} />
        <List.Item title="Second item" onPress={() => {}} />
      </List.Accordion>
    </List.Section>
  );
};
