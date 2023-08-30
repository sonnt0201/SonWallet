
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, List } from 'react-native-paper';



export const LoanList = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section  title="Lịch sử giao dịch" style={[styles.historyPage]} theme={DefaultTheme}>
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="account-cash" />}>
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
        expanded={expanded}
        onPress={handlePress}>
        <List.Item title="First item" onPress={() => {

        }} />
        <List.Item title="Second item" onPress={() => {
            
        }}/>
      </List.Accordion>
    </List.Section>
  );
};

