import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.API_URL
    : 'http://localhost:8080/api/v1';

export const axiosClient = axios.create({ baseURL });
