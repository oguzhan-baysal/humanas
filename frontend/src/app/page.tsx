'use client';

import * as React from 'react';
import { useState } from 'react';
import type { User } from '@/types/user';
import { UserList } from '@/components/UserList';
import { PredictionTable } from '@/components/PredictionTable';

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 py-4 md:py-8">
      <div className="max-w-2xl md:max-w-5xl mx-auto px-2 md:px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8">
          Kullanıcı Oturum Tahmin Sistemi
        </h1>
        <div className="flex flex-col md:grid md:grid-cols-3 md:gap-6 gap-4">
          <div className="md:col-span-1">
            <UserList onSelectUser={setSelectedUser} />
          </div>
          <div className="md:col-span-2 mt-4 md:mt-0">
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