import { User } from '../types';

interface PredictionResult {
  nextLoginTime: string;
  confidence: number;
  method: string;
}

export class PredictionService {
  // Ortalama Aralık Yöntemi
  private calculateAverageInterval(logins: string[]): PredictionResult {
    try {
      const sortedLogins = logins.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      const intervals: number[] = [];
      
      for (let i = 1; i < sortedLogins.length; i++) {
        const diff = new Date(sortedLogins[i]).getTime() - new Date(sortedLogins[i-1]).getTime();
        intervals.push(diff);
      }
      
      const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const lastLogin = new Date(sortedLogins[sortedLogins.length - 1]);
      const nextLogin = new Date(lastLogin.getTime() + averageInterval);
      
      // Güven skoru hesaplama: varyans ne kadar düşükse güven o kadar yüksek
      const variance = intervals.reduce((a, b) => a + Math.pow(b - averageInterval, 2), 0) / intervals.length;
      const confidence = Math.max(0, Math.min(1, 1 - (variance / averageInterval)));

      return {
        nextLoginTime: nextLogin.toISOString(),
        confidence,
        method: 'Ortalama Aralık'
      };
    } catch (error) {
      console.error('Ortalama aralık hesaplanırken hata:', error);
      throw error;
    }
  }

  // Gün ve Saat Örüntüsü Analizi
  private analyzeDayHourPattern(logins: string[]): PredictionResult {
    try {
      const patterns: { [key: string]: number } = {};
      let maxCount = 0;
      let mostCommonPattern = '';
      
      logins.forEach(login => {
        const date = new Date(login);
        const day = date.getDay();
        const hour = date.getHours();
        const key = `${day}-${hour}`;
        patterns[key] = (patterns[key] || 0) + 1;
        
        if (patterns[key] > maxCount) {
          maxCount = patterns[key];
          mostCommonPattern = key;
        }
      });

      const [day, hour] = mostCommonPattern.split('-').map(Number);
      const now = new Date();
      const nextLogin = new Date();
      nextLogin.setDate(now.getDate() + ((7 + day - now.getDay()) % 7));
      nextLogin.setHours(hour, 0, 0, 0);

      // Güven skoru: en yaygın pattern'in toplam login sayısına oranı
      const confidence = maxCount / logins.length;

      return {
        nextLoginTime: nextLogin.toISOString(),
        confidence,
        method: 'Gün-Saat Örüntüsü'
      };
    } catch (error) {
      console.error('Gün-saat örüntüsü analizi yapılırken hata:', error);
      throw error;
    }
  }

  // Hareketli Ortalama
  private calculateMovingAverage(logins: string[], window: number = 3): PredictionResult {
    try {
      const sortedLogins = logins.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
      const recentLogins = sortedLogins.slice(-window);
      const intervals: number[] = [];
      
      for (let i = 1; i < recentLogins.length; i++) {
        const diff = new Date(recentLogins[i]).getTime() - new Date(recentLogins[i-1]).getTime();
        intervals.push(diff);
      }
      
      const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const lastLogin = new Date(recentLogins[recentLogins.length - 1]);
      const nextLogin = new Date(lastLogin.getTime() + averageInterval);

      // Güven skoru: son giriş sayısı/window size oranı
      const confidence = Math.min(1, recentLogins.length / window);

      return {
        nextLoginTime: nextLogin.toISOString(),
        confidence,
        method: 'Hareketli Ortalama'
      };
    } catch (error) {
      console.error('Hareketli ortalama hesaplanırken hata:', error);
      throw error;
    }
  }

  // Tüm tahminleri hesapla
  public generatePredictions(user: User): PredictionResult[] {
    if (!user.logins || user.logins.length < 2) {
      throw new Error('Tahmin için yeterli login verisi yok');
    }

    return [
      this.calculateAverageInterval(user.logins),
      this.analyzeDayHourPattern(user.logins),
      this.calculateMovingAverage(user.logins)
    ];
  }
} 