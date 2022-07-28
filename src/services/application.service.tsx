import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest, LoginResponse } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';
import { ApplicationRequest } from '../models/application/application-request';

const baseUrl = `${process.env.API_BASE_URL}application`;

export const applicationService = {
    apply,
    update
};

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
