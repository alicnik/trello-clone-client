import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8080/api/v1'
    : 'http://localhost:8080/api/v1';

export const axiosClient = axios.create({ baseURL });
