import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest, LoginResponse } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';
import { ApplicationRequest } from '../models/application/application-request';
import { VerificationResponse, VerifyRequest } from '../models/verification/verification-request';
import { authService } from './auth.service';

const baseUrl = `${process.env.API_BASE_URL}verification`;

export const verificationService = {
    verify,
    getUserVerifications,
    getAllVerifications,
    institution
};

async function verify(verificationRequest: VerifyRequest): Promise<any> {
    const url = `${baseUrl}/verify`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        verificationRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function getUserVerifications(): Promise<VerificationResponse> {
    const url = `${baseUrl}/user/verifications?verifier=${authService.decodeToken().email}`;
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

async function getAllVerifications():Promise<VerificationResponse> {
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
async function institution():Promise<VerificationResponse> {
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
