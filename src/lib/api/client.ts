import axios from 'axios';
import { API_URL } from '@env';

const client = axios.create();

client.defaults.baseURL = `${API_URL}`;

export default client;
