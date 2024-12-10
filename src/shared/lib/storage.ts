import AsyncStorageLib from "@react-native-async-storage/async-storage";

const isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
const AsyncStorage = isReactNative ? AsyncStorageLib : null;

export const storage = {
  async getItem(key: string): Promise<string | null> {
    if (isReactNative && AsyncStorage) {
      return AsyncStorage.getItem(key);
    }
    return localStorage.getItem(key);
  },
  
  async setItem(key: string, value: string): Promise<void> {
    if (isReactNative && AsyncStorage) {
      await AsyncStorage.setItem(key, value);
    } else {
      localStorage.setItem(key, value);
    }
  },
  
  async removeItem(key: string): Promise<void> {
    if (isReactNative && AsyncStorage) {
      await AsyncStorage.removeItem(key);
    } else {
      localStorage.removeItem(key);
    }
  }
};
