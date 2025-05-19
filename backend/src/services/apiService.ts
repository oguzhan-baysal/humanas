import axios, { AxiosError } from 'axios';
import { User } from '../types/user';

const API_URL = 'http://case-test-api.humanas.io';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Mock data for testing
const mockUsers: User[] = [
  {
    id: "1",
    name: "Ahmet Yılmaz",
    logins: [
      "2024-02-01T08:00:00Z",
      "2024-02-02T08:30:00Z",
      "2024-02-03T08:15:00Z",
      "2024-02-04T08:45:00Z",
      "2024-02-05T08:10:00Z"
    ]
  },
  {
    id: "2",
    name: "Ayşe Demir",
    logins: [
      "2024-02-01T09:00:00Z",
      "2024-02-02T09:30:00Z",
      "2024-02-03T09:15:00Z",
      "2024-02-04T09:45:00Z",
      "2024-02-05T09:10:00Z"
    ]
  }
];

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await axiosInstance.get('/users');
    if (!response.data) {
      throw new Error('Veri alınamadı');
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`API Hatası: ${error.response?.status} - ${error.message}`);
    }
    throw error;
  }
};

export const fetchUserById = async (userId: string): Promise<User> => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    if (!response.data) {
      throw new Error('Kullanıcı bulunamadı');
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        throw new Error(`${userId} ID'li kullanıcı bulunamadı`);
      }
      console.error('API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw new Error(`API Hatası: ${error.response?.status} - ${error.message}`);
    }
    throw error;
  }
}; 