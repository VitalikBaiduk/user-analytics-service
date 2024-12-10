import axios from "axios";

const instanceConfig = {
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		"x-origin": "user_analytics_service",
	},
};

const API_URL = 'https://rest.ramonki.by/api/v1/';

 export const instanceAPI = axios.create({
	baseURL: API_URL,
	...instanceConfig,
});