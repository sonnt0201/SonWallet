import { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { traceData } from "../../../utils";

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

  // lấy tags từ storage khi mở ứng dụng
  const getTagsFromStorage = () =>
    AsyncStorage.getItem("0")
      .then((val) => {
        const info = JSON.parse(val);
        setTags(info["tags"]);
      })
      .then(() => {
        // traceData();
      });

  // được gọi mỗi khi tags thay đổi => trong useEffect
  const saveTagsToStorage = () =>
    AsyncStorage.getItem("0").then((val) => {
      const info = JSON.parse(val);
      AsyncStorage.setItem(
        "0",
        JSON.stringify({
          ...info,
          tags,
        })
      ).then(() => {
        // traceData();
      });
    });

  useEffect(() => {
    getTagsFromStorage();
  }, []);

  useEffect(() => {
    saveTagsToStorage();
  }, [tags]);

  const removeChip = (id) => {
    // Create a copy of the current tags array with the specified tag removed
    const updatedTags = tags.filter((tag) => tag.id !== id);

    // Reset the id values for the remaining tags to match their index in the array
    const updatedTagsWithNewIds = updatedTags.map((tag, index) => ({
      ...tag,
      id: index,
    }));

    // Update the tags state with the new array
    setTags(updatedTagsWithNewIds);
  };

  return (
    <Surface styles={[styles.quickTags]} elevation={5}>
      <View style={[styles.title]}>
        <Text icon="tags-mutiple">QuickTags</Text>
      </View>
      {inputVisible && (
        <InputModal
          setTags={setTags}
          tags={tags}
          visible={inputVisible}
          setVisible={setInputVisible}
        />
      )}
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
          <TagChip
            id={tag.id}
            title={tag.title}
            cost={tag.cost}
            isSubtraction={tag.isMoneySubtraction}
            removeChip={removeChip}
          />
        ))}
      </View>
    </Surface>
  );
};
