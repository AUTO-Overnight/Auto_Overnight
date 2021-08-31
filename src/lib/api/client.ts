import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = '';

// client.defaults.baseURL = '';
// client.defaults.withCredentials = true;

export default client;
