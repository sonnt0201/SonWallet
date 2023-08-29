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
    margin: 5,
    // backgroundColor: ThemeProvider.
  },
  
  guide : {
    // marginLeft: 2,
    // flex: 1,
    alignContent: "center",
    // height: 20,
    paddingHorizontal: 20,
    width: 400,
    color: "red"
  }
})

export const Home = () => {
  const [title, setTitle] = useState();
  const [cost, setCost] = useState();

  return (
    <View style={[styles.home]}>
      <View style={[styles.guide]}>
         <Text>
        Thêm một giao dịch
      </Text>
      </View>
     
      <InputField/>
      <Categories/>
      <QuickTags/>
    </View>
    
  );
};
