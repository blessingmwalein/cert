import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest, LoginResponse } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';
import { ApplicationRequest } from '../models/application/application-request';
import { CreateCertificateRequest, VerifyCertificateRequest } from '../models/certificates/certificate-request';

const baseUrl = `${process.env.API_BASE_URL}certificate`;

export const certificateService = {
    verify,
    update,
    create,
    reject,
    sign,
    all,
    institution
};

async function create(certificateRequest: CreateCertificateRequest): Promise<any> {
    const url = `${baseUrl}/create`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        certificateRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}
async function verify(certificateRequest: VerifyCertificateRequest): Promise<any> {
    const url = `${baseUrl}/verify`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        certificateRequest,
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

async function sign(certificateId: string): Promise<any> {
    const url = `${baseUrl}/sign?certificateId=${certificateId}`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.put(
        url,
        {},
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}
async function reject(certificateId: string): Promise<any> {
    const url = `${baseUrl}/reject?certificateId=${certificateId}`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.put(
        url,
        {},
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}