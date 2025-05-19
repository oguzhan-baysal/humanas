import axios from 'axios';
import { User } from '../types';

const API_URL = 'https://case-test-api.humanas.io';

export const ApiService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(`${API_URL}`);
      // API'nin dönen yapısı: { status, message, data: { rows: [...] } }
      if (response.data && response.data.data && response.data.data.rows) {
        return response.data.data.rows;
      }
      throw new Error('API yanıtı beklenen formatta değil');
    } catch (error) {
      console.error('Kullanıcılar getirilirken hata oluştu:', error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      const response = await axios.get(`${API_URL}`);
      if (response.data && response.data.data && response.data.data.rows) {
        const user = response.data.data.rows.find((u: User) => u.id === id);
        if (!user) {
          throw new Error(`${id} ID'li kullanıcı bulunamadı`);
        }
        return user;
      }
      throw new Error('API yanıtı beklenen formatta değil');
    } catch (error) {
      console.error(`${id} ID'li kullanıcı getirilirken hata oluştu:`, error);
      throw error;
    }
  }
}; 