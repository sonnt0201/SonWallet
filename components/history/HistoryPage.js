import * as React from "react";
import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {  List, Appbar, Portal } from "react-native-paper";
import { globalTheme } from "../../configs";
import { HistoryList } from "./HistoryList";
import { Today } from "./Today";
const styles = StyleSheet.create({
  historyPage: {
    backgroundColor: globalTheme.colors.background,
    height: "100%",
  },
});

export const HistoryPage = () => {
  return (
   
      <View style={[styles.historyPage]}>
        {/* <Today /> */}
        <HistoryList />
      </View>
   
  );
};
