"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const isReactNative = typeof navigator !== "undefined" && navigator.product === "ReactNative";
const AsyncStorage = isReactNative ? async_storage_1.default : null;
exports.storage = {
    async getItem(key) {
        if (isReactNative && AsyncStorage) {
            return AsyncStorage.getItem(key);
        }
        return localStorage.getItem(key);
    },
    async setItem(key, value) {
        if (isReactNative && AsyncStorage) {
            await AsyncStorage.setItem(key, value);
        }
        else {
            localStorage.setItem(key, value);
        }
    },
    async removeItem(key) {
        if (isReactNative && AsyncStorage) {
            await AsyncStorage.removeItem(key);
        }
        else {
            localStorage.removeItem(key);
        }
    }
};
//# sourceMappingURL=storage.js.map