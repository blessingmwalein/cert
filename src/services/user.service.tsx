import { BehaviorSubject } from 'rxjs';
import getConfig from 'next/config';
import Router from 'next/router'
import axios from 'axios';
import { CreateUserRequest, DeviceInfo, LoginRequest, LoginResponse, RefreshTokenRequest, RegisterRequest, UpdatePasswordRequest } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';

const baseUrl = `${process.env.API_BASE_URL}user`;

export const userService = {
    create,
    logout,
    getUser,
    updatePassword
};


async function create(createUserRequest: CreateUserRequest): Promise<ResponseEntity> {
    const url = `${baseUrl}/create`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        createUserRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function logout(deviceInfo: DeviceInfo): Promise<ResponseEntity> {
    const url = `${baseUrl}/logout`;
    const response = await axios.post(url, deviceInfo);
    const { data } = response;
    return data;
}

async function getUser(): Promise<ResponseEntity> {
    const url = `${baseUrl}/me`;
    const response = await axios.get(url);
    const { data } = response;
    return data;
}

async function updatePassword(updatePasswordRequest: UpdatePasswordRequest, email: string): Promise<ResponseEntity> {
    const url = `${baseUrl}/password/update?email=${email}`;
    const response = await axios.post(url, updatePasswordRequest);
    const { data } = response;
    return data;
}

