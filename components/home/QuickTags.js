import { View, StyleSheet, ScrollView } from "react-native";
import {
  Avatar,
  Button,
  Card,
  DefaultTheme,
  Text,
  Chip,
  Surface,
  IconButton,
} from "react-native-paper";

styles = StyleSheet.create({
  quickTags: {
    // justifyContent: "space-between",
    backgroundColor: DefaultTheme.colors.primary,
    margin: 5,
  },
  title: {
    margin: 10,
  },
  chipContainer: {
    padding: 5,
    flexDirection: "row",
    justifyContent:"flex-start",
    // alignItems: "center",
    height: "100%",

    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    
    
    
    
  },
});

export const QuickTags = () => {
  _removeChip = () => {};

  return (
    <Surface styles={[styles.quickTags]} elevation={5}>
      <View style={[styles.title]}>
        <Text icon="tags-mutiple">QuickTags</Text>
      </View>
      <View style={[styles.chipContainer]}>
        <View style={[styles.chip]}>
          <Chip
            icon="tag"
            onPress={() => console.log("Pressed")}
            onClose={() => {
              _removeChip();
            }}
            // style={[styles.chip]}
          >
            Example Chip
          </Chip>
        </View>

        <View style={[styles.chip]}>
          <Chip
            icon="tag"
            onPress={() => console.log("Pressed")}
            onClose={() => {
              _removeChip();
            }}
            // style={[styles.chip]}
          >
            Example Chip
          </Chip>
        </View><View style={[styles.chip]}>
          <Chip
            icon="tag"
            onPress={() => console.log("Pressed")}
            onClose={() => {
              _removeChip();
            }}
            // style={[styles.chip]}
          >
            Example Chip
          </Chip>
        </View>

      </View>
    </Surface>
  );
};
