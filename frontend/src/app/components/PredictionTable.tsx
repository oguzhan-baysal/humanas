import { useState, useEffect } from 'react';
import { User, UserPrediction } from '../types';
import { getUserPredictions } from '../services/api';

interface PredictionTableProps {
  user: User;
}

const PredictionTable = ({ user }: PredictionTableProps) => {
  const [predictions, setPredictions] = useState<UserPrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getUserPredictions(user.id);
        setPredictions(data);
        setLoading(false);
      } catch (err) {
        setError('Tahminler yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [user.id]);

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">{user.name} için Tahminler</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Algoritma
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sonraki Login Tahmini
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Güven Skoru
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {predictions.map((prediction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {prediction.algorithm === 'average_interval' ? 'Ortalama Aralık' : 'Örüntü Analizi'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(prediction.nextLoginPrediction).toLocaleString('tr-TR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {(prediction.confidence * 100).toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PredictionTable; 