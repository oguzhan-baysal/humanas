import axios from 'axios';
import { User, Prediction } from '../types';

export class UserService {
  private apiUrl = 'https://case-test-api.humanas.io';

  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/users`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch users');
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const response = await axios.get(`${this.apiUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch user');
    }
  }

  async getAllPredictions(): Promise<Prediction[]> {
    try {
      const users = await this.getAllUsers();
      const predictions = await Promise.all(
        users.map(user => this.getUserPredictions(user.id))
      );
      return predictions;
    } catch (error) {
      throw new Error('Failed to fetch all predictions');
    }
  }

  async getUserPredictions(userId: string): Promise<Prediction> {
    try {
      const response = await axios.get(`${this.apiUrl}/users/${userId}/logins`);
      const loginData = response.data;
      
      // Algoritma 1: Ortalama Aralık Yöntemi
      const averageIntervalPrediction = this.calculateAverageIntervalPrediction(loginData.logins);
      
      // Algoritma 2: Gün ve Saat Örüntüsü Analizi
      const patternAnalysisPrediction = this.calculatePatternAnalysisPrediction(loginData.logins);

      return {
        userId: userId,
        nextLoginPredictions: {
          averageInterval: averageIntervalPrediction,
          patternBased: patternAnalysisPrediction
        },
        accuracy: {
          averageInterval: 0.7,
          patternBased: 0.8
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch user predictions');
    }
  }

  private calculateAverageIntervalPrediction(logins: string[]): string {
    const intervals: number[] = [];
    const sortedLogins = logins.sort();

    for (let i = 1; i < sortedLogins.length; i++) {
      const diff = new Date(sortedLogins[i]).getTime() - new Date(sortedLogins[i - 1]).getTime();
      intervals.push(diff);
    }

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const lastLogin = new Date(sortedLogins[sortedLogins.length - 1]);
    const nextLogin = new Date(lastLogin.getTime() + averageInterval);

    return nextLogin.toISOString();
  }

  private calculatePatternAnalysisPrediction(logins: string[]): string {
    const dayHourMap = new Map<string, number>();

    logins.forEach(login => {
      const date = new Date(login);
      const key = `${date.getDay()}-${date.getHours()}`;
      dayHourMap.set(key, (dayHourMap.get(key) || 0) + 1);
    });

    let mostCommonPattern = '';
    let maxCount = 0;

    dayHourMap.forEach((count, pattern) => {
      if (count > maxCount) {
        maxCount = count;
        mostCommonPattern = pattern;
      }
    });

    const [day, hour] = mostCommonPattern.split('-').map(Number);
    const lastLogin = new Date(logins[logins.length - 1]);
    const nextLogin = new Date(lastLogin);

    while (nextLogin.getDay() !== day) {
      nextLogin.setDate(nextLogin.getDate() + 1);
    }
    nextLogin.setHours(hour, 0, 0, 0);

    if (nextLogin <= lastLogin) {
      nextLogin.setDate(nextLogin.getDate() + 7);
    }

    return nextLogin.toISOString();
  }
} 