
export const isSameDate = (date1, date2) => {
    try {
      return date1.getTime() === date2.getTime();
    } catch (error) {
      console.log(error)
      console.log(date2)
    }
    
  };
  