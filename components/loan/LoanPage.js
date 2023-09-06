import { DefaultTheme, Appbar } from "react-native-paper";
import { LoanList } from "./LoanList";
import { StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  loanPage: {
    backgroundColor: DefaultTheme.colors.background,
    height: "100%",
  },
});

export const LoanPage = () => {
  return (
    <View style={[styles.loanPage]}>
      <Appbar.Header>
        <Appbar.Action icon="wallet" />
        <Appbar.Content title={" Vay nợ "} />
        <Appbar.Action />
      </Appbar.Header>
      <LoanList />
    </View>
  );
};