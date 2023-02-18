import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ||
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? 'https://trello-clone-production.up.railway.app/api/v1'
    : 'http://localhost:8080/api/v1';

export const axiosClient = axios.create({ baseURL });
