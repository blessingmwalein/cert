import Router from 'next/router'
import axios from 'axios';
import { LoginRequest, RefreshTokenRequest, RegisterRequest, PasswordResetRequest, LoginResponse } from 'src/models/auth/auth-request';
import { ResponseEntity } from 'src/models/response-entity';
import { ApplicationRequest } from '../models/application/application-request';
import { BalanceRequest, PaymentRequest } from 'src/models/payments/payment-request';
import { ConfirmPayRequest } from '../models/payments/payment-request';
import { authService } from './auth.service';

const baseUrl = `${process.env.API_BASE_URL}payment`;

export const paymentService = {
    balance,
    send,
    confirmPayment,
    getHistory
};

async function balance(): Promise<any> {
    const url = `${baseUrl}/balance`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        {userEmail: authService.decodeToken().email},
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}



async function send(paymentRequest: PaymentRequest): Promise<any> {
    const url = `${baseUrl}/send`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        paymentRequest,
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function confirmPayment(id: number): Promise<any> {
    const url = `${baseUrl}/confirm/payment`;
    console.log('Id iyo' + id)
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        { id: id },
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}

async function getHistory() {
    const url = `${baseUrl}/history`;
    const authData: LoginResponse = JSON.parse(localStorage.getItem('authData') || '{}');
    const response = await axios.post(
        url,
        { userEmail: authService.decodeToken().email },
        {
            headers: {
                "Authorization": `Bearer ${authData.accessToken}`
            }
        },
    );
    const { data } = response;
    return data;
}