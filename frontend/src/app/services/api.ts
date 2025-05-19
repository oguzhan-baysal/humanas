import { User, UserPrediction } from '../types';

const API_URL = 'http://localhost:3001/api';

export const getAllUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const getUserPredictions = async (userId: string): Promise<UserPrediction[]> => {
  const response = await fetch(`${API_URL}/users/${userId}/predictions`);
  if (!response.ok) {
    throw new Error('Failed to fetch user predictions');
  }
  return response.json();
}; 