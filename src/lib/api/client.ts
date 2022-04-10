import axios from 'axios';
import { API_URL } from '@env';

const client = axios.create();
console.log(API_URL);
client.defaults.baseURL = `${API_URL}`;

export default client;
