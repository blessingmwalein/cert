import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest,PasswordResetRequest } from 'src/models/auth/auth-request';

const baseUrl = `${process.env.API_BASE_URL}auth`;

export const authService = {
    login,
    register,
    refreshToken,
    passwordReset,
    sendResetLink
};

async function login(loginRequest: LoginRequest) : Promise<any>  {
    const url = `${baseUrl}/login`;
    const response = await axios.post(url, loginRequest);
    const { data } = response;
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
}

async function register(registerRequest: RegisterRequest) : Promise<any>  {
    const url = `${baseUrl}/register`;
    const response = await axios.post(url, registerRequest);
    const { data } = response;
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
}

async function refreshToken(refreshTokenRequest : RefreshTokenRequest) : Promise<any> {
    const url = `${baseUrl}/refresh`;
    const response = await axios.post(url, refreshTokenRequest);
    const { data } = response;
    const { token } = data;
    localStorage.setItem('token', token);
    return data;
}

async function passwordReset(passwordResetRequest : PasswordResetRequest) : Promise<any> {
    const url = `${baseUrl}/password/reset`;
    const response = await axios.post(url, passwordResetRequest);
    const { data } = response;
    return data;
}

async function sendResetLink(email : string) : Promise<any> {
    const url = `${baseUrl}/password/resetlink`;
    const response = await axios.post(url, { email });
    const { data } = response;
    return data;
}
