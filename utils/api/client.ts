import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'https://salty-mountain-66760.herokuapp.com/api/v1'
    : 'http://localhost:8080/api/v1';

export const axiosClient = axios.create({ baseURL });
