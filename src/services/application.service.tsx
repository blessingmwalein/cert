import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest, LoginResponse } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';
import { ApplicationRequest } from '../models/application/application-request';

const baseUrl = `${process.env.API_BASE_URL}application`;

export const applicationService = {
    all,
    apply,
    update,
    approve,
    institution,
    reject
};

async function all(): Promise<any> {
    const url = `${baseUrl}/all`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.get(
        url,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function approve(applicationRequest: ApplicationRequest): Promise<any> {
    const url = `${baseUrl}/approve`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.put(
        url,
        applicationRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}
async function reject(applicationRequest: ApplicationRequest): Promise<any> {
    const url = `${baseUrl}/reject`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.put(
        url,
        applicationRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function institution(): Promise<any> {
    const url = `${baseUrl}/institution`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.get(
        url,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function apply(loginRequest: ApplicationRequest): Promise<any> {
    const url = `${baseUrl}/apply`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        loginRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}
async function update(loginRequest: ApplicationRequest): Promise<any> {
    const url = `${baseUrl}/update`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.put(
        url,
        loginRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}
