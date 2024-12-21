import type { LoginCredentials, LoginResponse, LogoutResponse } from '../types/auth';
import type { ServicesResponse } from '../types/service';

const API_URL = 'https://multitanques.smartlytic.com.co';

export const api = {
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        return response.json();
    },

    logout: async (token: string): Promise<LogoutResponse> => {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        return response.json();
    },

    getCurrentUserServices: async (token: string): Promise<ServicesResponse> => {
        const response = await fetch(`${API_URL}/api/servicios/get/?=1734495866092`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer 2|oZEHzWcJMkr60vMNSKLX4vZLMPUzvLFczAFshNvf4ec5266b`
            },
        });

        return response.json();
    }
}; 