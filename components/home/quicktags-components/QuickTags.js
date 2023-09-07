import { useState } from "react";
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
  FAB,
  Modal,
} from "react-native-paper";

import { InputModal } from "./InputModal";
import { TagChip } from "./TagChip";

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
    justifyContent: "flex-start",
    // alignItems: "center",
    height: "100%",

    flexWrap: "wrap",
    gap: 10,
  },
});

export const QuickTags = () => {
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);

  _removeChip = () => {};

  return (
    <Surface styles={[styles.quickTags]} elevation={5}>
      <View style={[styles.title]}>
        <Text icon="tags-mutiple">QuickTags</Text>
      </View>
      {inputVisible && <InputModal setTags={setTags} tags={tags} visible={inputVisible} setVisible={setInputVisible} />}
      <View key={"add-tag"} style={[styles.chipContainer]}>
        <View style={[styles.chip]}>
          <Chip
            icon={inputVisible ? "pencil-remove" : "plus"}
            onPress={() => {
              setInputVisible(!inputVisible);
              console.log(inputVisible);
            }}
          >
            {inputVisible ? "Hủy thêm" : "Thêm tag"}
          </Chip>
        </View>

        {tags.map((tag) => (
         <TagChip title={tag.title} cost={tag.cost} isSubtraction={tag.isMoneySubtraction}/>
        ))}

        
      </View>
    </Surface>
  );
};
