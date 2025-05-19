export interface User {
  id: string;
  name: string;
  logins: string[];
}

export interface Prediction {
  userId: string;
  nextLoginPredictions: {
    averageInterval: string;
    patternBased: string;
    movingAverage?: string;
    weightedPattern?: string;
  };
  accuracy: {
    averageInterval: number;
    patternBased: number;
    movingAverage?: number;
    weightedPattern?: number;
  };
} 