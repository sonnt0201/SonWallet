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
  const [thisMonth, setThisMonth] = useState(1000000)

  

  return (
    <View style={[styles.historyPage]}>
       <Appbar.Header>
    
    <Appbar.Action icon="wallet" />
    <Appbar.Content
      title={"Tháng này : " + thisMonth}
      
    />
    <Appbar.Action
      
    />
  </Appbar.Header>
    <HistoryList/>
    </View>
   
  );
};

