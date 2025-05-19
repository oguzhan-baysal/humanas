export interface User {
  id: string;
  name: string;
  logins: string[];
}

export interface UserPrediction {
  algorithm: string;
  nextLoginPrediction: string;
  confidence: number;
} 