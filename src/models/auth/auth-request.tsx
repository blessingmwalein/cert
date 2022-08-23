export interface DeviceInfo {
  deviceId: string
  deviceType: string
  notificationToken: string
}

export interface LoginRequest {
  deviceInfo: DeviceInfo
  email: string
  password: string
  username: string
}

export interface RegisterRequest {
  email: string
  // institution: string;
  password: string
  registerAsHolder: boolean
}

export interface RefreshTokenRequest {
  refreshToken: string
}

export interface PasswordResetRequest {
  newPassword: string
  oldPassword: string
}

export interface UpdatePasswordRequest {
  newPassword: string
  oldPassword: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
  expiryDuration: number
}

export interface Role {
  id: number
  role: string
  certHolderRole: boolean
}

export interface User {
  sub: string
  userId: number
  email: string
  username: string
  role: Role[]
  iat: number
  exp: number
}

export interface CreateUserRequest {
  email: string
  institution: string
  password: string
  registerAsRegistrar: boolean
  verificationPrice: float
  applicationPrice: float
}
