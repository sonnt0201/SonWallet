import {  Appbar } from "react-native-paper";
import { LoanList } from "./LoanList";
import { StyleSheet, View } from "react-native";
import { globalTheme } from "../../configs";
const styles = StyleSheet.create({
  loanPage: {
    backgroundColor: globalTheme.colors.background,
    height: "100%",
  },
});

export const LoanPage = () => {
  return (
    <View style={[styles.loanPage]}>
     
      <LoanList />
    </View>
  );
};
