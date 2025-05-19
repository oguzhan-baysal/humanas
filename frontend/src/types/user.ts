export interface User {
  id: string;
  name: string;
  logins: string[];
}

export interface Prediction {
  method: string;
  prediction: string;
  confidence: number;
}

export interface UserPrediction {
  userId: string;
  predictions: {
    averageInterval: Prediction | null;
    dayHourPattern: Prediction | null;
    movingAverage: Prediction | null;
    weightedDayHour: Prediction | null;
  };
} 