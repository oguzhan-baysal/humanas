'use client';

import * as React from 'react';
import { useState } from 'react';
import type { User } from '@/types/user';
import { UserList } from '@/components/UserList';
import { PredictionTable } from '@/components/PredictionTable';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Kullanıcı Oturum Tahmin Sistemi
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <UserList onSelectUser={setSelectedUser} />
          </div>
          <div className="md:col-span-2">
            {selectedUser ? (
              <PredictionTable user={selectedUser} />
            ) : (
              <div className="bg-white rounded-lg shadow p-4 text-center text-gray-500">
                Lütfen bir kullanıcı seçin
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
} 