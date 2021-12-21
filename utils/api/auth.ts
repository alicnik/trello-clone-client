import { AxiosResponse } from 'axios';
import { axiosClient } from './client';
// import { getToken, setToken } from './lib';
import { User } from './types';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
}

export interface RegisterRequest {
  username: string;
  emailAddress: string;
  password: string;
}
export interface RegisterResponse {
  id: number;
  username: string;
  emailAddress: string;
  boards: null;
  cards: null;
  cardMemberships: null;
}

export interface UserResponse {
  id: string;
  username: string;
  emailAddress: string;
}

export function login(userDetails: LoginRequest) {
  return axiosClient
    .post<LoginRequest, AxiosResponse<LoginResponse>>('/login', userDetails)
    .then((res) => {
      return res;
    });
}

export function register(newUserDetails: RegisterRequest) {
  return axiosClient.post<RegisterRequest, AxiosResponse<RegisterResponse>>(
    '/register',
    newUserDetails
  );
}

export function getSingleUser(username: string, token?: string) {
  return axiosClient
    .get<User>(`/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    });
}
