import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';

const baseUrl = `http://apis.us-east-2.elasticbeanstalk.com/api/auth`;

export const authService = {
    login,
    register,
    refreshToken,
    passwordReset,
    sendResetLink
};

async function login(loginRequest: LoginRequest): Promise<any> {
    const url = `${baseUrl}/login`;
    const response = await axios.post(url, loginRequest);
    const { data } = response;
    sessionStorage.setItem('authData', JSON.stringify(data));
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
    const url = `${baseUrl}/password/reset`;
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


