import { View, StyleSheet } from "react-native";
import { Button, Text} from "react-native-paper";
// import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";



const styles = StyleSheet.create({
  categories: {
    flexDirection: "column",
    height: 120,
  },
  row: { flex: 1, flexDirection: "row" },
  buttonContainer: { flex: 1, marginHorizontal: 8, },
  
});

export const Categories = () => {
  return (
    <View style={[styles.categories]}>
      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button mode="contained" onPress={() => {}}>
            Chi trả
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button mode="outlined" onPress={() => {}}>
            Thêm tiền
          </Button>
        </View>

      

      </View>

      <View style={[styles.row]}>
        <View style={[styles.buttonContainer]}>
          <Button mode="outlined" onPress={() => {}}>
            Cho vay
          </Button>
        </View>
        <View style={[styles.buttonContainer]}>
          <Button mode="outlined" onPress={() => {}}>
            Vay
          </Button>
        </View>

      

      </View>


    </View>
  );
};
