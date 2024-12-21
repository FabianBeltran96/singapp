import { api } from './api';
import { AuthService } from './auth';
import type { ServicesResponse } from '../types/service';

export class ServiceManager {
    static async getCurrentUserServices(): Promise<ServicesResponse> {
        try {
            // const token = await AuthService.getToken();
            // if (!token) {
            //     throw new Error('No token found');
            // }

            return api.getCurrentUserServices();
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    }
} 