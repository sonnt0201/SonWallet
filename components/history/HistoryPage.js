import * as React from 'react';
import { useState } from 'react';
import { StyleSheet,View } from 'react-native';
import { DefaultTheme, List, Appbar } from 'react-native-paper';
import { HistoryList } from './HistoryList';

const styles = StyleSheet.create({
  historyPage : {
    backgroundColor: DefaultTheme.colors.background,
    height: "100%"
  }
})

export const HistoryPage = () => {


  return (
    <View style={[styles.historyPage]}>
     
    <HistoryList/>
    </View>
   
  );
};

