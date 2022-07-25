import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import axios from 'axios';
import { DeviceInfo, LoginRequest, RefreshTokenRequest, RegisterRequest, UpdatePasswordRequest } from 'src/models/auth/auth-request';

const baseUrl = `${process.env.API_BASE_URL}user`;

export const userService = {
    create
};


async function create(userRequest: RegisterRequest) : Promise<any>  {
    const url = `${baseUrl}/register`;
    const response = await axios.post(url, userRequest);
    const { data } = response;
    return data;
}

async function logout(deviceInfo:DeviceInfo) : Promise<any>  {
    const url = `${baseUrl}/logout`;
    const response = await axios.post(url, deviceInfo);
    const { data } = response;
    return data;
}

async function getUser() : Promise<any>  {
    const url = `${baseUrl}/me`;
    const response = await axios.get(url);
    const { data } = response;
    return data;
}

async function updatePassword(updatePasswordRequest: UpdatePasswordRequest, email:string) : Promise<any>  {
    const url = `${baseUrl}/password/update?email=${email}`;
    const response = await axios.post(url, updatePasswordRequest);
    const { data } = response;
    return data;
}