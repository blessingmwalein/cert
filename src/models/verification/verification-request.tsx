export interface VerifyRequest {
    certificateId: string;
    institution: string;
    nationalId: string;
    verifier: string;
}

export interface VerificationResponse {
    certificate: Certificate;
    date: string;
    id: number;
    legit: boolean;
    verifier: string;
}

export interface Certificate {
    broadCasted: boolean;
    classification: string;
    createdAt: Date;
    dob: string;
    enrol: string;
    grad: string;
    id: string;
    institution: string;
    nationalId: string;
    program: string;
    regNumber: string;
    signature: string;
    student: string;
    valid: boolean;
}
