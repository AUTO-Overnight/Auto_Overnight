import axios from 'axios';
import { API_URL } from '@env';

const client = axios.create();

client.defaults.baseURL = `${API_URL}`;

// client.defaults.baseURL = '';
// client.defaults.withCredentials = true;

export default client;
