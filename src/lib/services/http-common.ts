import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTH_TOKEN = import.meta.env.VITE_AUTH_TOKEN;
const httpCommon = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'Application/json',
		'X-Authorization': null,
		Authorization: `Bearer ${AUTH_TOKEN}`
	}
});

export default httpCommon;
