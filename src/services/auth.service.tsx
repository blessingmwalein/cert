import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest, LoginResponse, User } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';
import jwt_decode from "jwt-decode";

const baseUrl = `${process.env.API_BASE_URL}auth`;

export const authService = {
    login,
    register,
    refreshToken,
    passwordReset,
    sendResetLink,
    decodeToken,
    clearLocalStorage,
    logout
};

async function login(loginRequest: LoginRequest): Promise<any> {
    const url = `${baseUrl}/login`;
    const response = await axios.post(url, loginRequest);
    const { data } = response;
    localStorage.setItem('authData', JSON.stringify(data));
    return data;
}

async function register(registerRequest: RegisterRequest): Promise<any> {
    const url = `${baseUrl}/register`;
    const response = await axios.post(url, registerRequest);
    const { data } = response;
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
}

async function refreshToken(refreshTokenRequest: RefreshTokenRequest): Promise<ResponseEntity> {
    const url = `${baseUrl}/refresh`;
    const response = await axios.post(url, refreshTokenRequest);
    const { data } = response;
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
}

async function passwordReset(passwordResetRequest: PasswordResetRequest): Promise<ResponseEntity> {
    const url = `${baseUrl}/password/update?email=${decodeToken().email}`;
    const response = await axios.post(url, passwordResetRequest);
    const { data } = response;
    return data;
}

async function sendResetLink(email: string): Promise<ResponseEntity> {
    const url = `${baseUrl}/password/resetlink`;
    const response = await axios.post(url, { email });
    const { data } = response;
    return data;
}
async function resendConfirmationToken(email: string): Promise<ResponseEntity> {
    const url = `${baseUrl}/password/resetlink`;
    const response = await axios.post(url, { email });
    const { data } = response;
    return data;
}

function decodeToken(): User {
    var authdata: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const token = authdata.accessToken;
    const decoded: User = jwt_decode(token);
    return decoded;
}


function logout() {
    localStorage.clear();
    Router.push('/pages/login');
}

function clearLocalStorage() {
    localStorage.removeItem('authData');
}

function toAddMinutes(date: Date, minutes: number) {
    return new Date(date.getTime() + minutes * 60000);
}

