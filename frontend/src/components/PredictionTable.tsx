'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, Calendar, TrendingUp, BarChart as BarChartIcon } from 'lucide-react';
import type { User, Prediction, UserPrediction } from '@/types/user';
import { Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart } from 'recharts';

interface PredictionTableProps {
  user: User;
}

export const PredictionTable: React.FC<PredictionTableProps> = ({ user }) => {
  const [prediction, setPrediction] = useState<UserPrediction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${apiUrl}/api/predictions/${user.id}`);
        setPrediction(response.data);
        setLoading(false);
      } catch {
        setError('Tahminler yüklenirken bir hata oluştu.');
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [user.id]);

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd MMMM yyyy HH:mm', { locale: tr });
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Ortalama Aralık':
        return <Clock className="w-4 h-4" />;
      case 'Gün-Saat Örüntüsü':
        return <Calendar className="w-4 h-4" />;
      case 'Hareketli Ortalama':
        return <TrendingUp className="w-4 h-4" />;
      case 'Ağırlıklı Gün-Saat':
        return <BarChartIcon className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-destructive">{error}</div>
        </CardContent>
      </Card>
    );
  }

  if (!prediction) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-muted-foreground">Bu kullanıcı için tahmin bulunamadı.</div>
        </CardContent>
      </Card>
    );
  }

  // Grafik için veri hazırlama
  const chartData = Object.entries(prediction.predictions)
    .filter(([, pred]) => pred !== null && pred !== undefined)
    .map(([, pred]) => {
      const safePred = pred as Prediction;
      return {
        method: safePred.method,
        confidence: Math.round(safePred.confidence * 100),
      };
    });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Tahminler - {user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(prediction.predictions).map(([key, pred]) => {
              if (!pred) return null;

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(pred.method)}
                      <span className="font-medium">{pred.method}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(pred.prediction)}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={pred.confidence * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Güven Skoru</span>
                      <span>%{Math.round(pred.confidence * 100)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      {/* Grafik Kartı */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Tahminler Grafiği</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `%${v}`} />
                <Tooltip formatter={(value) => `%${value}`} />
                <Bar dataKey="confidence" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  );
}; 