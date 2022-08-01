export interface PaymentRequest {
    amount: number;
    userId: string;
}

export interface BalanceResponse {
    balance: number;
    userEmail: string;
}

export interface BalanceRequest {
    userEmail: string;
}

export interface ConfirmPayRequest {
    id: number;
}

export interface PaymentStatusResponse {
    paid:   number;
    status: string;
    total:  number;
}



export interface PaynowResponse {
    rawResponseContent: RawResponseContent;
    status: string;
    requestSuccess: boolean;
    errors: any[];
    pollUrl: string;
    hash: string;
    redirectURL: string;
}

export interface RawResponseContent {
    pollurl: string;
    hash: string;
    status: string;
    browserurl: string;
}


export interface PaymentHistory {
    amount:          number;
    complete:        boolean;
    id:              number;
    pollURl:         string;
    transactionDate: Date;
    userId:          string;
}
