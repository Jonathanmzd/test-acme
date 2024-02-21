export interface UserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
}
