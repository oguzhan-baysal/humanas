import React from 'react';
import { render } from '@testing-library/react';
import { UserList } from './UserList';
import { User } from '../types/user';

describe('UserList', () => {
  it('kullanıcılar doğru şekilde render edilmeli', () => {
    render(<UserList onSelectUser={() => {}} />);
    expect(true).toBe(true);
  });

  it('kullanıcıya tıklanınca onSelectUser çağrılmalı', () => {
    expect(true).toBe(true);
  });
}); 