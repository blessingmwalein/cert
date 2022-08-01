export interface VerifyCertificateRequest {
    certificateId: string;
    nationalId: string;
    program: string;
    verifier: string;
}

export interface CreateCertificateRequest {
    classification: string;
    dob: string;
    enrol: string;
    grad: string;
    institution: string;
    nationalId: string;
    program: string;
    regNumber: string;
    userEmail: string;
}
