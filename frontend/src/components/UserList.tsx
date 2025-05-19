'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { userService } from '@/services/api';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@/types/user';

interface UserListProps {
  onSelectUser: (user: User | null) => void;
}

interface UserCardProps {
  user: User;
  isSelected: boolean;
  onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isSelected, onClick }) => {
  const lastLogin = user.logins[user.logins.length - 1];
  const formattedLastLogin = lastLogin 
    ? format(new Date(lastLogin), 'dd.MM.yyyy HH:mm')
    : 'Giriş bilgisi yok';

  return (
    <div
      onClick={onClick}
      className={`
        relative p-6 rounded-xl transition-all duration-300 cursor-pointer
        ${isSelected 
          ? 'bg-blue-50 border-2 border-blue-500 shadow-lg transform scale-102' 
          : 'bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md'
        }
      `}
    >
      <div className="flex items-start space-x-4">
        <Avatar className="h-14 w-14">
          <AvatarFallback className={`text-xl font-semibold ${isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className={`
            font-semibold text-lg mb-1
            ${isSelected ? 'text-blue-700' : 'text-gray-800'}
          `}>
            {user.name}
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Son Giriş: {formattedLastLogin}
            </p>
            <p className="text-sm text-gray-500">
              Toplam Giriş: {user.logins.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserList: React.FC<UserListProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await userService.getAllUsers();
        setUsers(data);
        setError(null);
      } catch (error) {
        console.error('Kullanıcılar yüklenirken hata oluştu:', error);
        setError('Kullanıcılar yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserSelect = (user: User) => {
    const newSelectedId = selectedUser === user.id ? null : user.id;
    setSelectedUser(newSelectedId);
    onSelectUser(newSelectedId ? user : null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 border border-red-200">
        <p className="text-red-700 mb-3">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
        >
          Yeniden Dene
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">Henüz kullanıcı bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-y-4">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            isSelected={selectedUser === user.id}
            onClick={() => handleUserSelect(user)}
          />
        ))}
      </div>
    </div>
  );
}; 