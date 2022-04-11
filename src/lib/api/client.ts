import axios from 'axios';
const client = axios.create();
const API_URL = process.env.API_URL;
console.log('url', API_URL);
client.defaults.baseURL = `${API_URL}`;

export default client;
