
import { HelperText } from "react-native-paper";
import { View } from "react-native";
export const TextHelperContainer = ({title, cost}) => {
    
    function containsOnlyNumbers(inputString) {
        
        return /^[\d,]+$/.test(inputString) || inputString.length === 0;
      }
9
    return <View>
        {(title.length === 0 || cost.length === 0) && (
        <HelperText type="error" visible={true}>
          Nhập tên giao dịch và số tiền
        </HelperText>
      )}
      {title.length > 0 && cost.length > 0 && containsOnlyNumbers(cost) && (
        <HelperText type="error" visible={true}>
          Sau đó chọn 1 trong các loại giao dịch dưới đây
        </HelperText>
      )}

      {!containsOnlyNumbers(cost) && (
        <HelperText type="error" visible={true}>
          Số tiền chỉ gồm SỐ {"(0...9)"}, không có kí tự đặc biệt
        </HelperText>
      )}

    </View>
}