import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUniqueTimes = async () => {
  try {
    // Get all keys from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();

    // Initialize a Set to store unique time values
    const uniqueTimes = new Set();

    // Iterate over the keys and fetch the corresponding data
    for (const key of keys) {
      if (key !== "0") {
        const data = await AsyncStorage.getItem(key);
        const parsedData = JSON.parse(data);

        // Check if the parsedData contains a "time" property and add it to the Set
        if (parsedData && parsedData.time) {
          uniqueTimes.add(parsedData.time);
        }
      }
    }

    // Convert the Set to an array and sort it in reverse order
    const uniqueTimesArray = Array.from(uniqueTimes).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateB - dateA;
    });

    return uniqueTimesArray;
  } catch (error) {
    console.error("Error fetching unique times:", error);
    return [];
  }
};

// Example usage:
