import { addCommasToNum } from "./addCommasToNum"

export const formatInputNum = (numInString) => {
    const num = inputString.replace(/,/g, '')
    return addCommasToNum(num)
}