export interface DeviceInfo {
    deviceId: string;
    deviceType: string;
    notificationToken: string;
}

export interface LoginRequest {
    deviceInfo: DeviceInfo;
    email: string;
    password: string;
    username: string;
}


export interface RegisterRequest {
    email: string;
    institution: string;
    password: string;
    registerAsRegistrar: boolean;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface PasswordResetRequest {
    confirmPassword: string;
    password: string;
    token: string;
}


export interface UpdatePasswordRequest {
    newPassword: string;
    oldPassword: string;
}