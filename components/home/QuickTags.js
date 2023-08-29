import { View } from "react-native";
import { Avatar, Button, Card, DefaultTheme, Text} from "react-native-paper";




export const QuickTags = () => {
  return (
    <View styles = {{
        justifyContent: "space-between",
        backgroundColor: DefaultTheme.colors.primary,
        innerHeight: 200,
        innerWidth: 200,
        flex: 1
      }}>
          <Card>
   
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
   
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
      </View>
    
  );
};
