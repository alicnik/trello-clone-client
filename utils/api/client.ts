import axios from 'axios';

axios.defaults.baseURL = 'https://api.example.com';

const baseURL =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.DATABASE_URL
    : 'http://localhost:8080/api/v1';

export const axiosClient = axios.create({ baseURL });
