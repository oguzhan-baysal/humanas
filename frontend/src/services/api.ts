import axios from 'axios';
import type { User } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL + '/api';

interface Prediction {
  method: string;
  prediction: string;
  confidence: number;
}

interface PredictionResponse {
  userId: string;
  predictions: {
    averageInterval: Prediction | null;
    dayHourPattern: Prediction | null;
    movingAverage: Prediction | null;
    weightedDayHour: Prediction | null;
  };
}

export const userService = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  },

  getUserById: async (id: string): Promise<User> => {
    const response = await axios.get(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },

  getAllPredictions: async (): Promise<PredictionResponse[]> => {
    const response = await axios.get(`${API_BASE_URL}/predictions`);
    return response.data;
  },

  getPredictions: async (userId: string): Promise<PredictionResponse> => {
    const response = await axios.get(`${API_BASE_URL}/predictions/${userId}`);
    return response.data;
  }
};

export const fetchAllPredictions = async (): Promise<Prediction[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/predictions`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Tüm tahminler alınamadı:', error);
    throw error;
  }
}; 