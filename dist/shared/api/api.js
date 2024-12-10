"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instanceAPI = void 0;
const axios_1 = __importDefault(require("axios"));
const instanceConfig = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-origin": "user_analytics_service",
    },
};
const API_URL = 'https://rest.ramonki.by/api/v1/';
exports.instanceAPI = axios_1.default.create(Object.assign({ baseURL: API_URL }, instanceConfig));
//# sourceMappingURL=api.js.map