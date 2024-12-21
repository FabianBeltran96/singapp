export interface LoginCredentials {
  identificacion: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
  };
  error: string | null;
}

export interface LogoutResponse {
  status: number;
  message: string;
  data: null;
  error: string | null;
} 