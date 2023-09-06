import { List } from "react-native-paper"
export const DayList = ({day}) => {
    return <List.Accordion
    title="Hôm nay"
    expanded
    left={(props) => <List.Icon {...props} icon="folder" />}
  >
    {todayList()}
    <List.Item title="Second item" />
  </List.Accordion>
}