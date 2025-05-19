import { User } from '../types/user';

interface Login {
  timestamp: string;
}

// Algoritma 1: Ortalama Aralık Yöntemi
const averageIntervalPrediction = (logins: string[]): Date => {
  const timestamps = logins.map(login => new Date(login).getTime());
  const intervals = [];
  
  for (let i = 1; i < timestamps.length; i++) {
    intervals.push(timestamps[i] - timestamps[i - 1]);
  }
  
  const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const lastLogin = new Date(logins[logins.length - 1]);
  
  return new Date(lastLogin.getTime() + averageInterval);
};

// Algoritma 2: Gün ve Saat Örüntüsü Analizi
const patternAnalysisPrediction = (logins: string[]): Date => {
  const loginDates = logins.map(login => new Date(login));
  const dayHourMap = new Map<string, number>();
  
  loginDates.forEach(date => {
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
  const prediction = new Date(lastLogin);
  
  while (prediction.getDay() !== day) {
    prediction.setDate(prediction.getDate() + 1);
  }
  prediction.setHours(hour, 0, 0, 0);
  
  return prediction;
};

export const generatePredictions = (user: User) => {
  const predictions = {
    userId: user.id,
    lastLogin: user.logins[user.logins.length - 1],
    predictions: {
      averageInterval: averageIntervalPrediction(user.logins),
      patternAnalysis: patternAnalysisPrediction(user.logins)
    }
  };
  
  return predictions;
}; 