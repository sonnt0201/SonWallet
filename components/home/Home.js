import { StyleSheet ,View} from "react-native";
import { Text, TextInput  } from "react-native-paper";
import { useState } from "react";
import { InputField } from "./InputField";
import { withTheme } from "react-native-paper";
import { Categories } from "./Categories";
import { QuickTags } from "./QuickTags";

const styles = StyleSheet.create({
  home: {
    width: 400,
    flexDirection: "column",
    // backgroundColor: ThemeProvider.
  }
})

export const Home = () => {
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();

  return (
    <View style={[styles.home]}>
      <InputField/>
      <Categories/>
      <QuickTags/>
    </View>
    
  );
};
