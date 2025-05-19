import { useState, useEffect } from 'react';
import { User } from '../types';
import { getAllUsers } from '../services/api';

interface UserListProps {
  onSelectUser: (user: User) => void;
}

const UserList = ({ onSelectUser }: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError('Kullanıcılar yüklenirken bir hata oluştu');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Kullanıcılar</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className="w-full text-left p-3 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {user.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList; 